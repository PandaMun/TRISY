import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

interface TextProps {
  children?: React.ReactNode;
  delay: number;
}

export const FadeInUp = ({ children, delay }: TextProps) => {
  const target = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      target.current,
      { opacity: 0, y: 0 },
      {
        top: '-15%',
        opacity: 1,
        y: '-10px',
        delay,
        duration: 1.5,
        ease: 'power3.out',
      },
    );
  }, [delay]);
  return <div ref={target}>{children}</div>;
};
