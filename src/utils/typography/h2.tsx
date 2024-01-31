import React from 'react';
import {TypographyTypes} from "./typography.types";

const H2: React.FC<TypographyTypes> = ({className, children}) => {
  return (
      <h2 className={`font-inter font-bold text-2xl ${className}`}>
        {children}
      </h2>
  );
};

export default H2;