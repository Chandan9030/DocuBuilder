import React from 'react';
import { getFormFieldsForTemplate } from '../constants/templates';

type FormField = {
  id: string;
  label: string;
  type: string;
  width?: string;
  placeholder?: string;
  helper?: string;
  options?: { value: string; label: string }[];
};

const FormPanel = ({
  templateType,
  formData,
  onFormChange,
}: {
  templateType: string;
  formData: Record<string, any>;
  onFormChange: (id: string, value: any) => void;
}) => {
  const fields: FormField[] = getFormFieldsForTemplate(templateType);

  // Debug: Log formData and templateType
  console.log('FormPanel rendered with:', { templateType, formData });

  // Group fields for side-by-side layout (except textarea)
  type GroupedField =
    | { type: 'single'; field: FormField; fullWidth: boolean }
    | { type: 'group'; fields: FormField[] };

  const groupedFields: GroupedField[] = [];
  let i = 0;

  while (i < fields.length) {
    const currentField = fields[i];

    if (currentField.type === 'textarea') {
      groupedFields.push({
        type: 'single',
        field: currentField,
        fullWidth: true,
      });
      i += 1;
    } else if (
      currentField.id === 'recipientTitle' &&
      i + 1 < fields.length &&
      fields[i + 1].id === 'recipientName'
    ) {
      groupedFields.push({
        type: 'group',
        fields: [currentField, fields[i + 1]],
      });
      i += 2;
    } else if (i + 1 < fields.length && fields[i + 1].type !== 'textarea') {
      groupedFields.push({
        type: 'group',
        fields: [currentField, fields[i + 1]],
      });
      i += 2;
    } else {
      groupedFields.push({
        type: 'single',
        field: currentField,
        fullWidth: false,
      });
      i += 1;
    }
  }

  const renderField = (field: FormField, isInGroup = false) => {
    const baseClasses =
      'rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200';
    const sizeClasses = isInGroup || field.type !== 'textarea'
      ? 'px-2 py-1.5 text-sm'
      : 'px-3 py-2';
    const isInvalid = field.id === 'recipientTitle' && !formData[field.id];

    if (field.type === 'select') {
      const selectValue =
        formData[field.id] && field.options?.some((opt) => opt.value === formData[field.id])
          ? formData[field.id]
          : '';

      return (
        <div>
          <select
            id={field.id}
            value={selectValue}
            onChange={(e) => {
              console.log(`Field changed: ${field.id} = ${e.target.value}`);
              onFormChange(field.id, e.target.value);
            }}
            className={`w-full ${baseClasses} ${sizeClasses} ${
              isInvalid ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {isInvalid && (
            <p className="text-xs text-red-500 mt-0.5">Please select a title</p>
          )}
        </div>
      );
    } else if (field.type === 'textarea') {
      return (
        <textarea
          id={field.id}
          value={formData[field.id] || ''}
          onChange={(e) => {
            console.log(`Field changed: ${field.id} = ${e.target.value}`);
            onFormChange(field.id, e.target.value);
          }}
          className={`w-full ${baseClasses} ${sizeClasses} min-h-[80px]`}
          placeholder={field.placeholder}
        />
      );
    } else if (field.type === 'date') {
      return (
        <input
          id={field.id}
          type="date"
          value={formData[field.id] || ''}
          onChange={(e) => {
            console.log(`Field changed: ${field.id} = ${e.target.value}`);
            onFormChange(field.id, e.target.value);
          }}
          className={`w-full ${baseClasses} ${sizeClasses}`}
        />
      );
    } else {
      return (
        <input
          id={field.id}
          type={field.type || 'text'}
          value={formData[field.id] || ''}
          onChange={(e) => {
            console.log(`Field changed: ${field.id} = ${e.target.value}`);
            onFormChange(field.id, e.target.value);
          }}
          className={`w-full ${baseClasses} ${sizeClasses}`}
          placeholder={field.placeholder}
        />
      );
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-y-auto max-h-[calc(100vh-12rem)]">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Document Information</h2>
      <form className="space-y-4">
        {groupedFields.map((group, index) => (
          <div key={index}>
            {group.type === 'group' ? (
              <div className="flex gap-3">
                {group.fields.map((field: FormField) => (
                  <div key={field.id} className={`space-y-1 ${field.width === 'small' ? 'w-24' : 'flex-1'}`}>
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-medium text-gray-700"
                    >
                      {field.label}
                    </label>
                    {renderField(field, true)}
                    {field.helper && (
                      <p className="text-xs text-gray-500 mt-0.5">{field.helper}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={`space-y-1 ${group.fullWidth ? 'w-full' : 'w-1/2'}`}>
                <label
                  htmlFor={group.field.id}
                  className="block text-xs font-medium text-gray-700"
                >
                  {group.field.label}
                </label>
                {renderField(group.field, !group.fullWidth)}
                {group.field.helper && (
                  <p className="text-xs text-gray-500 mt-0.5">{group.field.helper}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default FormPanel;