"use client";
import Form from "@rjsf/core";

import { ArrayFieldTemplateProps, RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

const RJSFForm = () => {
  const schema: RJSFSchema = {
    title: "custom array of strings",
    type: "array",
    items: {
      type: "string",
    },
  };

  function ArrayTemplate(props: ArrayFieldTemplateProps) {
    const { className, items, canAdd, onAddClick } = props;
    return (
      <div className={className}>
        {items.map((element) => (
          <div
            key={element.key}
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "8px",
            }}
          >
            <div>{element.children}</div>
            {element.hasMoveUp && (
              <button
                type="button"
                onClick={element.onReorderClick(
                  element.index,
                  element.index - 1,
                )}
              >
                Up
              </button>
            )}
            {element.hasMoveDown && (
              <button
                type="button"
                className="p-4 bg-red-50"
                onClick={element.onReorderClick(
                  element.index,
                  element.index + 1,
                )}
              >
                Down
              </button>
            )}
            <button
              type="button"
              onClick={element.onDropIndexClick(element.index)}
            >
              Delete
            </button>
          </div>
        ))}

        {canAdd && (
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={onAddClick}
              type="button"
              style={{
                padding: "6px 12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Custom +
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Form
        schema={schema}
        validator={validator}
        templates={{ ArrayFieldTemplate: ArrayTemplate }}
      />{" "}
    </>
  );
};

export default RJSFForm;
