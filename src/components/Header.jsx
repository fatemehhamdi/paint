import React from 'react';
import './Header.css';

const Header = ({ title, onTitleChange, onExport, onImport }) => {
  return (
    <div className="header">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="title-input"
      />
      <div className="header-buttons">
        <button onClick={onExport} className="export-btn">
          Export
        </button>
        <label className="import-btn">
          Import
          <input
            type="file"
            accept=".json"
            onChange={onImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
};

export default Header;
