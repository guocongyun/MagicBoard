import React, { FC } from 'react';
import styled from 'styled-components';
import { ILine } from 'models/Line';
import Line from './Line';

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

interface DrawingProps {
  lines: ILine[];
}

const Drawing: FC<DrawingProps> = ({ lines }) => (
  <StyledSvg>
    {lines.map((line, i) => (
      <Line key={i} line={line} />
    ))}
  </StyledSvg>
);

export default Drawing;
