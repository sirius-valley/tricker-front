import React from 'react';
import {TypographyTypes} from "../typography.types";

const HelperText: React.FC<TypographyTypes> = ({className, children}) => {
  return (
      <p className={`font-inter font-normal text-xs leading-[14.52px] ${className}`}>
        {children}
      </p>
  );
};

export default HelperText;