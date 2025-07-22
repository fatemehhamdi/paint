import React, { useState } from 'react';
import './Canvas.css';
import Shape from './Shape.jsx';

const Canvas = ({ shapes, onAddShape, onRemoveShape, selectedTool }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = (e) => {
    if (!selectedTool) return;
    
    // Get the actual click position regardless of what was clicked
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setHasDragged(false);
    setStartPos({ x, y });
    
    const newShape = {
      id: `temp-${Date.now()}`,
      type: selectedTool,
      x: x,
      y: y,
      size: 10,
      isTemporary: true
    };
    
    setCurrentShape(newShape);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentShape) return;
    
    setHasDragged(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const deltaX = Math.abs(currentX - startPos.x);
    const deltaY = Math.abs(currentY - startPos.y);
    const size = Math.max(deltaX, deltaY, 10);
    
    const x = Math.min(startPos.x, currentX);
    const y = Math.min(startPos.y, currentY);
    
    setCurrentShape({
      ...currentShape,
      x,
      y,
      size
    });
  };

  const handleMouseUp = (e) => {
    if (!isDrawing || !currentShape) return;
    
    setIsDrawing(false);
    
    if (hasDragged && currentShape.size > 15) {
      const finalShape = {
        id: Date.now(),
        type: currentShape.type,
        x: currentShape.x,
        y: currentShape.y,
        size: currentShape.size
      };
      
      onAddShape(finalShape.x + finalShape.size/2, finalShape.y + finalShape.size/2, finalShape.type, finalShape.size);
    }
    
    setCurrentShape(null);
    setHasDragged(false);
  };

  const handleMouseLeave = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setCurrentShape(null);
      setHasDragged(false);
    }
  };

  return (
    <div className="canvas-container">
      <div 
        className={`canvas ${isDrawing ? 'drawing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ 
          cursor: selectedTool ? 'crosshair' : 'default' 
        }}
      >
        {shapes.map((shape) => (
          <Shape
            key={shape.id}
            shape={shape}
            onRemove={() => onRemoveShape(shape.id)}
          />
        ))}
        
        {currentShape && hasDragged && (
          <Shape
            key="temp-shape"
            shape={currentShape}
            onRemove={() => {}}
            isTemporary={true}
          />
        )}
      </div>
    </div>
  );
};

export default Canvas;
