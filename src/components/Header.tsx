import React from 'react';
import { FileText } from 'lucide-react';

const Header = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-800">
              DocuBuilder
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onViewChange('templates')}
              className={`transition-colors duration-200 ${
                currentView === 'templates' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Templates
            </button>
            <button 
              onClick={() => onViewChange('saved')}
              className={`transition-colors duration-200 ${
                currentView === 'saved' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Saved Documents
            </button>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Help
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;