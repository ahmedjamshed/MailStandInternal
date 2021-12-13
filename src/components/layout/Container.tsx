import React from "react";

const Container: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto px-4 min-w-full">
      {children}
    </div>
  );
};

export default Container;
