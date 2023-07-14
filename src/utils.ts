export function zip<a, b>(xs: a[], ys: b[]): Array<[a, b]> {
  if (xs.length === 0 || ys.length === 0) {
    return [];
  }
  const [x, ...xx] = xs;
  const [y, ...yy] = ys;
  return [[x, y], ...zip(xx, yy)];
}

export function maxOfTuples<a>(tuples: [number, number][]) {
  return tuples.reduce(
    ([x, y], [xx, yy]) => (Math.max(y, yy) == yy ? [xx, yy] : [x, y]),
    [0, 100000]
  );
}

export function isSubset<a>(xs: a[], ys: a[]): boolean {
    if (xs.length === 0) {
      return true;
    }
  
    const [x, ...xx] = xs;
  
    return ys.includes(x) ? isSubset(xx, ys) : false;
  }
