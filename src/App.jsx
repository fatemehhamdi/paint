import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Canvas from './components/Canvas.jsx';
import StatusBar from './components/StatusBar.jsx';

function App() {
  const [paintingTitle, setPaintingTitle] = useState('Painting Title');
  const [shapes, setShapes] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  const addShape = (x, y, toolType = null, customSize = null) => {
    const shapeType = toolType || selectedTool;
    if (!shapeType) return;

    const size = customSize || 50;
    const newShape = {
      id: Date.now() + Math.random(), // Ensure unique ID
      type: shapeType,
      x: customSize ? x - size/2 : x - 25, // Center the shape
      y: customSize ? y - size/2 : y - 25,
      size: size
    };

    setShapes(prevShapes => [...prevShapes, newShape]);
  };

  const removeShape = (id) => {
    setShapes(prevShapes => prevShapes.filter(shape => shape.id !== id));
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
