const del = require('del');
const gulp = require('gulp');
const colors = require('ansi-colors');
const log = require('fancy-log');
const helpers = require('./config/helpers');

/** External command runner */
const process = require('process');

/** File Access */
const fs = require('fs');
const path = require('path');

/** To properly handle pipes on error */
const pump = require('pump');

//Bumping, Releasing tools
const gulpGit = require('gulp-git');

/** To load gulp tasks from multiple files */
const gulpHub = require('gulp-hub');

const gulpCompodoc = require('@compodoc/gulp-compodoc');

const yargs = require('yargs');
const argv = yargs
	.option('version', {
		alias: 'v',
		describe: 'Enter Version to bump to',
		choices: ['patch', 'minor', 'major'],
		type: "string"
	})
	.option('ghToken', {
		alias: 'gh',
		describe: 'Enter Github Token for releasing',
		type: "string"
	})
	.version(false) // disable default --version from yargs( since v9.0.0)
	.argv;

const config = {
	libraryName: '@deja-js/component',
	unscopedLibraryName: 'dejajs-component',
	allSrc: 'src/**/*',
	allTs: 'src/**/!(*.spec).ts',
	allSass: 'src/**/*.+(scss|sass)',
	allHtml: 'src/**/*.html',
	themesSass: 'src/**/*-theme.scss',
	scssSass: 'src/scss/**/*.+(scss|sass|css)',
	demoDir: 'demo/',
	buildDir: 'tmp/',
	sourceDir: 'src/',
	outputDir: 'dist/',
	outputDemoDist: 'demo/dist',
	outputDemoDir: 'demo/dist/browser/',
	coverageDir: 'coverage/',
	docDir: 'doc/',
	svgDir: 'src/assets/svg/',
	fontsDir: 'src/assets/fonts/',
	templatesDir: 'src/assets/templates/',
	sassFontsDir: 'src/scss/fonts/'
};

const rootFolder = path.join(__dirname);
const buildFolder = path.join(rootFolder, `${config.buildDir}`);
const distFolder = path.join(rootFolder, `${config.outputDir}`);
const outputFolder = path.join(buildFolder, 'lib');
// const docFolder = path.join(rootFolder, `${config.docDir}`);

//Helper functions
const startKarmaServer = (isTddMode, hasCoverage, cb) => {
	const isDocker = require('is-docker');

	const karmaServer = require('karma').Server;
	const isCI = process.env.TRAVIS || isDocker();

	let config = {
		configFile: `${__dirname}/karma.conf.js`,
		singleRun: !isTddMode,
		autoWatch: isTddMode
	};

	if (isCI) {
		config['browsers'] = ['ChromeHeadlessCI'];
	}

	config['hasCoverage'] = hasCoverage;

	new karmaServer(config, cb).start();
};

const getPackageJsonVersion = () => {
	// We parse the json file instead of using require because require caches
	// multiple calls so the version number won't be updated
	return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
};

const isOK = condition => {
	if (condition === undefined) {
		return colors.yellow('[SKIPPED]');
	}
	return condition ? colors.green('[OK]') : colors.red('[KO]');
};

const execCmd = (name, args, opts, ...subFolders) => {
	const cmd = helpers.root(subFolders, helpers.binPath(`${name}`));
	return helpers.execp(`${cmd} ${args}`, opts)
		.catch(e => {
			log(colors.red(`${name} command failed. See below for errors.\n`));
			log(colors.red(e));
			process.exit(1);
		});
};

const execExternalCmd = (name, args, opts) => {
	return helpers.execp(`${name} ${args}`, opts)
		.catch(e => {
			log(colors.red(`${name} command failed. See below for errors.\n`));
			log(colors.red(e));
			process.exit(1);
		});
};

const execExternalCmdNoErrors = (name, args, opts) => {
	return helpers.execp(`${name} ${args}`, opts)
		.catch(e => {
			log(colors.white(e));
		});
};

/////////////////////////////////////////////////////////////////////////////
// Cleaning Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('clean:dist', () => {
	return del(config.outputDir);
});

gulp.task('clean:build', () => {
	return del(config.buildDir);
});

gulp.task('clean:coverage', () => {
	return del(config.coverageDir);
});

gulp.task('clean:doc', () => {
	return del(config.docDir);
});

gulp.task('clean:demo', () => {
	return del(`${config.outputDemoDist}`);
});

gulp.task('clean:tmp', () => {
	return del(`${config.outputDemoDist}`);
});

gulp.task('clean:lock', () => {
	return del([`yarn.lock`, `yarn-error.log`, `package-lock.json`, `${config.demoDir}yarn.lock`, `${config.demoDir}yarn-error.log`, `${config.demoDir}package-lock.json`]);
});

gulp.task('clean:src-node-modules', () => {
	return del(`src/node_modules`);
});

gulp.task('clean:demo-node-modules', () => {
	return del(`demo/node_modules`);
});

gulp.task('clean:node-modules', () => {
	return del(`node_modules`);
});

/////////////////////////////////////////////////////////////////////////////
// Check if all TS files start by the HUG Licence
/////////////////////////////////////////////////////////////////////////////
gulp.task('license', function() {
	const license = require('gulp-license-check');

	return gulp.src(['**/*.ts', '!**/*.d.ts', '!**/node_modules/**'])
		.pipe(license({
			path: `${rootFolder}/header-license.txt`,
			blocking: true,
			logInfo: false,
			logError: true
		}));
});

/////////////////////////////////////////////////////////////////////////////
// Test Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('test', (cb) => {
	const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
	startKarmaServer(false, true, cb);
});

gulp.task('test:watch', (cb) => {
	const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
	startKarmaServer(true, true, cb);
});

gulp.task('test:watch-no-cc', (cb) => { //no coverage (useful for debugging failing tests in browser)
	const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
	startKarmaServer(true, false, cb);
});

/////////////////////////////////////////////////////////////////////////////
// Compilation Tasks
/////////////////////////////////////////////////////////////////////////////

gulp.task('lint', (cb) => {
	const tslint = require('tslint');
	const gulpTslint = require('gulp-tslint');

	pump([
		gulp.src(config.allTs),
		gulpTslint({
			program: tslint.Linter.createProgram('./tsconfig.json'),
			formatter: 'verbose',
			configuration: 'tslint.json'
		}),
		gulpTslint.report()
	], cb);
});

// Inline Styles and Templates into components
gulp.task('inline-templates', (cb) => {
	const gulpInlineNgTemplate = require('gulp-inline-ng2-template');

	// Compile Sass to css
	const styleProcessor = (stylePath, ext, styleFile, callback) => {
		const sass = require('node-sass');
		const cssnano = require('cssnano');
		const postcss = require('postcss');
		const autoprefixer = require('autoprefixer');
		const stripInlineComments = require('postcss-strip-inline-comments');
		const tildeImporter = require('node-sass-tilde-importer');

		/**
		 * Remove comments, autoprefixer, Minifier
		 */
		const processors = [
			stripInlineComments,
			autoprefixer,
			cssnano
		];

		const postProcessCss = css => {
			postcss(processors).process(css, {
				from: undefined
			}).then(result => {
				result.warnings().forEach(function(warn) {
					gutil.warn(warn.toString());
				});
				styleFile = result.css;
				callback(null, styleFile);
			});
		};

		if (/\.(scss|sass)$/.test(ext[0])) {
			let sassObj = sass.renderSync({
				file: stylePath,
				importer: tildeImporter
			});
			if (sassObj && sassObj['css']) {
				let css = sassObj.css.toString('utf8');
				postProcessCss(css);
			}
		} else if (/\.css$/.test(ext[0])) {
			postProcessCss(styleFile);
		}
	};

	const options = {
		base: `${config.buildDir}`,
		styleProcessor: styleProcessor,
		useRelativePaths: true
	};

	pump(
		[
			gulp.src(config.allTs),
			gulpInlineNgTemplate(options),
			gulp.dest(`${config.buildDir}`)
		],
		cb);
});

const buildFonts = (done) => {
	const async = require('async');
	const iconfont = require('gulp-iconfont');
	const runTimestamp = Math.round(Date.now() / 1000);

	const iconStream = gulp.src([`${config.svgDir}**/*.svg`])
		.pipe(iconfont({
			fontName: 'svg-fonts',
			fontHeight: 1001,
			fixedWidth: true,
			normalize: true,
            prependUnicode: true,
			formats: ['ttf', 'eot', 'woff', 'svg'],
			timestamp: runTimestamp,
		}));

	/* Creates a uppercase hex number with at least length digits from a given number */
	const fixedHex = (number, length) => {
		let str = number.toString(16).toUpperCase();
		while (str.length < length) {
			str = `0${str}`;
		}
		return str;
	};

	/* Creates a unicode literal based on the string */
	const unicodeLiteral = (str) => {
		let result = '';
		for (let i = 0; i < str.length; ++i) {
			/* You should probably replace this by an isASCII test */
			if (str.charCodeAt(i) > 126 || str.charCodeAt(i) < 32)
				result += `\\${fixedHex(str.charCodeAt(i), 4)}`;
			else
				result += str[i];
		}

		return result;
	};

	async.parallel([
		function handleGlyphs(cb) {
			iconStream.on('glyphs', function(glyphs) {
				const text = [];
				glyphs.forEach((g) => {
					text.push(`[svg-icon="${g.name}"]:before { content: "${unicodeLiteral(g.unicode[0])}" }`);
				});
				fs.writeFileSync(`${config.sassFontsDir}_svg-glyphs.scss`, text.join('\n'));
				cb();
			});
		},
		function handleFonts(cb) {
			iconStream
				.pipe(gulp.dest(config.fontsDir))
				.on('finish', cb);
		}
	], done);
};

const embedFonts = () => {
	const inlineFonts = require('gulp-inline-fonts');
	const rename = require("gulp-rename");

	return gulp.src([`${config.fontsDir}*`])
		.pipe(inlineFonts({
			name: 'svg-fonts',
			style: 'normal',
			stretch: 'normal',
			weight: 400,
			formats: ['woff', 'woff2', 'ttf', 'eot', 'svg']
		}))
		.pipe(rename(`_svg-fonts.scss`))
		.pipe(gulp.dest(`${config.sassFontsDir}`));
};

const buildCss = (destDir) => {
	const concat = require('gulp-concat');
	const stripLine = require('gulp-strip-line');
	const insert = require('gulp-insert');

	return gulp.src([config.scssSass, config.themesSass])
		.pipe(concat('scss-files.scss'))
		.pipe(concat('_theming.scss'))
		.pipe(stripLine(/^\@import/))
		.pipe(insert.prepend(`@import '~@angular/material/theming';\r\n`))
		.pipe(insert.prepend(`/* ***********************************************************/\r\n/*             Autogenerated file, do not modify.            */\r\n/* ***********************************************************/\r\n\r\n`))
		.pipe(gulp.dest(destDir))
}

gulp.task('build:scss', (cb) => {
	return Promise.resolve()
		.then(buildFonts)
		.then(() => embedFonts())
		.then(() => buildCss(config.outputDir))
		.catch(e => {
			log(colors.red('sass compilation failed. See below for errors.\n'));
			log(colors.red(e));
			process.exit(1);
		});
});

gulp.task('scss', (cb) => {
	return Promise.resolve()
		.then(() => buildCss(config.sourceDir))
		.catch(e => {
			log(colors.red('sass compilation failed. See below for errors.\n'));
			log(colors.red(e));
		});
});

// Prepare files for compilation
gulp.task('pre-compile', (cb) => {
	pump([
		gulp.src([config.allSrc]),
		gulp.dest(config.buildDir)
	], cb);
});

gulp.task('ng-compile', () => {
	const ngc = (args) => new Promise((resolve, reject) => { // Promisify version of the ngc compiler
		let exitCode = require('@angular/compiler-cli/src/main').main(args);
		resolve(exitCode);
	});

	return Promise.resolve()
		.then(() => ngc(['--project', `${buildFolder}/tsconfig.es5.json`])
			.then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
			.then(() => log('ES5 compilation succeeded.'))
		)
		.catch(e => {
			log(colors.red('ng-compilation failed. See below for errors.\n'));
			log(colors.red(e));
			process.exit(1);
		});
});

gulp.task('scss:demo', (cb) => {
	return Promise.resolve()
		.then(() => buildCss(`${config.demoDir}src`))
		.catch(e => {
			log(colors.red('sass compilation failed. See below for errors.\n'));
			log(colors.red(e));
		});
});

// Watch changes on (*.sass) Re-build _theming file in demo folder
gulp.task('scss:watch', (cb) => {
	gulp.watch([config.allSass, "!src/_theming.scss"], gulp.series('scss', 'scss:demo')).on('error', cb);
});

/////////////////////////////////////////////////////////////////////////////
// Packaging Tasks
/////////////////////////////////////////////////////////////////////////////

// Prepare 'dist' folder for publication to NPM
gulp.task('npm-package', (cb) => {
	const gulpFile = require('gulp-file');

	let pkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
	let targetPkgJson = {};
	let fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage', 'dependencies', 'peerDependencies'];

	targetPkgJson['name'] = config.libraryName;

	//only copy needed properties from project's package json
	fieldsToCopy.forEach((field) => {
		targetPkgJson[field] = pkgJson[field];
	});

	targetPkgJson['main'] = `./bundles/${config.unscopedLibraryName}.umd.js`;
	targetPkgJson['module'] = `./esm5/${config.unscopedLibraryName}.es5.js`;
	targetPkgJson['typings'] = `./${config.unscopedLibraryName}.d.ts`;

	// defines project's dependencies as 'peerDependencies' for final users
	// targetPkgJson.peerDependencies = {};
	// Object.keys(pkgJson.dependencies).forEach((dependency) => {
	//     // versions are defined as '^' by default, but you can customize it by editing "dependenciesRange" in '.yo-rc.json' file
	//     targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency].replace(/[\^~><=]/,'')}`;
	// });

	// copy the needed additional files in the 'dist' folder
	pump(
		[
			gulp.src(['README.md', 'LICENSE', 'CHANGELOG.md',
				`${config.buildDir}/lib/**/*.d.ts`,
				`${config.buildDir}/lib/**/*.metadata.json`
			]),
			gulpFile('package.json', JSON.stringify(targetPkgJson, null, 2)),
			gulp.dest(config.outputDir)
		], cb);
});

// Bundles the library as UMD/FESM bundles using RollupJS
gulp.task('rollup-bundle', (cb) => {
	const uglify = require('rollup-plugin-uglify');
	const rollup = require('rollup');
	const rollupSourcemaps = require('rollup-plugin-sourcemaps');
	const rollupNodeResolve = require('rollup-plugin-node-resolve');
	const rollupCommonjs = require('rollup-plugin-commonjs');
	const concat = require('gulp-concat');
	const _ = require('lodash');

	return Promise.resolve()
		// Bundle lib.
		.then(() => {
			const ignoredRollUpMessages = [
				'treating it as an external dependency',
				'No name was provided for external module'
			];

			const displayWarning = function(warn) {
				var isNotAnIgnoredMessage = ignoredRollUpMessages.every(function(mess) {
					return warn.message.indexOf(mess) != -1;
				});
				if (isNotAnIgnoredMessage) {
					console.log('WARNING : ', warn.message);
				}
			}
			// Base configuration.
			const input = path.join(outputFolder, `${config.unscopedLibraryName}.js`);
			const globals = {
				// The key here is library name, and the value is the name of the global variable name
				// the window object.
				// See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.

				// Angular dependencies 
				'@angular/core': 'ng.core',
				'@angular/common': 'ng.common',

				// Rxjs dependencies
				'rxjs/Subject': 'Rx',
				'rxjs/Observable': 'Rx',
				'rxjs/add/observable/fromEvent': 'Rx.Observable',
				'rxjs/add/observable/forkJoin': 'Rx.Observable',
				'rxjs/add/observable/of': 'Rx.Observable',
				'rxjs/add/observable/merge': 'Rx.Observable',
				'rxjs/add/observable/throw': 'Rx.Observable',
				'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
				'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
				'rxjs/add/operator/map': 'Rx.Observable.prototype',
				'rxjs/add/operator/filter': 'Rx.Observable.prototype',
				'rxjs/add/operator/do': 'Rx.Observable.prototype',
				'rxjs/add/operator/share': 'Rx.Observable.prototype',
				'rxjs/add/operator/finally': 'Rx.Observable.prototype',
				'rxjs/add/operator/catch': 'Rx.Observable.prototype',
				'rxjs/add/observable/empty': 'Rx.Observable.prototype',
				'rxjs/add/operator/first': 'Rx.Observable.prototype',
				'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
				'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',

				// ATTENTION:
				// Add any other dependency or peer dependency of your library here
				// This is required for UMD bundle users.
				// See https://github.com/tinesoft/generator-ngx-library/TROUBLESHOUTING.md if trouble

			};
			const rollupBaseConfig = {
				output: {
					name: _.camelCase(config.libraryName),
					sourcemap: true,
					globals: globals
				},
				// List of dependencies
				// See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
				external: Object.keys(globals),
				plugins: [
					rollupCommonjs({
						include: ['node_modules/rxjs/**']
					}),
					rollupSourcemaps(),
					rollupNodeResolve({
						jsnext: true,
						module: true,
						jail: distFolder, // to use final 'package.json' from 'dist/'
					})
				],
				onwarn: displayWarning
			};

			// UMD bundle.
			const umdConfig = _.merge({}, rollupBaseConfig, {
				input: input,
				output: {
					format: 'umd',
					file: path.join(distFolder, `bundles`, `${config.unscopedLibraryName}.umd.js`)
				}
			});

			// Minified UMD bundle.
			const minifiedUmdConfig = _.merge({}, rollupBaseConfig, {
				input: input,
				output: {
					format: 'umd',
					file: path.join(distFolder, `bundles`, `${config.unscopedLibraryName}.umd.min.js`),
				},
				plugins: rollupBaseConfig.plugins.concat([uglify.uglify()])
			});

			// flat module bundle.
			const fesm5config = _.merge({}, rollupBaseConfig, {
				input: input,
				output: {
					format: 'es',
					file: path.join(distFolder, 'esm5', `${config.unscopedLibraryName}.es5.js`),
				}
			});

			const allBundles = [
				umdConfig,
				minifiedUmdConfig,
				fesm5config
			].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg.output)));

			return Promise.all(allBundles)
				.then(() => log('All bundles generated successfully.'))
		})
		.catch(e => {
			log(colors.red('rollup-bundling failed. See below for errors.\n'));
			log(colors.red(e));
			process.exit(1);
		});
});

/////////////////////////////////////////////////////////////////////////////
// Documentation Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('build:doc', gulp.series('clean:doc', (cb) => {
	pump([
		gulp.src('src/**/*.ts'),
		gulpCompodoc({
			tsconfig: 'src/tsconfig.es5.json',
			hideGenerator: true,
			disableCoverage: true,
			output: `${config.docDir}`
		})
	], cb);
}));

gulp.task('serve:doc', gulp.series('clean:doc', (cb) => {
	pump([
		gulp.src('src/**/*.ts'),
		gulpCompodoc({
			tsconfig: 'src/tsconfig.es5.json',
			serve: true,
			output: `${config.docDir}`
		})
	], cb);
}));

/////////////////////////////////////////////////////////////////////////////
// Demo Tasks
/////////////////////////////////////////////////////////////////////////////
const execDemoCmd = (args, opts) => {
	if (fs.existsSync(`${config.demoDir}/node_modules`)) {
		return execCmd('ng', args, opts, `/${config.demoDir}`);
	} else {
		log(colors.red(`Demo dependencied not installed. Please execute yarn in demo folder.`));
		log(colors.red(e));
		process.exit(1);
	}
};

gulp.task('install:demo', () => {
	return execExternalCmd('yarn', '', {
		cwd: `${config.demoDir}`
	});
});

gulp.task('test:demo', () => {
	return execDemoCmd('test', {
		cwd: `${config.demoDir}`
	});
});

gulp.task('serve:demo', () => {
	return execDemoCmd('serve', {
		cwd: `${config.demoDir}`
	});
});

gulp.task('build:demo', () => {
	return execDemoCmd(`build --prod`, {
		cwd: `${config.demoDir}`
	});
});

gulp.task('unlink:demo', (cb) => {
	return execExternalCmdNoErrors('yarn', 'unlink @deja-js/component', {
		cwd: `${config.demoDir}`
	});
});

/////////////////////////////////////////////////////////////////////////////
// Release Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('changelog', (cb) => {
	const gulpConventionalChangelog = require('gulp-conventional-changelog');

	pump(
		[
			gulp.src('CHANGELOG.md', {
				buffer: true
			}),
			gulpConventionalChangelog({
				preset: 'angular'
			}),
			gulp.dest('./')
		], cb);
});

gulp.task('github-release', (cb) => {
	const conventionalGithubReleaser = require('conventional-github-releaser');

	if (!argv.ghToken && !process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN) {
		log(colors.red(`You must specify a Github Token via '--ghToken' or set environment variable 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' to allow releasing on Github`));
		throw new Error(`Missing '--ghToken' argument and environment variable 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' not set`);
	}

	conventionalGithubReleaser({
			type: 'oauth',
			token: argv.ghToken || process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
		}, {
			preset: 'angular'
		},
		cb);
});

gulp.task('bump-version', (cb) => {
	const gulpBump = require('gulp-bump');

	if (!argv.version) {
		log(colors.red(`You must specify which version to bump to (Possible values: 'major', 'minor', and 'patch')`));
		throw new Error(`Missing '--version' argument`);
	}

	pump(
		[
			gulp.src('./package.json'),
			gulpBump({
				type: argv.version
			}),
			gulp.dest('./'),
		], cb);
});

gulp.task('commit-changes', (cb) => {
	let version = getPackageJsonVersion();
	pump(
		[
			gulp.src('.'),
			gulpGit.add(),
			gulpGit.commit(`chore(release): bump version number to ${version}`)
		], cb);
});

gulp.task('push-changes', (cb) => {
	gulpGit.push('origin', 'dev', {
		args: '--tags'
	}, (error) => {
		if (error) {
			return cb(error);
		}
		gulpGit.push('origin', 'dev', cb);
	});
});

gulp.task('create-new-tag', (cb) => {
	let version = `v${getPackageJsonVersion()}`;
	gulpGit.tag(version, `chore(release): :sparkles: :tada: create tag for version ${version}`, cb);
});

gulp.task('release', gulp.series('bump-version', 'changelog', 'commit-changes', 'create-new-tag', 'push-changes'));

gulp.task('beta', gulp.series('changelog', 'commit-changes', 'create-new-tag'));

/////////////////////////////////////////////////////////////////////////////
// Utility Tasks
/////////////////////////////////////////////////////////////////////////////

// Link 'dist' folder (create a local 'ng-scrollreveal' package that symlinks to it)
// This way, we can have the demo project declare a dependency on 'ng-scrollreveal' (as it should)
// and, thanks to 'npm link ng-scrollreveal' on demo project, be sure to always use the latest built
// version of the library ( which is in 'dist/' folder)
gulp.task('link', () => {
	return execExternalCmd('yarn', 'link', {
		cwd: `${config.sourceDir}`
	});
});

gulp.task('unlink', () => {
	return execExternalCmdNoErrors('yarn', 'unlink', {
		cwd: `${config.sourceDir}`
	}).catch();
});

// Upload code coverage report to coveralls.io (will be triggered by Travis CI on successful build)
gulp.task('coveralls', (cb) => {
	const gulpCoveralls = require('gulp-coveralls');

	pump(
		[
			gulp.src(`${config.coverageDir}/coverage.lcov`),
			gulpCoveralls()
		], cb);
});

// Load additional tasks
gulpHub(['./config/gulp-tasks/*.js']);

/////////////////////////////////////////////////////////////////////////////
// Sequenced tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('clean', gulp.series('clean:dist', 'clean:coverage', 'clean:doc', 'clean:tmp', 'clean:build', 'clean:demo'));

// Lint, Prepare Build, , Sass to css, Inline templates & Styles and Ng-Compile
gulp.task('compile', gulp.series('lint', 'pre-compile', 'inline-templates', 'ng-compile'));

// Build the 'dist' folder (without publishing it to NPM)
gulp.task('build', gulp.series('clean', 'license', 'compile', 'test', 'npm-package', 'rollup-bundle', 'build:scss', 'scss', 'scss:demo', 'build:doc', 'clean:tmp'));

gulp.task('default', gulp.series('build'));
gulp.task('build:watch-scss', gulp.series('scss:watch'));
gulp.task('start', gulp.parallel('build:scss', 'scss', 'scss:demo', 'build:watch-scss', 'serve:demo'));
gulp.task('test:ci', gulp.series('clean', 'compile', 'test'));
gulp.task('clean:all', gulp.series('clean', 'clean:lock', 'clean:src-node-modules', 'clean:demo-node-modules', 'clean:node-modules'));

// Build and then Publish 'dist' folder to NPM
gulp.task('npm-publish', gulp.series('build', () => {
	return execExternalCmd('npm', `publish ${config.outputDir}`)
}));