module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '\\.(svg)$': '<rootDir>/src/__mocks__/svgMock.js'
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.{js,jsx,mjs}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'
  ],
  setupFiles: ['<rootDir>/setupTests.js'],
  testURL: 'http://localhost:3000/',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,mjs}',
    '!src/**/__tests__/*.{js,jsx,mjs}',
    '!src/**/__fixtures__/*.{js,jsx,mjs}',
    '!src/__utils__/*.{js,jsx,mjs}',
    '!src/enums/*.{js,jsx,mjs}'
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 55,
      lines: 67,
      statements: 65
    }
  },

  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css|less|styl)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|styl)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^icons(.*)$': '<rootDir>/public/assets/svg$1',
    '^elements(.*)$': '<rootDir>/src/elements$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^props(.*)$': '<rootDir>/src/props$1',
    '^hocs(.*)$': '<rootDir>/src/hocs$1',
    '^ducks(.*)$': '<rootDir>/src/ducks$1',
    '^api(.*)$': '<rootDir>/src/api$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^helpers(.*)$': '<rootDir>/src/helpers$1',
    '^enums(.*)$': '<rootDir>/src/enums$1',
    '^formatters(.*)$': '<rootDir>/src/formatters$1',
    '^models(.*)$': '<rootDir>/src/models$1',
    '^validators(.*)$': '<rootDir>/src/validators$1',
    '^src(.*)$': '<rootDir>/src$1',
    '^vendor(.*)$': '<rootDir>/vendor$1',
    '^__fixtures__(.*)$': '<rootDir>/__fixtures__$1'
  }
};
