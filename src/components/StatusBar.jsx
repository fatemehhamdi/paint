import React from 'react';
import './StatusBar.css';

const StatusBar = ({ getShapeCount }) => {
  return (
    <div className="status-bar">
      <div className="shape-count">
        <span>●: {getShapeCount('circle')}</span>
        <span>■: {getShapeCount('rectangle')}</span>
        <span>▲: {getShapeCount('triangle')}</span>
        <span>✏️: {getShapeCount('pencil')}</span>
      </div>
    </div>
  );
};

export default StatusBar;
