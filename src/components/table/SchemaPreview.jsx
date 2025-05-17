import React from 'react';

const SchemaPreview = ({ headers }) => {
  if (!headers || headers.length === 0) return null;

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>📑 Available Columns:</h4>
      <ul>
        {headers.map((col, i) => (
          <li key={i} style={{ fontFamily: 'monospace' }}>
            • {col}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemaPreview;
