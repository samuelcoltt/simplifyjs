function simplify(points, epsilon = 0) {
  if (points.length < 3) {
    return points;
  }
  const firstPoint = points[0];
  const lastPoint = points[points.length-1];
  let index = -1;
  let dist = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const cDist = findPerpendicularDistance(points[i], firstPoint, lastPoint);
    if (cDist > dist) {
      dist = cDist;
      index = i;
    }
  }
  if (dist > epsilon) {
    let l1 = points.slice(0, index + 1);
    let l2 = points.slice(index);
    let r1 = simplify(l1, epsilon);
    let r2 = simplify(l2, epsilon);
    const rs = r1.slice(0, r1.length-1).concat(r2);
    return rs;
  } else {
    return [firstPoint, lastPoint];
  }
}

function findPerpendicularDistance(p, p1, p2) {
  let result;
  if (p1[0] == p2[0]) {
    result = Math.abs(p[0] - p1[0]);
  } else {
    const slope = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    const intercept = p1[1] - (slope * p1[0]);
    result = Math.abs(slope * p[0] - p[1] + intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
  }
  return result;
}
