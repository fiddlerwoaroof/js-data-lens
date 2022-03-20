import { describe, test, expect } from "@jest/globals";
import { tests } from "./index_tests";

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
  expect(cb, context, ...args) {
    return expect(cb(context), ...args);
  },
});
