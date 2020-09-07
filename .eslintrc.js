module.exports = {
	extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 10,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["simple-import-sort"],
	rules: {
		"@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-non-null-assertion": ["warn"],
		"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/prefer-interface": "off",
		"no-console": "off",
		"no-unused-vars": "off",
		"prettier/prettier": "warn",
		"simple-import-sort/sort": "warn",
		curly: ["warn", "multi"],
	},
};