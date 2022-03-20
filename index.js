export function iota(count, start = 0) {
  const result = [];
  for (let x = 0; x < count; x++) {
    result.push(start + x);
  }
  return result;
}

export function over(f, ...args) {
  return function (list) {
    return list.map((v) => f(v, ...args));
  };
}

/**
 * @param {((...args: any[]) => any)[]} funs
 */
export function juxt(...funs) {
  return function (/** @type {any[]} */ ...args) {
    return funs.map((fun) => fun(...args));
  };
}

export function compose(...funs) {
  funs = funs.slice();
  return function (...args) {
    let result = funs.pop()(...args);
    while (funs.length > 0) {
      result = funs.pop()(result);
    }
    return result;
  };
}

export function on(fun, key_fun) {
  return function (data) {
    return fun(key_fun(data));
  };
}

export function applying(f, ...pos_args) {
  return function (list) {
    return f(...pos_args, ...list);
  };
}

export function filter(f, ...args) {
  return function (list) {
    return list.filter((v) => f(v, ...args));
  };
}

export function zip_with(f) {
  return function (lists) {
    const result = [];
    outer: for (let idx = 0; ; idx++) {
      const args = [];
      for (let list of lists) {
        if (idx < list.length) {
          args.push(list[idx]);
        } else {
          break outer;
        }
      }
      result.push(f(...args));
    }
    return result;
  };
}

export function element(key) {
  return function (it) {
    return it[key];
  };
}

export function eq(v, eq) {
  if (eq !== undefined) {
    return function (w) {
      return eq(v, w);
    };
  } else {
    return function (w) {
      return v === w;
    };
  }
}

/**
 * @template T, U
 * @param { (args: T[]) => boolean} cond
 * @param {(args: T[]) => U} fn
 */
export function applicable_when(cond, fn) {
  return function (/** @type {T} */ data) {
    if (cond(data)) {
      return fn(data);
    } else {
      return data;
    }
  };
}

/**
 * @param {{ test: (arg0: any) => any; }} regex
 */
export function matches_regex(regex) {
  return function (string) {
    return regex.test(string);
  };
}

//TODO: handle maps, at least

/**
 * @param {string | number | symbol} key
 */
export function key(key) {
  return function (it) {
    return it[key];
  };
}

/**
 * @param {(...args: any[]) => boolean} fun
 */
export function complement(fun) {
  return function (...args) {
    return !fun(...args);
  };
}

/**
 * @param {(a: any) => boolean} pred
 */
export function include(pred) {
  return function (seq) {
    return seq.filter(pred);
  };
}

/**
 * @param {(a: any, b: any) => boolean} pred
 */
export function exclude(pred) {
  const negated = complement(pred);
  return function (seq) {
    return seq.filter(negated);
  };
}

/**
 * @param {{ [x: string]: any }} keyed
 */
export function pick(keyed) {
  return function (keys) {
    return keys.map((key) => keyed[key]);
  };
}

/**
 * @param {(arg0: any, arg1: any) => any} comparator
 * @param {(arg0: any) => any} key
 */
export function sorted(comparator, key) {
  if (key) {
    return function (seq) {
      const result = seq.slice();
      result.sort((a, b) => {
        return comparator(key(a), key(b)) ? -1 : 1;
      });
      return result;
    };
  } else {
    return function (seq) {
      const result = seq.slice();
      result.sort((a, b) => {
        return comparator(a, b) ? -1 : 1;
      });
      return result;
    };
  }
}

function matching_list_reducer(test, acc, next) {
  let result;
  if (acc && acc[0] && test(acc[0][0], next[0])) {
    result = [
      [acc[0][0], ...[...acc[0].slice(1), ...next.slice(1)]],
      ...acc.slice(1),
    ];
  } else {
    result = [next, ...(acc || [])];
  }
  return result;
}

export function combine_matching_lists({ test = (a, b) => a === b } = {}) {
  return function (acc, next) {
    return matching_list_reducer(test, acc, next);
  };
}

export function cons_new({ test = (a, b) => a === b, key = (v) => v } = {}) {
  return function (acc, next) {
    if (acc && test(key(acc[0]), key(next))) {
      return acc;
    } else {
      return [next, ...acc];
    }
  };
}

/**
 * @param {{ collector?: ({ test, key }?: { test?: (a: any, b: any) => boolean; key?: (v: any) => any; }) => (acc: any, next: any) => any; test: any; key: any; }} [it]
 */
export function compress_runs({ collector = cons_new, test, key } = {}) {
  return function (/** @type {any[]} */ it) {
    return it.reduce(collector({ test, key }), []).reverse();
  };
}

/**
 * @param {number} n
 */
export function slice(n) {
  return function (/** @type {string | any[]} */ seq) {
    return seq.slice(n);
  };
}

/**
 * @param {(arg0: any[]) => any} transform
 */
export function transform_tail(transform) {
  return function ([head, ...tail]) {
    const newTail = transform(tail);
    return [
      head,
      ...(Object.hasOwnProperty.call(newTail, "length") ? newTail : [newTail]),
    ];
  };
}
