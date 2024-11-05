import React from "react";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";

const StatusIcon = ({ status, statusIcons }) => {
  const iconSrc = statusIcons[status] || statusIcons.default; // Fallback to default icon

  return (
    <Tooltip title={status} followCursor>
      <img
        src={iconSrc}
        alt={`Status: ${status}`} // More descriptive alt text
        style={{
          marginTop: "0.2rem",
          width: "14px",
          height: "14px",
          marginRight: "0.3rem",
        }}
      />
    </Tooltip>
  );
};

// Prop types validation
StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
  statusIcons: PropTypes.objectOf(PropTypes.string).isRequired, // Ensure it's an object with string values
};

export default StatusIcon;
