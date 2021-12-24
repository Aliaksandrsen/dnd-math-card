import { useDrag } from 'react-dnd';

export const Card = ({ type, text }) => {
  const [{ opacity }, drag] = useDrag(() => ({
    type,
    item: { text },
    collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
  }));

  return (
    <div ref={drag} className="card" style={{ opacity }}>
      {text}
    </div>
  );
};
