import React from "react";
import { Box } from "@mui/material";

/**
 * TabPanel component for rendering tab content
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Tab content
 * @param {number} props.value - Current active tab value
 * @param {number} props.index - This tab's index
 * @returns {JSX.Element} - TabPanel component
 */

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      style={{
        display: value === index ? "flex" : "none",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default TabPanel;
