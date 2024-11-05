import React from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const CustomMoreButton = ({ options = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton 
        onClick={handleIconClick} 
        aria-label="More options"
      >
        <MoreHorizIcon style={{ fontSize: 18 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Array.isArray(options) && options.length > 0 ? (
          options.map((option, index) => (
            <MenuItem key={index} onClick={() => { option.action(); handleClose(); }}>
              {option.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No options available</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default CustomMoreButton;
