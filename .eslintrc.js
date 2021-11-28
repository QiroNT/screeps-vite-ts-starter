// @ts-check

/**
 * Eslint Configuration File
 *
 * Docs: https://eslint.org/docs/user-guide/configuring
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  /**
   * Config Root
   */
  root: true,
  /**
   * Custom Rules
   */
  rules: {},
  /**
   * Custom Groups
   */
  overrides: [
    {
      files: ['*.ts'],
      env: {
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
    {
      files: ['*.js'],
      env: {
        node: true,
        es6: true,
      },
      extends: ['eslint:recommended', 'prettier'],
    },
  ],
}
