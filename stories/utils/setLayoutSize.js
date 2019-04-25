import React from 'react';

export default function setLayoutSize(width, height, s) {
  return <div style={{ width, height }}>{s()}</div>;
}
