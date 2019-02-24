module.exports = {
  transform: {
    "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!native-base)/",
    "node_modules/(?!react-native|native-base|react-native-vector-icons|react-navigation|native-base-shoutem-theme|@shoutem/theme|@shoutem/animation|@shoutem/ui|tcomb-form-native)"
  ],
  preset: "react-native",
  testRegex: "(/__tests__/.*|/src/.*\\.(test|spec))\\.(tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "ios.ts",
    "ios.tsx",
    "android.ts",
    "android.tsx"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "!<rootDir>/node_modules/",
    "!<rootDir>/index.js",
    "!build/**/*.*"
  ]
};
