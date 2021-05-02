// eslint-disable-next-line no-undef
module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
        'es6': true,
        'jest': true,
    },
    'extends': [
        // 'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
            'modules': true,
        },
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    'globals': {},
    'plugins': [
        'import',
        'react',
        'react-hooks',
    ],
    'ignorePatterns': ['node_modules/'],
    'rules': {
        'react/prop-types': 'off',
        'no-extra-semi': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn', 
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
    },
    'settings': {
        'react': {
          'version': 'latest', // 'detect' automatically picks the version you have installed.
        },
    },
};
