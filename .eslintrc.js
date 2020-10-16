const UPPER_CASE_REGEXP = [
    // url params
    'PATIENT_ID',
    'SCOPEID',
    'SESSIONID',
    'EDS_ID',
    'DOCPAGE',

    // proxy call
    'SERVERID',
    'SERVICEID',
    'SUBSERVICEID',
    'REQUEST'
];

module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'plugins': [
        '@typescript-eslint',
        '@angular-eslint',
        'prefer-arrow',
        'simple-import-sort',
        'rxjs',
        'rxjs-angular',
        'no-loops',
        'cypress',
        'chai-friendly'
    ],
    'extends': [
        'eslint:recommended'
    ],
    'rules': {
        'arrow-body-style': 'error',
        'brace-style': [
            'error',
            '1tbs'
        ],
        'comma-dangle': 'error',
        'curly': 'error',
        'dot-notation': 'error',
        'eol-last': 'error',
        'eqeqeq': [
            'error',
            'always'
        ],
        'guard-for-in': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-console': [
            'error',
            {
                'allow': [
                    'log',
                    'warn',
                    'dir',
                    'timeLog',
                    'assert',
                    'clear',
                    'count',
                    'countReset',
                    'group',
                    'groupEnd',
                    'table',
                    'dirxml',
                    'error',
                    'groupCollapsed',
                    'Console',
                    'profile',
                    'profileEnd',
                    'timeStamp',
                    'context'
                ]
            }
        ],
        'no-debugger': 'error',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-irregular-whitespace': 'error',
        'no-multiple-empty-lines': 'error',
        'no-new-wrappers': 'error',
        'no-redeclare': 'error',
        'no-restricted-imports': [
            'error',
            'rxjs/Rx'
        ],
        'no-shadow': [
            'error',
            {
                'hoist': 'all'
            }
        ],
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'one-var': [
            'error',
            'never'
        ],
        'max-statements-per-line': 'error',
        'prefer-arrow/prefer-arrow-functions': 'error',
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        'prefer-template': 'error',
        'radix': 'error',
        'spaced-comment': [
            'error',
            'always',
            {
                'markers': [
                    '/'
                ]
            }
        ],
        'use-isnan': 'error',
        'lines-between-class-members': [
            'error',
            'always',
            {
                'exceptAfterSingleLine': true
            }
        ],
        'no-template-curly-in-string': 'error',
        'no-multi-spaces': 'error',
        'keyword-spacing': 'error',
        'key-spacing': 'error',
        'no-whitespace-before-property': 'error',
        'block-spacing': 'error',
        'comma-spacing': 'error',
        'semi-spacing': 'error',
        'func-call-spacing': 'error',
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'space-before-function-paren': [
            'error',
            'never'
        ],
        'simple-import-sort/sort': [
            'error',
            {
                groups: [
                    ['^\\u0000'],
                    ['^@?\\w'],
                    ['^[^(\\.|src/)]'],
                    ['^src/'],
                    ['^\\.']
                ]
            }
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'object-curly-newline': [
            'error',
            {
                'multiline': true,
                'consistent': true
            }
        ],
        'array-callback-return': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'no-floating-decimal': 'error',
        'array-bracket-newline': [
            'error',
            'consistent'
        ],
        'array-element-newline': [
            'error',
            'consistent'
        ],
        'array-bracket-spacing': 'error',
        'camelcase': 'error',
        'comma-style': 'error',
        'computed-property-spacing': 'error',
        'no-lonely-if': 'error',
        'no-nested-ternary': 'error',
        'no-unneeded-ternary': 'error',
        'object-property-newline': [
            'error',
            {
                'allowAllPropertiesOnSameLine': true
            }
        ],
        'semi-style': 'error',
        'space-in-parens': 'error',
        'switch-colon-spacing': 'error',
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'arrow-spacing': 'error',
        'no-useless-rename': 'error',
        'prefer-arrow-callback': 'error',
        'rest-spread-spacing': 'error',
        'template-curly-spacing': 'error',
        'consistent-return': 'error',
        'no-loops/no-loops': 'error',
        'no-restricted-globals': [
            'error',
            {
                'name': 'event',
                'message': 'Use local parameter instead.'
            },
            {
                'name': 'fdescribe',
                'message': 'Do not commit \'fdescribe\'. Use \'describe\' instead.'
            },
            {
                'name': 'fit',
                'message': 'Do not commit \'fit\'. Use \'it\' instead.'
            }
        ],
        'space-before-blocks': 'error'
    },
    'overrides': [
        {
            'files': ['**/*.ts', '**/*.tsx', '**/*.component.html'],
            'env': {
                'browser': true,
                'es6': true,
                'node': true,
                'jasmine': true
            },
            'parser': '@typescript-eslint/parser',
            'parserOptions': {
                'project': 'tsconfig.json',
                'sourceType': 'module'
            },
            'extends': [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:@angular-eslint/recommended'
            ],
            'rules': {
                '@typescript-eslint/restrict-template-expressions': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': ['error'],
                'max-len': 'off',
                'arrow-parens': [
                    'error',
                    'as-needed'
                ],
                'no-multiple-empty-lines': 'error',
                '@typescript-eslint/no-var-requires': 'error',
                'comma-dangle': 'error',
                'no-empty': 'error',
                '@typescript-eslint/brace-style': [
                    'error',
                    '1tbs'
                ],
                '@typescript-eslint/comma-spacing': 'error',
                '@typescript-eslint/default-param-last': 'error',
                '@typescript-eslint/func-call-spacing': 'error',
                '@typescript-eslint/no-base-to-string': 'error',
                '@typescript-eslint/no-extra-non-null-assertion': 'error',
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
                '@typescript-eslint/space-before-function-paren': [
                    'error',
                    'never'
                ],
                '@typescript-eslint/switch-exhaustiveness-check': 'error',
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        'selector': 'default',
                        'format': ['strictCamelCase']
                    },
                    {
                        'selector': 'typeLike',
                        'format': ['PascalCase']
                    },
                    {
                        'selector': 'enumMember',
                        'format': ['UPPER_CASE']
                    },
                    {
                        'selector': 'property',
                        'format': ['strictCamelCase'],
                        'leadingUnderscore': 'allow'
                    },
                    {
                        'selector': 'property',
                        'format': ['UPPER_CASE'],
                        'filter': {
                            'regex': `^(${UPPER_CASE_REGEXP.join('|')})$`,
                            'match': true
                        }
                    },
                    {
                        'selector': 'property',
                        'modifiers': ['static'],
                        'format': ['UPPER_CASE']
                    },
                    {
                        'selector': 'parameter',
                        'format': ['strictCamelCase'],
                        'leadingUnderscore': 'allow'
                    }
                ],
                '@typescript-eslint/unbound-method': [
                    'error',
                    {
                        'ignoreStatic': true
                    }
                ],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        'argsIgnorePattern': '^_'
                    }
                ],
                '@typescript-eslint/consistent-type-definitions': 'error',
                '@typescript-eslint/explicit-member-accessibility': [
                    'error',
                    {
                        'accessibility': 'explicit',
                        'overrides': {
                            'accessors': 'explicit',
                            'parameterProperties': 'explicit'
                        }
                    }
                ],
                '@typescript-eslint/indent': 'error',
                '@typescript-eslint/keyword-spacing': 'error',
                '@typescript-eslint/member-delimiter-style': [
                    'error',
                    {
                        'multiline': {
                            'delimiter': 'semi',
                            'requireLast': true
                        },
                        'singleline': {
                            'delimiter': 'semi',
                            'requireLast': false
                        }
                    }
                ],
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        'default': [
                            // Index signature
                            'signature',

                            // Fields
                            'public-static-field',
                            'protected-static-field',
                            'private-static-field',

                            'public-decorated-field',
                            'protected-decorated-field',
                            'private-decorated-field',

                            'public-instance-field',
                            'protected-instance-field',
                            'private-instance-field',

                            'public-abstract-field',
                            'protected-abstract-field',
                            'private-abstract-field',

                            'public-field',
                            'protected-field',
                            'private-field',

                            'static-field',
                            'instance-field',
                            'abstract-field',

                            'decorated-field',

                            'field',

                            // Constructors
                            'public-constructor',
                            'protected-constructor',
                            'private-constructor',

                            'constructor',

                            // Methods
                            'public-static-method',
                            'protected-static-method',
                            'private-static-method',

                            'public-decorated-method',
                            'protected-decorated-method',
                            'private-decorated-method',

                            'public-instance-method',
                            'protected-instance-method',
                            'private-instance-method',

                            'public-abstract-method',
                            'protected-abstract-method',
                            'private-abstract-method',

                            'public-method',
                            'protected-method',
                            'private-method',

                            'static-method',
                            'instance-method',
                            'abstract-method',

                            'decorated-method',

                            'method'
                        ]
                    }
                ],
                '@typescript-eslint/no-empty-interface': 'error',
                '@typescript-eslint/no-inferrable-types': 'error',
                '@typescript-eslint/no-misused-new': 'error',
                '@typescript-eslint/no-unnecessary-qualifier': 'error',
                '@typescript-eslint/prefer-for-of': 'error',
                '@typescript-eslint/prefer-function-type': 'error',
                '@typescript-eslint/quotes': [
                    'error',
                    'single'
                ],
                '@typescript-eslint/semi': [
                    'error',
                    'always'
                ],
                '@typescript-eslint/type-annotation-spacing': 'error',
                '@typescript-eslint/unified-signatures': 'error',
                '@typescript-eslint/prefer-includes': 'error',
                '@typescript-eslint/prefer-string-starts-ends-with': 'error',
                '@typescript-eslint/prefer-optional-chain': 'error',
                '@typescript-eslint/method-signature-style': [
                    'error',
                    'method'
                ],
                'rxjs/no-ignored-replay-buffer': 'error',
                'rxjs/no-ignored-observable': 'error',
                'rxjs/no-nested-subscribe': 'error',
                'rxjs/no-topromise': 'error',
                'rxjs/no-unbound-methods': 'error',
                'rxjs/no-unsafe-takeuntil': 'error',
                'rxjs/no-subject-value': 'error',
                'rxjs/no-unsafe-subject-next': 'error',
                'rxjs/finnish': 'error',
                'rxjs-angular/prefer-takeuntil': [
                    'error',
                    {
                        'checkDestroy': false
                    }
                ],
                '@angular-eslint/component-max-inline-declarations': 'error',
                '@angular-eslint/prefer-output-readonly': 'error',
                '@angular-eslint/use-component-selector': 'error',
                '@angular-eslint/use-pipe-decorator': 'error'
            }
        },
        {
            'files': ['cypress/**/*.ts'],
            'env': {
                'browser': true,
                'es6': true,
                'node': true,
                'cypress/globals': true
            },
            'parser': '@typescript-eslint/parser',
            'parserOptions': {
                'project': 'cypress/tsconfig.json',
                'sourceType': 'module'
            },
            'extends': [
                'plugin:cypress/recommended',
                'plugin:chai-friendly/recommended'
            ]
        }
    ]
};
