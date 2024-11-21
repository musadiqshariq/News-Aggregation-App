module.exports = {
    parser: '@babel/eslint-parser', // To parse JSX and TypeScript
    parserOptions: {
      ecmaVersion: 2021, // or the version of ECMAScript you're using
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        jsx: true, // Allows for the parsing of JSX
      },
    },
    env: {
      browser: true, // Enables browser global variables
      es2021: true, // Enables ES2021 globals
      jest: true, // Enables Jest global variables
    },
    extends: [
      'eslint:recommended', // Use the recommended rules from eslint
      'plugin:react/recommended', // Use the recommended rules from eslint-plugin-react
      'plugin:react-hooks/recommended', // Use the recommended rules from eslint-plugin-react-hooks
      'plugin:import/errors', // Use eslint-plugin-import for import/export syntax validation
      'plugin:import/warnings',
      'plugin:jsx-a11y/recommended', // Use eslint-plugin-jsx-a11y for accessibility linting
      'plugin:jest/recommended', // Use eslint-plugin-jest for Jest-related linting
    ],
    rules: {
      // Add your custom rules here
      'react/prop-types': 'off', // Disable prop-types check since you might not be using PropTypes
      'react/react-in-jsx-scope': 'off', // React 17 does not require importing React in JSX
    },
    settings: {
      react: {
        version: 'detect', // Detect the version of React to use
      },
    },
  };
  