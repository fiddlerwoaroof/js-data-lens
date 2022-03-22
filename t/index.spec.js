import { describe, test, expect } from "@jest/globals";
import { tests } from "./index_tests";

const when = (expect) => (thing) => ({
  isCalledWith(...arglists) {
    let result = thing;
    for (const args of arglists) {
      result = result(...args);
    }
    return {
      get expect() {
        return expect(() => result);
      },
    };
  },
});

const _expect = function (cb, context, ...args) {
  return expect(cb(context), ...args);
};

tests({
  describe,
  test(desc, cb, ...args) {
    return test(
      desc,
      () => {
        expect.hasAssertions();
        return cb();
      },
      ...args
    );
  },
  expect: _expect,
  when: when(_expect),
});
