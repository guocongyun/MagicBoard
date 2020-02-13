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
import { Point } from 'models/Point';
import io from 'socket.io-client';
import { Drawing } from './components';


const StyledSvg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;

// Start a socket connection to the server
// Some day we would run this server somewhere else
const socket = io.connect('http://localhost:4000');
// We make a named event called 'mouse' and write an
// anonymous callback function

interface Setting {
  color: string;
  width: number;
}

export const setting: Setting = { color: '#000000', width: 10 };

const Board: FC = () => {
  const [paths, setPaths] = useImmer<Path[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    socket.on('mouse', (data: Point) => {
      console.log(data);
      setPaths(paths => {
        paths.push([{
          x: data.x, y: data.y, color: setting.color, width: setting.width, 
        }]);
      });
    });
    // return () => ;
  }, [setPaths, setting]);

  const handleMouseDown = useCallback<MouseEventHandler>(
    ({ button, clientX: x, clientY: y }) => {
      if (button !== 0) return;

      setIsDrawing(true);
      setPaths(paths => {
        paths.push([{
          x, y, color: setting.color, width: setting.width, 
        }]);
      });
    },
    [setPaths, setting],
  );

  const handleMouseMove = useCallback<MouseEventHandler>(
    ({ clientX: x, clientY: y }) => {
      if (!isDrawing) return;
      const data = {
        x,
        y,
        color: setting.color,
        width: setting.width,
      };
      // Send that object to the socket
      socket.emit('mouse', data);
      console.log(`sendmouse: ${x} ${y}`);
      setPaths(paths => {
        paths[paths.length - 1].push(data);
      });
    },
    [isDrawing, setPaths, setting],
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

  function Plus () {
    setting.width += 1;
  }

  function Minus () {
    setting.width -= 1;
  }

  function Erasor () {
    setting.color = '#ffffff';
    console.log(setting.color);
  }

  function Pen () {
    setting.color = '#000000';
    console.log(setting.color);
  }

  const img1 = require('./Icons/eraser-solid.png');
  const img2 = require('./Icons/plus-solid.png');
  const img3 = require('./Icons/times-solid.png');
  const img4 = require('./Icons/pen-alt-solid.png');
  const img5 = require('./Icons/asset-1.png');

  const Clear = styled.button`
  background-image: url(${img5});
  width: 61px;
  height: 53px;
`;

  const Eraser = styled.button`
  background-image: url(${img1});
  width: 61px;
  height: 53px;
`;

  const Plus_Size = styled.button`
  background-image: url(${img2});
  width: 61px;
  height: 53px;
`;

  const Minus_Size = styled.button`
  background-image: url(${img3});
  width: 61px;
  height: 53px;
`;

  const Black_Pen = styled.button`
  background-image: url(${img4});
  width: 61px;
  height: 53px;
`;

  return (
    <div>
      <StyledSvg onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
        <Drawing paths={paths} color={setting.color} width={setting.width}/>
      </StyledSvg>
      <Clear
        style={{ position: 'absolute', left: '50%', top: '20px' }}
        onClick={handleClear}
      >
      </Clear>
      <Plus_Size
        style={{ position: 'absolute', left: '60%', top: '20px' }}
        onClick={Plus}
      >
      </Plus_Size>
      <Minus_Size
        style={{ position: 'absolute', left: '70%', top: '20px' }}
        onClick={Minus}
      >
      </Minus_Size>


      <Eraser
        style={{ position: 'absolute', left: '80%', top: '20px' }}
        onClick={Erasor}
      >
      </Eraser>


      <Black_Pen
        style={{ position: 'absolute', left: '90%', top: '20px' }}
        onClick={Pen}
      >
      </Black_Pen>
    </div>
  );
};

export default Board;
