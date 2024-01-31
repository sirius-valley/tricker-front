import React from 'react';
import {TypographyTypes} from "./typography.types";

const Subtitle: React.FC<TypographyTypes> = ({className, children}) => {
  return (
      <h4 className={`font-inter font-medium text-base ${className}`}>
        {children}
      </h4>
  );
};

export default Subtitle;