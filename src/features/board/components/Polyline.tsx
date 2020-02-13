import React, { FC } from 'react';
import { Path } from 'models/Path';

interface PolylineProps {
  path: Path;
  width: number;
  color: string;
}

const Polyline: FC<PolylineProps> = ({ path }) => {
  // If we want to render just a dot (single point),
  // we need to duplicate the point contained in the path
  // for the dot to show up
  console.log(path);
  if (path.length == 1) {
    path = path.concat([path[0]]);
  }

  const points = path.map(({
    x, y,
  }) => `${x} ${y}`).join(', ');

  return (
    <polyline
      points={points}
      fill="none"
      stroke={path[0].color}
      strokeWidth={path[0].width}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

export default Polyline;
