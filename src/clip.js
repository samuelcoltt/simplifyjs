function clipLines(points, bounds) {
  for (let k = 1; k < bounds.length; k++) {
    const i = k - 1;

    const ix = bounds[i][1], iy = bounds[i][0];
    const kx = bounds[k][1], ky = bounds[k][0];
    let newPoints = [];
    for (let z = 1; z < points.length; z++) {
      const j = z - 1;

      const jx = points[j][1], jy = points[j][0];
      const zx = points[z][1], zy = points[z][0];

      const j_pos = (kx - ix) * (jy - iy) - (ky - iy) * (jx - ix);
      const zPos = (kx - ix) * (zy - iy) - (ky - iy) * (zx - ix);
      if (j_pos >= 0 && zPos < 0) {
        newPoints.push([intersectY(ix, iy, kx, ky, jx, jy, zx, zy), intersectX(ix, iy, kx, ky, jx, jy, zx, zy)]);
      } else if (j_pos < 0 && zPos >= 0) {
        newPoints.push([intersectY(ix, iy, kx, ky, jx, jy, zx, zy), intersectX(ix, iy, kx, ky, jx, jy, zx, zy)]);
        newPoints.push(points[z]);
      } else if(j_pos >= 0 && zPos >= 0) {
        newPoints.push(points[z]);
      }
    }
    newPoints.push(newPoints[0]);
    points = newPoints;
  }
  return points;
}

function intersectX(x1, y1, x2, y2, x3, y3, x4, y4) {
  const a = (x1 * y2 - y1 * x2) * (x3 - x4) - 
            (x1 - x2) * (x3 * y4 - y3 * x4);
  const b = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  return a/b;
}

function intersectY(x1, y1, x2, y2, x3, y3, x4, y4) {
  const a = (x1 * y2 - y1 * x2) * (y3 - y4) - 
            (y1 - y2) * (x3 * y4 - y3 * x4); 
  const b = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4); 
  return a/b;
}
