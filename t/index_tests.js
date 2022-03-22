import * as uut from "../index.js";

export function iotaTests({ describe, test, expect }) {
  describe("iota", () => {
    test("returns the right number of items", () => {
      for (let items = 0; items < 10; items++) {
        expect(() => uut.iota(items)).toHaveLength(items);
      }
    });
    test("returns the right number of items, independently of start", () => {
      for (let start = 0; start < 10; start++) {
        expect(() => uut.iota(5, start)).toHaveLength(5);
      }
      expect(() => uut.iota(5, 2.3)).toHaveLength(5);
    });
    test("returns the right start, if count > 0", () => {
      expect(() => uut.iota(0, 5)).toEqual([]);
      for (let items = 1; items < 10; items++) {
        expect(({ items }) => uut.iota(items, 5), { items }).toHaveProperty(
          "0",
          5
        );
        expect(({ items }) => uut.iota(items, -5), { items }).toHaveProperty(
          "0",
          -5
        );
        expect(({ items }) => uut.iota(items, 2.5), { items }).toHaveProperty(
          "0",
          2.5
        );
        expect(({ items }) => uut.iota(items, NaN), { items }).toHaveProperty(
          "0",
          NaN
        );
        expect(({ items }) => uut.iota(items, Infinity), {
          items,
        }).toHaveProperty("0", Infinity);
        expect(({ items }) => uut.iota(items, -Infinity), {
          items,
        }).toHaveProperty("0", -Infinity);
      }
    });
  });
}

export function overTests({ describe, test, expect }) {
  describe("over", () => {
    test("applies transform to each element", () => {
      expect(() => uut.over((v) => v + 1)([1, 2, 3])).toEqual([2, 3, 4]);
    });
    test("preserves length", () => {
      for (let items = 0; items < 10; items++) {
        const inp = uut.iota(items);
        expect(() => uut.over((v) => v)(inp)).toHaveLength(items);
      }
    });
  });
}

export function juxtTests({ describe, test, expect }) {
  describe("juxt", () => {
    test("works", () => {
      expect(() =>
        uut.juxt(
          (v) => v + 1,
          (v) => v * 2,
          (v) => v / 2,
          (v) => v - 2
        )(6)
      ).toEqual([7, 12, 3, 4]);
    });
    test("runs each transform", () => {
      for (let items = 1; items < 10; items++) {
        const inp = uut.iota(items).map(() => (v) => v);
        expect(() => uut.juxt(...inp)({})).toHaveLength(items);
      }
    });
  });
}

export function onTests({ describe, test, expect }) {
  describe("on", () => {
    test("works", () => {
      expect(() =>
        uut.on(
          (v) => v + 1,
          ({ a }) => a
        )({ a: 2 })
      ).toEqual(3);
    });
  });
}

export function applyingTests({ describe, test, expect }) {
  describe("applying", () => {
    test("works", () => {
      expect(() =>
        uut.applying(
          (...args) => args.reduce((a, b) => a + b, 0),
          2,
          3
        )([4, 5, 6])
      ).toEqual(2 + 3 + 4 + 5 + 6);
    });
  });
}

export function filterTests({ describe, test, expect }) {
  describe("filter", () => {
    test("works", () => {
      expect(() => uut.filter((a, b) => a < b, 6)([4, 5, 6])).toEqual([4, 5]);
    });
  });
}

export function includeTests({ describe, test, expect }) {
  describe("include", () => {
    test("works", () => {
      expect(() => uut.include((a) => a < 6)([4, 5, 6])).toEqual([4, 5]);
    });
  });
}

export function excludeTests({ describe, test, expect }) {
  describe("exclude", () => {
    test("works", () => {
      expect(() => uut.exclude((a, b) => a < 6)([4, 5, 6])).toEqual([6]);
    });
  });
}

export function zip_withTests({ describe, test, expect }) {
  describe("zip_with", () => {
    test("works", () => {
      expect(() =>
        uut.zip_with((a, b) => a < b)([
          [4, 5, 6],
          [6, 5, 4],
        ])
      ).toEqual([true, false, false]);
      expect(() =>
        uut.zip_with((a, b, c) => a + b + c)([
          [4, 5, 6],
          [6, 5, 4],
          [0, 0, 0],
        ])
      ).toEqual([10, 10, 10]);
    });
  });
}

export function elementTests({ describe, test, expect }) {
  describe("element", () => {
    test("works", () => {
      expect(() => uut.element(0)([1])).toEqual(1);
    });
  });
}

export function keyTests({ describe, test, expect }) {
  describe("key", () => {
    test("works", () => {
      expect(() => uut.key(0)([1])).toEqual(1);
      expect(() => uut.key("a")({ a: 1 })).toEqual(1);
    });
  });
}

export function eqTests({ describe, test, expect }) {
  describe("eq", () => {
    test("works", () => {
      expect(() => uut.eq(0)(0)).toBeTruthy();
      expect(() => uut.eq(0, (a, b) => a + 1 === b - 1)(2)).toBeTruthy();
    });
  });
}

export function applicable_whenTests({ describe, test, expect }) {
  describe("applicable_when", () => {
    test("works", () => {
      expect(() =>
        uut.applicable_when(
          () => true,
          (v) => v + 1
        )(0)
      ).toEqual(1);
      expect(() =>
        uut.applicable_when(
          () => false,
          (v) => v + 1
        )(0)
      ).toEqual(0);
    });
  });
}

export function matches_regexTests({ describe, test, expect }) {
  describe("matches_regex", () => {
    test("works", () => {
      expect(() => uut.matches_regex(/^a/)("a")).toBeTruthy();
      expect(() => uut.matches_regex(/^a/)("b")).toBeFalsy();
      expect(() => uut.matches_regex(/a/)("ba")).toBeTruthy();
      expect(() =>
        uut.matches_regex({
          test() {
            return true;
          },
        })()
      ).toEqual(true);
      expect(() =>
        uut.matches_regex({
          test() {
            return false;
          },
        })()
      ).toEqual(false);
    });
  });
}

export function complementTests({ describe, test, expect }) {
  describe("complement", () => {
    test("works", () => {
      expect(() => uut.complement(() => true)()).toEqual(false);
      expect(() => uut.complement(() => false)()).toEqual(true);
      expect(() => uut.complement((a, b) => a < b)(1, 2)).toEqual(false);
      expect(() => uut.complement((a, b) => a < b)(1, 1)).toEqual(true);
      expect(() => uut.complement((a, b) => a < b)(2, 1)).toEqual(true);
    });
  });
}

export function pickTests({ describe, test, expect }) {
  describe("pick", () => {
    test("works", () => {
      expect(() => uut.pick({ a: 1, b: 2, c: 3 })(["a", "c"])).toEqual([1, 3]);
    });
  });
}

/*
(funcall (on (alexandria:compose
              (over (transform-tail (over (slice 1))))
              (compress-runs :collector 'combine-matching-lists))
             (alexandria:compose
              (over (juxt (element 0)
                          'identity))
              (sorted 'char<
                      :key (element 0))))
         '("January" "February" "March" "April"
           "May" "June" "July" "August"
           "September" "October" "November" "December"))
*/

function compress_runsTest({ describe, test, expect, when }) {
  describe("compress_runs", () => {
    test("works", () => {
      when(uut.compress_runs)
        .isCalledWith([], [[1, 1, 2, 3, 3, 4, 5, 5]])
        .expect.toEqual([1, 2, 3, 4, 5]);

      when(uut.compress_runs)
        .isCalledWith([], [[1, 2, 3, 4, 5]])
        .expect.toEqual([1, 2, 3, 4, 5]);

      when(uut.compress_runs).isCalledWith([], [[]]).expect.toEqual([]);
    });
  });
}

function composedTests({ describe, test, expect }) {
  describe("compose", () => {
    test("sample", () => {
      expect(() =>
        uut.compose(
          (v) => v + 1,
          (v) => v * 2,
          (v) => v + 1
        )(4)
      ).toEqual(11);

      (({
        combine_matching_lists,
        compose,
        compress_runs,
        element,
        juxt,
        on,
        over,
        slice,
        sorted,
        transform_tail,
      }) => {
        expect(() =>
          on(
            compose(
              over(transform_tail(over(slice(1)))),
              compress_runs({ collector: combine_matching_lists })
            ),
            compose(
              over(juxt(element(0), (x) => x)),
              sorted((a, b) => a < b, element(0))
            )
          )([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ])
        ).toEqual([
          ["A", "pril", "ugust"],
          ["D", "ecember"],
          ["F", "ebruary"],
          ["J", "anuary", "une", "uly"],
          ["M", "arch", "ay"],
          ["N", "ovember"],
          ["O", "ctober"],
          ["S", "eptember"],
        ]);
      })(uut);
    });
  });
}

/**
 * @param {{ expect: any; test: any; describe: any; when: any; }} context
 */
export function tests(context) {
  [
    applicable_whenTests,
    applyingTests,
    complementTests,
    compress_runsTest,
    elementTests,
    eqTests,
    excludeTests,
    filterTests,
    filterTests,
    includeTests,
    iotaTests,
    juxtTests,
    keyTests,
    matches_regexTests,
    onTests,
    overTests,
    pickTests,
    zip_withTests,

    composedTests,
  ].forEach((test) => test(context));
}
