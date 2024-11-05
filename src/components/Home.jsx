import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Grid,
  styled,
  Paper,
  Backdrop,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppState } from "../AppStateContext";
import axios from "axios";

import TicketGroupPriority from "./TicketGroupPriority";
import TicketGroupStatus from "./TicketGroupStatus";
import TicketGroupUser from "./TicketGroupUser";

import inProgressIcon from "../assets/In progress.png";
import backlogIcon from "../assets/back.png";
import cancelIcon from "../assets/cancel-button.png";
import doneIcon from "../assets/PngItem_5284486.png";
import todoIcon from "../assets/pngwing.com.png";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';

// Status and priority constants
const statusIcons = {
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Canceled: cancelIcon,
};

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const priorityIcons = {
  4: (
    <Tooltip title={priorityLabels[4]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <SdCardAlertIcon style={{ fontSize: "14px", padding: "0.3rem", color: "red" }} />
      </Paper>
    </Tooltip>
  ),
  3: (
    <Tooltip title={priorityLabels[3]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <SignalCellularAltIcon style={{ fontSize: "14px", padding: "0.3rem" }} />
      </Paper>
    </Tooltip>
  ),
  2: (
    <Tooltip title={priorityLabels[2]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <SignalCellularAlt2BarIcon style={{ fontSize: "14px", padding: "0.3rem" }} />
      </Paper>
    </Tooltip>
  ),
  1: (
    <Tooltip title={priorityLabels[1]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <SignalCellularAlt1BarIcon style={{ fontSize: "14px", padding: "0.3rem" }} />
      </Paper>
    </Tooltip>
  ),
  0: (
    <Tooltip title={priorityLabels[0]} followCursor>
      <Paper style={{ marginRight: "0.3rem", display: "inline-block" }}>
        <MoreHorizIcon style={{ fontSize: "14px", padding: "0.3rem" }} />
      </Paper>
    </Tooltip>
  ),
};

const MainContainer = styled(Grid)(/* your styles here */);

const Home = () => {
  const { selectedOptions } = useAppState();
  const [data, setData] = useState({ tickets: [], users: [] });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
        setData(response.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setIsDataLoaded(true);
      }
    };

    fetchData();
  }, []);

  const groupTicketsBy = (key) => {
    return data.tickets.reduce((acc, ticket) => {
      const groupKey = ticket[key];
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(ticket);
      return acc;
    }, {});
  };

  const groupedTickets_status = useMemo(() => groupTicketsBy('status'), [data.tickets]);
  const groupedTickets_user = useMemo(() => groupTicketsBy('userId'), [data.tickets]);
  const groupedTickets_priority = useMemo(() => groupTicketsBy('priority'), [data.tickets]);

  const sortGroupedTickets = (groupedTickets) => {
    const compareTitles = (a, b) => a.title.localeCompare(b.title);
    const comparePriority = (a, b) => a.priority - b.priority;

    const sortingFunction = selectedOptions.ordering === "title" ? compareTitles : comparePriority;

    Object.keys(groupedTickets).forEach(key => {
      groupedTickets[key].sort(sortingFunction);
    });
  };

  if (selectedOptions.ordering) {
    sortGroupedTickets(groupedTickets_status);
    sortGroupedTickets(groupedTickets_user);
    sortGroupedTickets(groupedTickets_priority);
  }

  return (
    <Box style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "1rem" }}>
      <MainContainer container>
        <Backdrop open={!isDataLoaded} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {error && <Typography color="error">{error}</Typography>}
        
        {selectedOptions.grouping === "status" && (
          <TicketGroupStatus
            data={data}
            groupedTickets_status={groupedTickets_status}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityLabels={priorityLabels}
            statusValues={Object.keys(statusIcons)}
          />
        )}

        {selectedOptions.grouping === "user" && (
          <TicketGroupUser
            data={data}
            groupedTickets_user={groupedTickets_user}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityValues={Object.keys(priorityIcons)}
            priorityLabels={priorityLabels}
            statusValues={Object.keys(statusIcons)}
          />
        )}

        {selectedOptions.grouping === "priority" && (
          <TicketGroupPriority
            data={data}
            groupedTickets_priority={groupedTickets_priority}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityValues={Object.keys(priorityIcons)}
            priorityLabels={priorityLabels}
            statusValues={Object.keys(statusIcons)}
          />
        )}
      </MainContainer>
    </Box>
  );
};

export default Home;
