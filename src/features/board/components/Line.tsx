import React, { FC } from 'react';
import styled from 'styled-components';
import { ILine } from 'models/Line';

interface LineProps {
  line: ILine;
}

const StyledPath = styled.path`
  fill: none;
  stroke-width: 3px;
  stroke: black;
  stroke-linejoin: round;
  stroke-linecap: round;
`;

const Line: FC<LineProps> = ({ line }) => {
  const points = line.map(({ x, y }) => `${x} ${y}`);
  const data = `M ${points[0]} L ${points.join(' ')}`;

  return <StyledPath d={data} />;
};

export default Line;
