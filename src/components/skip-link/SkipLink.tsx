import React, { ReactNode } from 'react';
import './SkipLink.scss';

export interface SkipLinkProps {
  skipToId: string;
  children?: ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ skipToId, children }) => {
  return (
    <a href={`#${skipToId}`} className="skip-link">
      {children}
    </a>
  );
};
