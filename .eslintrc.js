// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**", "backend/**"],
  extends: ["@repo/eslint-config/library.js"],
};
