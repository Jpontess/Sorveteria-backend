import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import jestPlugin from "eslint-plugin-jest";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.js"],
    plugins: {
      "@stylistic": stylistic,
      "jest": jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // Erros de Lógica
      "no-unused-vars": "off",
      "no-undef": "error",
      "@typescript-eslint/no-explicit-any": "error",
      
      // Erros de Estilo (Espaçamento, Aspas, etc)
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/type-annotation-spacing": "error",
      "@typescript-eslint/no-unused-vars": ["error"]
    },
  },
);
