import React, { ReactNode } from 'react';
import './SkipLink.scss';

export interface SkipLinkProps {
  id: string;
  children?: ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ id, children }) => {
  return (
    <a href={`#${id}`} className="skip-link">
      {children}
    </a>
  );
};
