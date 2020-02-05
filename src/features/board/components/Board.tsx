import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { ILine } from 'models/Line';
import Drawing from './Drawing';

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Board: FC = () => {
  const [lines, setLines] = useImmer<ILine[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = useCallback<MouseEventHandler>(
    ({ button, clientX: x, clientY: y }) => {
      if (button !== 0) return;

      setIsDrawing(true);
      setLines(draft => {
        draft.push([{ x, y }]);
      });
    },
    [setLines],
  );

  const handleMouseMove = useCallback<MouseEventHandler>(
    ({ clientX: x, clientY: y }) => {
      if (!isDrawing) return;

      setLines(draft => {
        draft[draft.length - 1].push({ x, y });
      });
    },
    [isDrawing, setLines],
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleClear = useCallback(() => {
    setLines(() => []);
  }, [setLines]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  return (
    <>
      <StyledDiv onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
        <Drawing lines={lines} />
      </StyledDiv>
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
