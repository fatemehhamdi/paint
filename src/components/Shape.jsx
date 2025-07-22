import React from 'react';
import './Shape.css';

const Shape = ({ shape, onRemove, isTemporary = false }) => {
  const handleDoubleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isTemporary) {
      onRemove();
    }
  };

  const renderShape = () => {
    const baseStyle = {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      cursor: isTemporary ? 'crosshair' : 'pointer',
      opacity: isTemporary ? 0.6 : 1,
      zIndex: isTemporary ? 1000 : 1
    };

    const commonProps = {
      onDoubleClick: handleDoubleClick,
      title: isTemporary ? '' : 'Double-click to delete'
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            className={`shape circle ${isTemporary ? 'temporary' : ''}`}
            style={{
              ...baseStyle,
              width: shape.size,
              height: shape.size,
              borderRadius: '50%',
              backgroundColor: '#007bff',
              border: isTemporary ? '2px dashed #007bff' : '2px solid #0056b3'
            }}
            {...commonProps}
          />
        );
      
      case 'rectangle':
        return (
          <div
            className={`shape rectangle ${isTemporary ? 'temporary' : ''}`}
            style={{
              ...baseStyle,
              width: shape.size,
              height: shape.size,
              backgroundColor: '#28a745',
              border: isTemporary ? '2px dashed #28a745' : '2px solid #1e7e34'
            }}
            {...commonProps}
          />
        );
      
      case 'triangle':
        return (
          <div
            className={`shape triangle ${isTemporary ? 'temporary' : ''}`}
            style={{
              position: 'absolute',
              left: shape.x,
              top: shape.y,
              width: 0,
              height: 0,
              borderLeft: `${shape.size/2}px solid transparent`,
              borderRight: `${shape.size/2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${isTemporary ? 'rgba(255, 193, 7, 0.6)' : '#ffc107'}`,
              cursor: isTemporary ? 'crosshair' : 'pointer',
              opacity: isTemporary ? 0.6 : 1,
              zIndex: isTemporary ? 1000 : 1
            }}
            {...commonProps}
          />
        );
      
      default:
        return null;
    }
  };

  return renderShape();
};

export default Shape;
