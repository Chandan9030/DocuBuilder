"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import TemplateSelector from "./components/TemplateSelector"
import FormPanel from "./components/FormPanel"
import PreviewPanel from "./components/PreviewPanel"
import OfferLetterPreviewPanel from "./components/OfferLetterPreviewPanel" // Add this import
import SavedDocuments from "./components/SavedDocuments"
import SavedDocumentModal from "./components/SavedDocumentModal"
import ExcelBulkGenerator from "./components/ExcelBulkGenerator"
import { templateTypes, initialFormData } from "./constants/templates"
import { saveToLocalStorage, getFromLocalStorage } from "./utils/storage"

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState("internshipLetter")
  const [formData, setFormData] = useState(initialFormData)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [filePath, setFilePath] = useState("")
  const [showSavedDocuments, setShowSavedDocuments] = useState(false)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  // Load saved form data from localStorage on initial load
  useEffect(() => {
    const savedData = getFromLocalStorage("formData")
    const savedTemplate = getFromLocalStorage("selectedTemplate")

    if (savedData) setFormData(savedData)
    if (savedTemplate) setSelectedTemplate(savedTemplate)
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage("formData", formData)
    saveToLocalStorage("selectedTemplate", selectedTemplate)
  }, [formData, selectedTemplate])

  const handleFormChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId)
    setFilePath("")
  }

  const handleSaveDocument = async (title) => {
    setIsSaving(true)

    try {
      console.log("Saving document with data:", {
        title,
        templateType: selectedTemplate,
        formData,
      })

      let response

      if (editingDocument) {
        // Update existing document
        response = await fetch(`/api/documents/${editingDocument._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            templateType: selectedTemplate,
            formData,
          }),
        })
      } else {
        // Save new document
        response = await fetch("/api/documents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            templateType: selectedTemplate,
            formData,
          }),
        })
      }

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("Server error:", errorData)
        throw new Error(errorData.message || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("Save result:", result)

      if (result.success) {
        alert(editingDocument ? "Document updated successfully!" : "Document saved successfully!")

        // Close modal and reset editing state
        setIsSaveModalOpen(false)
        setEditingDocument(null)

        // Show saved documents
        setShowSavedDocuments(true)
      } else {
        throw new Error(result.message || "Unknown error occurred")
      }
    } catch (error) {
      console.error("Error saving document:", error)
      alert("Failed to save document: " + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditDocument = (document) => {
    setSelectedTemplate(document.templateType)
    setFormData(document.formData)
    setEditingDocument(document)
    setShowSavedDocuments(false)
  }

  const handleOpenSaveModal = () => {
    setIsSaveModalOpen(true)
  }

  // Render the appropriate preview panel based on selected template
  const renderPreviewPanel = () => {
    if (selectedTemplate === "offerLetter") {
      return (
        <OfferLetterPreviewPanel
          formData={formData}
          isGeneratingPDF={isGeneratingPDF}
          setIsGeneratingPDF={setIsGeneratingPDF}
          setFilePath={setFilePath}
          filePath={filePath}
          onSave={handleOpenSaveModal}
        />
      )
    }
    
    return (
      <PreviewPanel
        templateType={selectedTemplate}
        formData={formData}
        isGeneratingPDF={isGeneratingPDF}
        setIsGeneratingPDF={setIsGeneratingPDF}
        setFilePath={setFilePath}
        filePath={filePath}
        onSave={handleOpenSaveModal}
      />
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        currentView={showSavedDocuments ? "saved" : "templates"}
        onViewChange={(view) => {
          if (view === "saved") {
            setShowSavedDocuments(true)
          } else {
            setShowSavedDocuments(false)
          }
        }}
        darkMode={false}
        toggleDarkMode={() => {}}
      />
      <main className="flex-grow flex flex-col">
        {!showSavedDocuments ? (
          <>
            <TemplateSelector
              templates={templateTypes}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleTemplateChange}
            />

            <div className="flex flex-col md:flex-row flex-grow px-4 py-6 gap-6">
              <FormPanel 
                templateType={selectedTemplate} 
                formData={formData} 
                onFormChange={handleFormChange} 
              />

              {renderPreviewPanel()}
            </div>
          </>
        ) : (
          <SavedDocuments 
            onEditDocument={handleEditDocument} 
            onBackToTemplates={() => setShowSavedDocuments(false)} 
          />
        )}
      </main>

      <SavedDocumentModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveDocument}
        defaultTitle={editingDocument?.title || ""}
        isEditing={!!editingDocument}
        isSaving={isSaving}
      />
    </div>
  )
}

export default App