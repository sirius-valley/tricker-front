
import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Body2 from '@utils/typography/body2/body2';
import HelperText from '@utils/typography/helpertext/helpertext';
import Body1 from '@utils/typography/body1/body1';
import Icon from '@components/Icon/Icon';
import type * as icons from '@components/Icon/index.ts';

const selectInputVariants = cva(
  [
    'outline-none placeholder-gray-300 bg-transparent border rounded-lg py-3 px-4 w-[306px] h-[43px] text-gray-300',
  ],
  {
    variants: {
      variant: {
        default: [
          'text-white cursor-pointer',
          'hover:border-2 border-gray-300',
          'focus:border-primary-400',
        ],
        error: ['border-error-500', 'focus:border-primary-400'],
        disabled: ['disabled:bg-gray-300/20', 'cursor-not-allowed'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);


export interface SelectInputProps
  extends VariantProps<typeof selectInputVariants>,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: keyof typeof icons;
  label?: string;
  required?: boolean;
  helperText?: string;
  options: { value: string; label: string }[];
}

const SelectInput = ({
  className,
  icon,
  variant,
  label = '',
  required = false,
  helperText = '',
  options,
}: SelectInputProps): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const textColor: string =
  variant === 'error'
    ? 'text-error-500'
    : variant === 'disabled'
    ? 'text-gray-300'
    : 'text-white';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setValue(e.target.value);

  };

  return (
    <div className="gap-2 flex flex-col">
      {label !== '' && (
        <Body2 className={`${variant === 'disabled' ? 'text-gray-300' : 'text-white'} flex text-sm`}>
          {label}
          {required && (
            <>
              &nbsp;
              <Body2 className={`flex text-sm ${variant === 'disabled' ? 'text-gray-300' : 'text-error-500'}`}>
                *
              </Body2>
            </>
          )}
        </Body2>
      )}
        <div className="relative" style={{width: '274px'}}>
        <select
          className={`${selectInputVariants({ variant, className })}`}
          value={value}
          onChange={handleChange}
          disabled={variant === 'disabled'}
          // style={{ width: '246px', height: '19px' }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              <Body1>{option.label}</Body1>
            </option>
          ))}
        </select>
        {icon && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center">
            {<Icon name={icon} width='18' height='18' />}
          </div>
        )}
      </div>

      <HelperText className={textColor}>{helperText}</HelperText>
    </div>
  );
};

export default SelectInput;
