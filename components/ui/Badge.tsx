import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';

  const variantStyles = {
    default: 'bg-[#F6F1E9]/10 text-[#F6F1E9] border border-[#F6F1E9]/20',
    secondary: 'bg-[#F6F1E9]/5 text-[#F6F1E9]/70 border border-[#F6F1E9]/10',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
