import React from 'react';
import './Canvas.css';
import Shape from './Shape.jsx';

const Canvas = ({ shapes, onAddShape, onRemoveShape, selectedTool }) => {
  const handleCanvasClick = (e) => {
    if (!selectedTool) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onAddShape(x, y);
  };

  return (
    <div className="canvas-container">
      <div 
        className="canvas" 
        onClick={handleCanvasClick}
        style={{ cursor: selectedTool ? 'crosshair' : 'default' }}
      >
        {shapes.map((shape) => (
          <Shape
            key={shape.id}
            shape={shape}
            onRemove={() => onRemoveShape(shape.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
