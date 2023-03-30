/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className: string;
  text: string;
  onClick?: () => void;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = 'button', text, onClick }) => {
    return (
      <button type={type} className={`${className}`} onClick={onClick}>
        {text}
      </button>
    );
  },
);
