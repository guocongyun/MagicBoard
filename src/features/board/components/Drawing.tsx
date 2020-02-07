import React, { FC } from 'react';
import { Path } from 'models/Path';
import Polyline from './Polyline';

interface DrawingProps {
  paths: Path[];
}

const Drawing: FC<DrawingProps> = ({ paths }) => (
  <>
    {paths.map((path, i) => (
      <Polyline key={i} path={path} width={3} />
    ))}
  </>
);

export default Drawing;
