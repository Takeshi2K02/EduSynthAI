import { useEffect } from 'react';

const AuthLayout = ({ children }) => {
  // Prevent scroll at <body> and <html> level
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-primary/20 dark:from-dark dark:to-dark overflow-hidden">
      {children}
    </div>
  );
};

export default AuthLayout;