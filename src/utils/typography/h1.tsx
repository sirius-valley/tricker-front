import React from 'react';
import {TypographyTypes} from "./typography.types";

const H1: React.FC<TypographyTypes> = ({className, children}) => {
  return (
      <h1 className={`font-inter font-bold text-26px ${className}`}>
        {children}
      </h1>
  );
};

export default H1;