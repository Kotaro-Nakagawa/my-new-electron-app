module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/electron",
    "plugin:import/typescript"
  ],
  "parser": "@typescript-eslint/parser",
  "settings": {
    "import/resolver": {
      webpack: { config: path.join(__dirname, 'webpack.main.config.ts') }
    }
  }
}