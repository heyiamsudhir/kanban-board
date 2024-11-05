import React, { useState } from "react";
import { Modal, TextField, Select, MenuItem, Box, Button } from "@mui/material";

const AdditionForm = ({ open, onClose, users, status, priority }) => {
  const [formData, setFormData] = useState({
    id: "DUM-99",
    title: "Dummy Entry",
    tag: ["Feature request"],
    userId: "usr-1",
    status: "Todo",
    priority: 4,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    // Optionally, reset the form and close the modal
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
          padding: "1rem",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "0.5rem",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          disabled
          fullWidth
          size="small"
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          size="small"
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Tag"
          name="tag"
          value={formData.tag.join(", ")}
          disabled
          fullWidth
          size="small"
          style={{ marginBottom: "1rem" }}
        />
        <Select
          label="User ID"
          name="userId"
          value={formData.userId}
          onChange={handleInputChange}
          fullWidth
          size="small"
          style={{ marginBottom: "1rem" }}
        >
          {users?.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          fullWidth
          size="small"
          style={{ marginBottom: "1rem" }}
        >
          {status?.map((stat) => (
            <MenuItem key={stat} value={stat}>
              {stat}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          fullWidth
          size="small"
          style={{ marginBottom: "1rem" }}
        >
          {Object.entries(priority).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AdditionForm;
