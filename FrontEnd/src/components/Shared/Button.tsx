import React from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className: string;
  text: string;
  onClick?: () => void;
};

export const Button = ({ className, type = 'button', text, onClick }: ButtonProps) => {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      {text}
    </button>
  );
};
