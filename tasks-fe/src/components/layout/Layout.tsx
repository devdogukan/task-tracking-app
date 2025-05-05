import React from 'react';
import Header from './Header';

export interface LayoutProps {
  children: React.ReactNode;
  title?: string; // Add the title property
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-4 transition-colors duration-200">
        <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          Task Manager © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Layout;