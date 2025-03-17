import React from "react";

interface FormInputProps {
  id?: string;
  name: string;
  label: string;
  type: string;
  value?: string; // Hacerlo opcional para inputs tipo "file"
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  options?: string[]; // Para selects
  accept?: string; // Para input de tipo "file"
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
  required,
  options,
  accept,
}) => {
  // Manejador de eventos para input/select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange(e);
  };

  return (
    <div>
      <label htmlFor={id || name}>{label}</label>
      {type === "select" && options ? (
        <select
          id={id || name}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
        >
          <option value="">Seleccione una opción</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id || name}
          type={type}
          name={name}
          value={type !== "file" ? value : undefined}
          onChange={handleChange}
          required={required}
          accept={accept} // Para input de tipo "file"
        />
      )}
    </div>
  );
};

export default FormInput;
