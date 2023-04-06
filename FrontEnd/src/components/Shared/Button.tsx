/* eslint-disable react/display-name */
import { forwardRef } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className: string;
  text: string;
  onClick?: () => void;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = 'button', text, onClick }, ref) => {
    return (
      <button type={type} className={`${className}`} onClick={onClick} ref={ref}>
        {text}
      </button>
    );
  },
);
