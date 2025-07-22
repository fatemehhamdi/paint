import React, { useState } from 'react';
import './Canvas.css';
import Shape from './Shape.jsx';

const Canvas = ({ shapes, onAddShape, onRemoveShape, selectedTool }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [pencilPath, setPencilPath] = useState('');

  const handleMouseDown = (e) => {
    if (!selectedTool) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setHasDragged(false);
    setStartPos({ x, y });
    
    if (selectedTool === 'pencil') {
      const pathStart = `M ${x} ${y}`;
      setPencilPath(pathStart);
      
      const newShape = {
        id: `temp-${Date.now()}`,
        type: 'pencil',
        x: 0,
        y: 0,
        path: pathStart,
        isTemporary: true
      };
      
      setCurrentShape(newShape);
    } else {
      const newShape = {
        id: `temp-${Date.now()}`,
        type: selectedTool,
        x: x,
        y: y,
        size: 10,
        isTemporary: true
      };
      
      setCurrentShape(newShape);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentShape) return;
    
    setHasDragged(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    if (selectedTool === 'pencil') {
      const newPath = `${pencilPath} L ${currentX} ${currentY}`;
      setPencilPath(newPath);
      
      setCurrentShape({
        ...currentShape,
        path: newPath
      });
    } else {
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
    }
  };

  const handleMouseUp = (e) => {
    if (!isDrawing || !currentShape) return;
    
    setIsDrawing(false);
    
    if (hasDragged) {
      if (selectedTool === 'pencil') {
        // Create pencil shape with path
        onAddShape(0, 0, 'pencil', 0, pencilPath);
      } else if (currentShape.size > 15) {
        // Create geometric shape
        onAddShape(
          currentShape.x + currentShape.size/2, 
          currentShape.y + currentShape.size/2, 
          currentShape.type, 
          currentShape.size
        );
      }
    }
    
    setCurrentShape(null);
    setHasDragged(false);
    setPencilPath('');
  };

  const handleMouseLeave = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setCurrentShape(null);
      setHasDragged(false);
      setPencilPath('');
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
