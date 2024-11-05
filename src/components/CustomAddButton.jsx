import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { useAppState } from "../AppStateContext";
import AdditionForm from "./AdditionForm";

const CustomAddButton = ({ groupId, users, status, priority }) => {
  const { selectedOptions } = useAppState();
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false); // Optional loading state

  const handleIconClick = () => {
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
    // Optional: reset form data or perform any cleanup here
  };

  return (
    <>
      <IconButton onClick={handleIconClick} aria-label="Add new item">
        <AddIcon style={{ fontSize: 18 }} />
      </IconButton>
      <AdditionForm
        state={selectedOptions.grouping}
        open={openForm}
        onClose={handleFormClose}
        users={users}
        status={status}
        priority={priority}
      />
    </>
  );
};

export default CustomAddButton;
