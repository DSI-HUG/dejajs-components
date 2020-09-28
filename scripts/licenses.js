const fs = require('fs');
const path = require('path');
const BadLicenseError = require('./bad-license-error');

const flatten = arr => arr.reduce((acc, val) =>
    acc.concat(Array.isArray(val) ? flatten(val) : val), []);

Array.prototype.flatten = function() {
 return flatten(this);
};

const walkSync = dir => fs.readdirSync(dir)
    .map(file => fs.statSync(path.join(dir, file)).isDirectory()
        ? walkSync(path.join(dir, file))
        : path.join(dir, file).replace(/\\/g, '/')).flatten();

const filePaths = walkSync('./projects/deja-js');
if (filePaths && filePaths.length > 0) {
    const header = fs.readFileSync('./scripts/header-license.txt', 'utf-8');
    const badLicences = [];
    filePaths.forEach(p => {
        if (p.endsWith('.ts')) {
            const content = fs.readFileSync(p, 'utf-8');
            if (!content.startsWith(header)) {
                badLicences.push(p);
            }
        }
    });
    if (badLicences.length > 0) {
        // console.log('\u001b[31m', badLicences.join('\n'), '\u001b[39m')
        throw new BadLicenseError('Bad license on :', badLicences);
    }
}
