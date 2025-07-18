import React, { useState, useEffect } from 'react';
import { FileText, Edit, Trash2, Calendar, ArrowLeft, Loader } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { templateTypes } from '../constants/templates';

const SavedDocuments = ({ onEditDocument, onBackToTemplates }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDocuments(documents.filter(doc => doc._id !== id));
      } else {
        console.error('Error deleting document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    } finally {
      setDeleting(null);
    }
  };

  const getTemplateName = (templateType) => {
    const template = templateTypes.find(t => t.id === templateType);
    return template ? template.name : templateType;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
        <span className="ml-2 text-gray-600">Loading documents...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBackToTemplates}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Templates
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Saved Documents</h2>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No saved documents</h3>
          <p className="text-gray-500">Create and save your first document to see it here.</p>
          <button
            onClick={onBackToTemplates}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((document) => (
            <div
              key={document._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800 truncate">{document.title}</h3>
                    <p className="text-sm text-gray-500">{getTemplateName(document.templateType)}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Created: {formatDate(document?.createdAt ? document.createdAt.split('T')[0] : '')}
                </div>
                {document.updatedAt !== document.createdAt && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Updated: {formatDate(document.updatedAt.split('T')[0])}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => onEditDocument(document)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(document._id)}
                  disabled={deleting === document._id}
                  className="flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300"
                >
                  {deleting === document._id ? (
                    <Loader className="animate-spin h-4 w-4" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedDocuments;