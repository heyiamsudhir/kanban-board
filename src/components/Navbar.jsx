import React from "react"; // Ensure React is imported correctly
import {
  Paper,
  Button,
  Select,
  Menu,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useAppState } from "../AppStateContext"; // Custom hook from context
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    body1: {
      fontSize: "0.8rem",
    },
  },
});

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null); // State for menu anchor
  const { selectedOptions, updateSelectedOptions } = useAppState(); // Using context

  const handleChange1 = (event) => {
    updateSelectedOptions(selectedOptions.ordering, event.target.value); // Correct parameter order
  };

  const handleChange2 = (event) => {
    updateSelectedOptions(event.target.value, selectedOptions.grouping); // Correct parameter order
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element for menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close menu
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} style={{ padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Paper style={{ marginLeft: "1.2rem", marginTop: "0.3rem", marginBottom: "0.5rem" }}>
          <Button
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            startIcon={<TuneIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            size="small"
            style={{ fontSize: "12px" }}
          >
            Display
          </Button>
        </Paper>
        <Menu
          id="dropdown-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          style={{ marginTop: "10px" }}
        >
          <MenuItem style={{ display: "flex", justifyContent: "space-between" }}>
            Grouping
            <Select
              value={selectedOptions.grouping}
              onChange={handleChange1}
              style={{ width: "100px", marginLeft: "5rem" }}
              size="small"
            >
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
            </Select>
          </MenuItem>
          <MenuItem style={{ display: "flex", justifyContent: "space-between" }}>
            Ordering
            <Select
              value={selectedOptions.ordering}
              onChange={handleChange2}
              style={{ width: "100px", marginLeft: "5rem" }}
              size="small"
            >
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </MenuItem>
        </Menu>
      </Paper>
    </ThemeProvider>
  );
}

export default Navbar;
