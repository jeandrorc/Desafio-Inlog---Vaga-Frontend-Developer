import React from "react";
import MaskedInput from "react-text-mask";
import { TextField } from "@mui/material";

interface MaskedTextFieldProps {
  mask: (string | RegExp)[];
  field: any;
  label: string;
  error: boolean;
  helperText: string;
}

const MaskedTextField: React.FC<MaskedTextFieldProps> = ({
  mask,
  field,
  label,
  error,
  helperText,
}) => (
  <TextField
    {...field}
    fullWidth
    label={label}
    error={error}
    helperText={helperText}
    InputProps={{
      inputComponent: MaskedInput as any,
      inputProps: {
        mask,
        guide: false,
        value: field.value,
        onChange: field.onChange,
      },
    }}
  />
);

export default MaskedTextField;
