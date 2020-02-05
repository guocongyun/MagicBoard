import React, { FC } from 'react';
import styled from 'styled-components';
import { Path } from 'models/Path';

interface SvgPathProps {
  path: Path;
}

const StyledPath = styled.path`
  fill: none;
  stroke-width: 3px;
  stroke: black;
  stroke-linejoin: round;
  stroke-linecap: round;
`;

const SvgPath: FC<SvgPathProps> = ({ path }) => {
  const points = path.map(({ x, y }) => `${x} ${y}`);
  const data = `M ${points[0]} L ${points.join(' ')}`;

  return <StyledPath d={data} />;
};

export default SvgPath;
