/* eslint-disable no-eval */
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';

const App = () => {
  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(3);
  const [operator, setOperator] = useState('*');

  const handleDrop = (spot, item) => {
    if (spot === 'number1') setNumber1(item.text);
    if (spot === 'number2') setNumber2(item.text);
    if (spot === 'operator') setOperator(item.text);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        {/* math card */}
        <div className="math-card">
          <Spot
            type="number"
            text={number1}
            spot="number1"
            handleDrop={handleDrop}
          />
          <Spot
            type="number"
            text={number2}
            spot="number2"
            handleDrop={handleDrop}
          />
          <Spot
            type="operator"
            text={operator}
            spot="operator"
            handleDrop={handleDrop}
          />
          <div className="total">{eval(`${number1}${operator}${number2}`)}</div>
        </div>

        <div>
          <div className="cards numbers">
            {Array(10)
              .fill(0)
              .map((n, i) => (
                <Number key={i} text={i} />
              ))}
          </div>

          <div className="cards operators">
            {['*', '-', '+', '/'].map((o, i) => (
              <Operator key={i} text={o} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

const Spot = ({ type, text, spot, handleDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: type,
    drop: (item) => {
      handleDrop(spot, item);
      // here we do update
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  let backgroundColor = '#f2f2f2';
  if (canDrop) backgroundColor = '#3db897';
  if (isOver) backgroundColor = '#4bdcb5';

  return (
    <div className="spot" ref={drop} style={{ backgroundColor }}>
      {text}
    </div>
  );
};

const Number = ({ text }) => {
  const [{ opacity }, drag] = useDrag(() => ({
    type: 'number',
    item: { text },
    collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
  }));

  return (
    <div ref={drag} className="card" style={{ opacity }}>
      {text}
    </div>
  );
};

const Operator = ({ text }) => {
  const [{ opacity }, drag] = useDrag(() => ({
    type: 'operator',
    item: { text },
    collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
  }));
  return (
    <div ref={drag} className="card" style={{ opacity }}>
      {text}
    </div>
  );
};

export default App;
