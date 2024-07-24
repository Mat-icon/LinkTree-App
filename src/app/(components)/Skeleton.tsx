
import React from 'react';

const Skeleton: React.FC<{ width: string; height: string; borderRadius : string; }> = ({ width, height, borderRadius }) => {
  return (
    <div
      className="bg-gray-300 animate-pulse"
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Skeleton;
