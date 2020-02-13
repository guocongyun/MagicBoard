import React, { FC } from 'react';
import { Path } from 'models/Path';
import Polyline from './Polyline';

interface DrawingProps {
  paths: Path[];
  color: string;
  width: number;
}
const Drawing: FC<DrawingProps> = ({ paths, width, color }) => (
  <>
    {paths.map((path, i) => (
      <Polyline key={i} path={path} width={width} color={color}/>
    ))}
  </>
);

export default Drawing;
