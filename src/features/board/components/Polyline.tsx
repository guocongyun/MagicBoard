import React, { FC } from 'react';
import { Path } from 'models/Path';

interface PolylineProps {
  path: Path;
  width: number;
}

const Polyline: FC<PolylineProps> = ({ path, width }) => {
  // If we want to render just a dot (single point),
  // we need to duplicate the point contained in the path
  // for the dot to show up
  if (path.length === 1) {
    path = path.concat([path[0]]);
  }

  const points = path.map(({ x, y }) => `${x} ${y}`).join(', ');

  return (
    <polyline
      points={points}
      fill="none"
      stroke="black"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

export default Polyline;
