import React from 'react';
import { FileText } from 'lucide-react';

// cn utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const TemplateSelector = ({ templates, selectedTemplate, onSelectTemplate, onViewSavedDocuments }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Select Template</h2>
            <p className="text-sm text-gray-500">Choose a template to get started</p>
          </div>
          
          {onViewSavedDocuments && (
            <button
              onClick={onViewSavedDocuments}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FileText className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Saved Documents
            </button>
          )}
        </div>
        
        <div className="flex space-x-1 overflow-x-auto hide-scrollbar py-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap",
                selectedTemplate === template.id 
                  ? "bg-blue-100 text-blue-700 border-b-2 border-blue-600" 
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              )}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;