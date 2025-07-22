import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import StatusBar from './components/StatusBar';

function App() {
  const [paintingTitle, setPaintingTitle] = useState('Painting Title');
  const [shapes, setShapes] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  const addShape = (x, y) => {
    if (!selectedTool) return;

    const newShape = {
      id: Date.now(),
      type: selectedTool,
      x: x - 25, // Center the shape
      y: y - 25,
      size: 50
    };

    setShapes([...shapes, newShape]);
  };

  const removeShape = (id) => {
    setShapes(shapes.filter(shape => shape.id !== id));
  };

  const exportPainting = () => {
    const data = {
      title: paintingTitle,
      shapes: shapes
    };
    const jsonString = JSON.stringify(data, null, 2);
    
    // Create downloadable file
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paintingTitle}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importPainting = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setPaintingTitle(data.title || 'Imported Painting');
          setShapes(data.shapes || []);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const getShapeCount = (shapeType) => {
    return shapes.filter(shape => shape.type === shapeType).length;
  };

  return (
    <div className="app">
      <Header
        title={paintingTitle}
        onTitleChange={setPaintingTitle}
        onExport={exportPainting}
        onImport={importPainting}
      />
      <div className="main-content">
        <Canvas
          shapes={shapes}
          onAddShape={addShape}
          onRemoveShape={removeShape}
          selectedTool={selectedTool}
        />
        <Sidebar
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
        />
      </div>
      <StatusBar getShapeCount={getShapeCount} />
    </div>
  );
}

export default App;
