import React from "react";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";

import icon from "../assets/profile.jpeg";
import onlineIcon from "../assets/Green_sphere.svg.png";
import offlineIcon from "../assets/circle-xxl.png";

const ProfileIcon = ({ userId, getUserAvailability }) => {
  const isOnline = getUserAvailability(userId); // Store result in a variable

  return (
    <Tooltip title={isOnline ? "Online" : "Offline"} followCursor>
      <div style={{ position: "relative" }}>
        <img
          src={icon}
          alt="User profile icon" // More descriptive alt text
          style={{
            width: "16px",
            height: "16px",
            marginRight: "4px",
          }}
        />
        <img
          src={isOnline ? onlineIcon : offlineIcon}
          alt={isOnline ? "User is online" : "User is offline"} // More descriptive alt text
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        />
      </div>
    </Tooltip>
  );
};

// Prop types validation
ProfileIcon.propTypes = {
  userId: PropTypes.string.isRequired,
  getUserAvailability: PropTypes.func.isRequired,
};

export default ProfileIcon;
