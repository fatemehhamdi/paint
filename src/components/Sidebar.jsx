import React from 'react';
import './Sidebar.css';

const Sidebar = ({ selectedTool, onToolSelect }) => {
  const tools = [
    { type: 'circle', name: 'Circle' },
    { type: 'rectangle', name: 'Rectangle' },
    { type: 'triangle', name: 'Triangle' }
  ];

  return (
    <div className="sidebar">
      <h3>Tools</h3>
      <div className="tools">
        {tools.map((tool) => (
          <div
            key={tool.type}
            className={`tool ${selectedTool === tool.type ? 'selected' : ''}`}
            onClick={() => onToolSelect(tool.type)}
          >
            <div className={`tool-icon ${tool.type}`}></div>
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
