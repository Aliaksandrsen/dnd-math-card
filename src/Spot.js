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
  if (canDrop) backgroundColor = '#E9967Add';
  if (isOver) backgroundColor = '#FFA07A77';

  return (
    <div className="spot" ref={drop} style={{ backgroundColor }}>
      {text}
    </div>
  );
};
