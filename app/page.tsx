"use client";
import React, { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

interface DynamicField {
  id: string;
  label: string;
  type: "string" | "number" | "boolean";
  widget?: "text" | "textarea" | "select" | "radio";
  options?: string[];
  isEditing?: boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const DynamicRJSFFormBuilder = () => {
  const [fields, setFields] = useState<DynamicField[]>([]);

  const addField = () => {
    setFields([
      ...fields,
      {
        id: generateId(),
        label: "New Field",
        type: "string",
        widget: "text",
        isEditing: true,
      },
    ]);
  };

  const updateField = (id: string, updates: Partial<DynamicField>) => {
    setFields(fields.map(f => (f.id === id ? { ...f, ...updates } : f)));
  };

  const moveField = (index: number, direction: "up" | "down") => {
    const newFields = [...fields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= fields.length) return;
    [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
    setFields(newFields);
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const schema = {
    type: "object",
    properties: fields.reduce((acc, field) => {
      if (field.widget === "select" || field.widget === "radio") {
        acc[field.id] = {
          type: field.type,
          title: field.label,
          enum: field.options && field.options.length > 0 ? field.options : ["Option 1", "Option 2"],
        };
      } else {
        acc[field.id] = {
          type: field.type,
          title: field.label,
        };
      }
      return acc;
    }, {} as any),
  };

  const uiSchema = fields.reduce((acc, field) => {
    acc[field.id] = {};
    if (field.widget === "textarea") acc[field.id]["ui:widget"] = "textarea";
    if (field.widget === "select") acc[field.id]["ui:widget"] = "select";
    if (field.widget === "radio") acc[field.id]["ui:widget"] = "radio";
    return acc;
  }, {} as any);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Dynamic RJSF Form Builder</h2>
      <button
        onClick={addField}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Add Field
      </button>

      <div className="space-y-4 mb-6">
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded p-4 shadow-sm bg-white">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-semibold text-gray-700">{field.label} ({field.type})</div>
                <div className="text-sm text-gray-500">{field.widget}</div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => updateField(field.id, { isEditing: !field.isEditing })}
                  className="text-blue-600 hover:underline"
                >
                  {field.isEditing ? "Close" : "Edit"}
                </button>
                <button
                  onClick={() => moveField(index, "up")}
                  className="text-gray-500 hover:text-black"
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveField(index, "down")}
                  className="text-gray-500 hover:text-black"
                  title="Move Down"
                >
                  ↓
                </button>
                <button
                  onClick={() => deleteField(field.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>

            {field.isEditing && (
              <div className="grid grid-cols-2 gap-2 mb-2 bg-gray-50 p-2 rounded">
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  className="border border-gray-300 rounded p-2"
                  placeholder="Field label"
                />

                <select
                  value={field.type}
                  onChange={(e) =>
                    updateField(field.id, { type: e.target.value as DynamicField["type"] })
                  }
                  className="border border-gray-300 rounded p-2"
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </select>

                <select
                  value={field.widget}
                  onChange={(e) =>
                    updateField(field.id, { widget: e.target.value as DynamicField["widget"] })
                  }
                  className="border border-gray-300 rounded p-2 col-span-2"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                  <option value="radio">Radio</option>
                </select>

                {(field.widget === "select" || field.widget === "radio") && (
                  <input
                    type="text"
                    value={field.options?.join(", ") || ""}
                    onChange={(e) =>
                      updateField(field.id, {
                        options: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    className="border border-gray-300 rounded p-2 col-span-2"
                    placeholder="Options (comma-separated)"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border rounded p-4 bg-gray-50 shadow-inner">
        <h3 className="font-semibold mb-2 text-lg">Rendered Form</h3>
        <Form schema={schema} uiSchema={uiSchema} validator={validator} />
      </div>
    </div>
  );
};

export default DynamicRJSFFormBuilder;

