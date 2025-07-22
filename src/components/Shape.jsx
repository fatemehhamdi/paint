import React from 'react';
import './Shape.css';

const Shape = ({ shape, onRemove }) => {
  const handleDoubleClick = () => {
    onRemove();
  };

  const shapeStyle = {
    position: 'absolute',
    left: shape.x,
    top: shape.y,
    width: shape.size,
    height: shape.size,
  };

  const renderShape = () => {
    switch (shape.type) {
      case 'circle':
        return (
          <div
            className="shape circle"
            style={{ ...shapeStyle, borderRadius: '50%' }}
            onDoubleClick={handleDoubleClick}
          />
        );
      case 'rectangle':
        return (
          <div
            className="shape rectangle"
            style={shapeStyle}
            onDoubleClick={handleDoubleClick}
          />
        );
      case 'triangle':
        return (
          <div
            className="shape triangle"
            style={{
              ...shapeStyle,
              width: 0,
              height: 0,
              borderLeft: `${shape.size/2}px solid transparent`,
              borderRight: `${shape.size/2}px solid transparent`,
              borderBottom: `${shape.size}px solid #333`,
            }}
            onDoubleClick={handleDoubleClick}
          />
        );
      default:
        return null;
    }
  };

  return renderShape();
};

export default Shape;
