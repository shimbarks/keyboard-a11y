import React, { useRef } from 'react';
import { useAutoOverflow } from '../../hooks/use-auto-overflow';
import './TruncableText.scss';

export interface TruncableTextProps {
  className?: string;
  children: string;
}

export const TruncableText: React.FC<TruncableTextProps> = ({
  className,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useAutoOverflow(ref);

  return (
    <div className={`truncable ${className ?? ''}`}>
      <div ref={ref} className="truncable__text">
        {children}
      </div>
      <div className="truncable__tooltip">{children}</div>
    </div>
  );
};
