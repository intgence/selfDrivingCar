function lerp(A, B, t) {
  return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
  const tTOP = (D.x - C.x) * (A.y - B.y) - (D.y - C.y) * (A.x - B.x);
  const uTOP = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const BOTTOM = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (BOTTOM != 0) {
    const T = tTOP / BOTTOM;
    const U = uTOP / BOTTOM;

    if (T >= 0 && T <= 1 && U >= 0 && U <= 1) {
      return {
        x: lerp(A.x, B.x, T),
        y: lerp(A.y, B.y, T),
        offset: T,
      };
    }
  }
  return null;
}
