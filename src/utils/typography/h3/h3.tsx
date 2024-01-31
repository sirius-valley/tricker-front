import React from 'react';
import {TypographyTypes} from "../typography.types";

const H3: React.FC<TypographyTypes> = ({className, children}) => {
  return (
      <h3 className={`font-inter font-normal text-lg leading-[19.8px] ${className}`}>
        {children}
      </h3>
  );
};

export default H3;