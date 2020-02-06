import React, { FC } from 'react';
import { Path } from 'models/Path';

interface SvgPathProps {
  path: Path;
  width: number;
}

const SvgPath: FC<SvgPathProps> = ({ path, width }) => {
  const points = path.map(({ x, y }) => `${x} ${y}`);
  const data = `M ${points[0]} L ${points.join(' ')}`;

  return (
    <path
      fill="none"
      stroke="black"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      d={data}
    />
  );
};

export default SvgPath;
