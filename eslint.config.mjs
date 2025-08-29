import tseslint from "typescript-eslint"
import jest from "eslint-plugin-jest"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import pluginJs from "@eslint/js"
import globals from "globals"
export default [
  {
    ignores: ["dist/"],
  },
  { files: ["src/**/*.{js, ts, tsx}"] },
  {
    files: ["**/*.js"],
    languageOptions: { sourcetype: "commonjs" },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{js, ts, tsx}"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-resolves": "off",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-misused-promises": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
]
