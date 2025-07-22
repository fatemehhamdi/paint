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

  // For pencil shapes, we render differently
  if (shape.type === 'pencil') {
    const pathData = shape.path || '';
    const strokeColor = isTemporary ? 'rgba(220, 53, 69, 0.8)' : '#6f42c1';

    return (
      <svg
        className={`shape pencil ${isTemporary ? 'temporary' : ''}`}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // SVG container doesn't capture events
          opacity: isTemporary ? 0.8 : 1,
          zIndex: isTemporary ? 1000 : 1
        }}
        title={isTemporary ? '' : 'Double-click to delete'}
      >
        <path
          d={pathData}
          stroke={strokeColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            pointerEvents: isTemporary ? 'none' : 'stroke', // Only the drawn line captures events
            cursor: isTemporary ? 'crosshair' : 'pointer'
          }}
          onDoubleClick={handleDoubleClick} // Event handler moved to path element
        />
      </svg>
    );
  }

  // For geometric shapes
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

export default Shape;
