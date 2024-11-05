import React from "react";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import CircleIcon from "@mui/icons-material/Circle";

const CustomRadio = ({ tag, disabled = false, onChange }) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(tag); // Call the onChange function with the tag
    }
  };

  return (
    <Paper style={{ padding: "0.1rem 0.2rem 0.2rem 0.1rem", display: "flex", alignItems: "center" }} onClick={handleClick}>
      <Radio
        disabled={disabled}
        icon={<CircleIcon style={{ fontSize: 14 }} />}
        checkedIcon={<CircleIcon style={{ fontSize: 14, color: "#1976d2" }} />} // Example for checked icon color
        color="default"
        size="small"
        style={{ marginRight: 4, padding: 0, marginBottom: "0.1rem" }}
      />
      <span style={{ fontSize: 12 }}>{tag}</span>
    </Paper>
  );
};

export default CustomRadio;
