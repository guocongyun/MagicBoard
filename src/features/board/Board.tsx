import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Path } from 'models/Path';
import { Drawing } from './components';

const StyledSvg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Board: FC = () => {
  const [paths, setPaths] = useImmer<Path[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = useCallback<MouseEventHandler>(
    ({ button, clientX: x, clientY: y }) => {
      if (button !== 0) return;

      setIsDrawing(true);
      setPaths(paths => {
        paths.push([{ x, y }]);
      });
    },
    [setPaths],
  );

  const handleMouseMove = useCallback<MouseEventHandler>(
    ({ clientX: x, clientY: y }) => {
      if (!isDrawing) return;

      setPaths(paths => {
        paths[paths.length - 1].push({ x, y });
      });
    },
    [isDrawing, setPaths],
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleClear = useCallback(() => {
    setPaths(() => []);
  }, [setPaths]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  return (
    <>
      <StyledSvg onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
        <Drawing paths={paths} />
      </StyledSvg>
      <button
        style={{ position: 'absolute', left: '50%', top: '20px' }}
        onClick={handleClear}
      >
        Clear
      </button>
    </>
  );
};

export default Board;
