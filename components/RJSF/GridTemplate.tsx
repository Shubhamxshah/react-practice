"use client";
import Form from "@rjsf/core";
import { ObjectFieldTemplateProps, WidgetProps, RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

const RJSFForm = () => {
  const schema: RJSFSchema = {
    title: "User Info Grid",
    description: "add the data",
    type: "object",
    properties: {
      firstName: { type: "string", title: "First Name" },
      lastName: { type: "string", title: "Last Name" },
      age: { type: "number", title: "Age" },
      email: { type: "string", format: "email", title: "Email" },
    },
  };

  function GridTemplate(props: ObjectFieldTemplateProps) {
    const { properties, title, description } = props;

    return (
      <fieldset className="border border-gray-300 p-4 rounded">
        <legend className="text-lg font-semibold">{title}</legend>
        {description}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {properties.map((prop) => (
            <div key={prop.content.key} className="p-2 border rounded border-gray-200">
              {prop.content}
            </div>
          ))}
        </div>
      </fieldset>
    );
  }

  const CustomTextWidget = (props: WidgetProps) => {
    const { value, onChange, onBlur, onFocus, required, disabled, readonly } = props;

    return (
      <input
        type="text"
        value={value || ""}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur && ((e) => onBlur(props.id, e.target.value))}
        onFocus={onFocus && ((e) => onFocus(props.id, e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    );
  };

  const CustomNumberWidget = (props: WidgetProps) => {
    const { value, onChange, onBlur, onFocus, required, disabled, readonly } = props;

    return (
      <input
        type="number"
        value={value || ""}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        onChange={(e) => onChange(Number(e.target.value))}
        onBlur={onBlur && ((e) => onBlur(props.id, e.target.value))}
        onFocus={onFocus && ((e) => onFocus(props.id, e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    );
  };

  return (
    <Form
      schema={schema}
      validator={validator}
      templates={{ ObjectFieldTemplate: GridTemplate }}
      widgets={{
        TextWidget: CustomTextWidget,
        EmailWidget: CustomTextWidget,
        NumberWidget: CustomNumberWidget,
      }}
    />
  );
};

export default RJSFForm;


