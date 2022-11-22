module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['next/core-web-vitals'],
  ignorePatterns: ['.eslintrc.js'],
}
