import React, { FC } from 'react';
import styled from 'styled-components';
import { Path } from 'models/Path';
import SvgPath from './SvgPath';

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

interface DrawingProps {
  paths: Path[];
}

const Drawing: FC<DrawingProps> = ({ paths }) => (
  <StyledSvg>
    {paths.map((path, i) => (
      <SvgPath key={i} path={path} width={3} />
    ))}
  </StyledSvg>
);

export default Drawing;
