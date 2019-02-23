module.exports = {
  transform: {
    "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  preset: "react-native",
  testRegex: "(/__tests__/.*|/src/.*\\.(test|spec))\\.(jsx?|tsx?)$",
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
  collectCoverageFrom: [
    "src/**/*.{js,jsx, ts, tsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/index.js",
    "!build/**/*.*"
  ]
};
