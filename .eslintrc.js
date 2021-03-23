module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['/*.*', '/*.d.ts'],
  rules: {
    'react/prop-types': 0,
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-unneeded-ternary': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 0,
    'react/jsx-props-no-spreading': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 0,
  },
};
