import React from 'react';
import './Sidebar.css';

const Sidebar = ({ selectedTool, onToolSelect }) => {
  const tools = [
    { type: 'circle', label: '●', name: 'Circle' },
    { type: 'rectangle', label: '■', name: 'Rectangle' },
    { type: 'triangle', label: '▲', name: 'Triangle' },
    { type: 'pencil', label: '✏️', name: 'Pencil' }
  ];

  return (
    <div className="sidebar">
      <h3>Tools</h3>
      <div className="tools">
        {tools.map(tool => (
          <button
            key={tool.type}
            className={`tool-btn ${selectedTool === tool.type ? 'selected' : ''}`}
            onClick={() => onToolSelect(tool.type)}
            title={tool.name}
          >
            {tool.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
