// components/ClientBodyWrapper.tsx
'use client';

import { useEffect } from 'react';

export default function ClientBodyWrapper({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className: string;
}) {
  useEffect(() => {
    document.body.className = className;
  }, [className]);

  return <>{children}</>;
}