import React from 'react';
import './StatusBar.css';

const StatusBar = ({ getShapeCount }) => {
  return (
    <div className="status-bar">
      <div className="shape-counter">
        <div className="counter-item">
          <div className="counter-icon circle"></div>
          <span>{getShapeCount('circle')}</span>
        </div>
        <div className="counter-item">
          <div className="counter-icon rectangle"></div>
          <span>{getShapeCount('rectangle')}</span>
        </div>
        <div className="counter-item">
          <div className="counter-icon triangle"></div>
          <span>{getShapeCount('triangle')}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
