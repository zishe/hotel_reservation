import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as fetch from "jest-fetch-mock";

const JSDOM = require("jsdom").JSDOM;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
}

Enzyme.configure({ adapter: new Adapter() });

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

// global.window = window;
global.document = window.document;
global.window = document.defaultView;
global.navigator = {
  userAgent: "node.js"
};
copyProps(window, global);

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error;
console.error = message => {
  if (message.startsWith("Warning:")) {
    return;
  }

  originalConsoleError(message);
};
