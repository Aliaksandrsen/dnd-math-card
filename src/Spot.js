import { useDrop } from 'react-dnd';

export const Spot = ({ type, text, spot, handleDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: type,
    drop: (item) => {
      // here we do update
      handleDrop(spot, item);
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
