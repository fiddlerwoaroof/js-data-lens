var t = await import("./t/index_tests.js");

const when = (expect) => (thing) => ({
  isCalledWith(...arglists) {
    const call = [];
    for (const args of arglists) {
      call.push(args);
    }

    return {
      get expect() {
        return {
          toEqual(w) {
            console.log(
              `\t\t${thing.name}${call
                .map((v) => `(${v.map((w) => JSON.stringify(w)).join(", ")})`)
                .join("")} returns ${JSON.stringify(w)}`
            );
          },
        };
      },
    };
  },
});

function describe(desc, cb) {
  console.log(desc);
  cb();
}

function test(desc, cb) {
  console.log("\t", desc);
  cb();
}

function expect(v, context) {
  v = v.toString();

  return {
    toHaveLength(length) {
      console.log("\t\t", v, "has length", length, "with context", context);
    },
    toEqual(w) {
      console.log("\t\t", v, "equals", w, "with context", context);
    },
    toHaveProperty(prop, value) {
      console.log(
        "\t\t",
        v,
        "has property",
        prop,
        "with value",
        value,
        "with context",
        context
      );
    },
    toBeTruthy() {
      console.log("\t\t", v, "returns a truthy value");
    },
    toBeFalsy() {
      console.log("\t\t", v, "returns a falsy value");
    },
  };
}

t.tests({ expect, test, describe, when: when(expect) });
// iota
// 	 returns the right number of items
// 		 uut.iota(items) has length 0
// 		 uut.iota(items) has length 1
// 		 uut.iota(items) has length 2
// 		 uut.iota(items) has length 3
// 		 uut.iota(items) has length 4
// 		 uut.iota(items) has length 5
// 		 uut.iota(items) has length 6
// 		 uut.iota(items) has length 7
// 		 uut.iota(items) has length 8
// 		 uut.iota(items) has length 9
// 	 returns the right number of items, independently of start
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, start) has length 5
// 		 uut.iota(5, 2.3) has length 5
// 	 returns the right start, if count > 0
// 		 uut.iota(0, 5) equals []
// 		 uut.iota(items, 5) has property 0 with value 5
// 		 uut.iota(items, -5) has property 0 with value -5
// 		 uut.iota(items, 2.5) has property 0 with value 2.5
// 		 uut.iota(items, NaN) has property 0 with value NaN
// 		 uut.iota(items, Infinity) has property 0 with value Infinity
// 		 uut.iota(items, -Infinity) has property 0 with value -Infinity
// 		 uut.iota(items, 5) has property 0 with value 5
// 		 uut.iota(items, -5) has property 0 with value -5
// 		 uut.iota(items, 2.5) has property 0 with value 2.5
// 		 uut.iota(items, NaN) has property 0 with value NaN
// 		 uut.iota(items, Infinity) has property 0 with value Infinity
// 		 uut.iota(items, -Infinity) has property 0 with value -Infinity
// 		 uut.iota(items, 5) has property 0 with value 5
// 		 uut.iota(items, -5) has property 0 with value -5
// 		 uut.iota(items, 2.5) has property 0 with value 2.5
// 		 uut.iota(items, NaN) has property 0 with value NaN
// 		 uut.iota(items, Infinity) has property 0 with value Infinity
// 		 uut.iota(items, -Infinity) has property 0 with value -Infinity
// 		 uut.iota(items, 5) has property 0 with value 5
// 		 uut.iota(items, -5) has property 0 with value -5
// 		 uut.iota(items, 2.5) has property 0 with value 2.5
// 		 uut.iota(items, NaN) has property 0 with value NaN
// 		 uut.iota(items, Infinity) has property 0 with value Infinity
// 		 uut.iota(items, -Infinity) has property 0 with value -Infinity
// 		 uut.iota(items, 5) has property 0 with value 5
// 		 uut.iota(items, -5) has property 0 with value -5
// 		 uut.iota(items, 2.5) has property 0 with value 2.5
// 		 uut.iota(items, NaN) has property 0 with value NaN
// 		 uut.iota(items, Infinity) has property 0 with value Infinity
// 		 uut.iota(items, -Infinity) has property 0 with value -Infinity
// 		 uut.iota(items, 5) has property 0 with value 5
// 		 uut.iota(items, -5) has property 0 with value -5
// 		 uut.iota(items, 2.5) has property 0 with value 2.5
// 		 uut.iota(items, NaN) has property 0 with value NaN
// 		 uut.iota(items, Infinity) has property 0 with value Infinity
// 		 uut.iota(items, -Infinity) has property 0 with value -Infinity
// 		 uut.iota(items, 5) has property 0 with value 5
// 		 uut.iota(items, -5) has property 0 with value -5
// 		 uut.iota(items, 2.5) has property 0 with value 2.5
// 		 uut.iota(items, NaN) has property 0 with value NaN
// 		 uut.iota(items, Infinity) has property 0 with value Infinity
// 		 uut.iota(items, -Infinity) has property 0 with value -Infinity
// 		 uut.iota(items, 5) has property 0 with value 5
// 		 uut.iota(items, -5) has property 0 with value -5
// 		 uut.iota(items, 2.5) has property 0 with value 2.5
// 		 uut.iota(items, NaN) has property 0 with value NaN
// 		 uut.iota(items, Infinity) has property 0 with value Infinity
// 		 uut.iota(items, -Infinity) has property 0 with value -Infinity
// 		 uut.iota(items, 5) has property 0 with value 5
// 		 uut.iota(items, -5) has property 0 with value -5
// 		 uut.iota(items, 2.5) has property 0 with value 2.5
// 		 uut.iota(items, NaN) has property 0 with value NaN
// 		 uut.iota(items, Infinity) has property 0 with value Infinity
// 		 uut.iota(items, -Infinity) has property 0 with value -Infinity
