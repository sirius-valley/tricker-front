import React from 'react';
import {TypographyTypes} from "./typography.types";

const Body2: React.FC<TypographyTypes> = ({className, children}) => {
  return (
      <p className={`font-inter font-bold text-base ${className}`}>
        {children}
      </p>
  );
};

export default Body2;