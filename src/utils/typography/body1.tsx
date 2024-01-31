import React from 'react';
import {TypographyTypes} from "./typography.types";

const Body1: React.FC<TypographyTypes> = ({className, children}) => {
  return (
      <p className={`font-inter font-normal text-base ${className}`}>
        {children}
      </p>
  );
};

export default Body1;