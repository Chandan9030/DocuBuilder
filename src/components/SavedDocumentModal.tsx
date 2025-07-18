"use client"

import { useState, useEffect } from "react"
import { X, Loader } from "lucide-react"

const SaveDocumentModal = ({ isOpen, onClose, onSave, defaultTitle = "", isEditing = false, isSaving = false }) => {
  const [title, setTitle] = useState(defaultTitle)

  useEffect(() => {
    setTitle(defaultTitle)
  }, [defaultTitle])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && !isSaving) {
      onSave(title.trim())
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{isEditing ? "Update Document" : "Save Document"}</h3>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Document Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter document title"
              required
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || !title.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  {isEditing ? "Updating..." : "Saving..."}
                </>
              ) : isEditing ? (
                "Update"
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SaveDocumentModal
