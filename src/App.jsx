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

  const addShape = (x, y, toolType = null, customSize = null, path = null) => {
    const shapeType = toolType || selectedTool;
    if (!shapeType) return;

    let newShape;

    if (shapeType === 'pencil') {
      // For pencil shapes, we don't need x, y positioning or size
      newShape = {
        id: Date.now() + Math.random(),
        type: 'pencil',
        x: 0,
        y: 0,
        size: 0,
        path: path || ''
      };
    } else {
      // For geometric shapes
      const size = customSize || 50;
      newShape = {
        id: Date.now() + Math.random(),
        type: shapeType,
        x: customSize ? x - size/2 : x - 25,
        y: customSize ? y - size/2 : y - 25,
        size: size
      };
    }

    setShapes(prevShapes => [...prevShapes, newShape]);
  };

  const removeShape = (id) => {
    setShapes(prevShapes => prevShapes.filter(shape => shape.id !== id));
  };

  const exportPainting = () => {
    const data = {
      title: paintingTitle,
      shapes: shapes,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    const jsonString = JSON.stringify(data, null, 2);
    
    // Create downloadable file
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paintingTitle.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importPainting = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // COMPLETELY REPLACE the board state - don't merge!
        setPaintingTitle(data.title || 'Imported Painting');
        setShapes(data.shapes || []); // Replace all shapes completely
        
        // Reset the file input so the same file can be imported again
        event.target.value = '';
        
        console.log('Board completely replaced with imported data');
      } catch (error) {
        console.error('Error importing file:', error);
        alert('Invalid JSON file. Please select a valid JSON file.');
        // Reset the file input
        event.target.value = '';
      }
    };
    reader.readAsText(file);
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
