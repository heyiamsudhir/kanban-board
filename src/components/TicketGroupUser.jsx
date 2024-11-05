import React from "react";
import { Grid, Paper, Box, styled } from "@mui/material";
import CustomMoreButton from "./CustomMoreButton";
import CustomAddButton from "./CustomAddButton";
import FeatureRequest from "./FeatureRequest";
import ProfileIcon from "./ProfileIcon";
import StatusIcon from "./StatusIcon";
import PropTypes from "prop-types";

const CustomLabel = styled("label")({
  display: "flex",
  alignItems: "center",
  padding: 0,
});

const CustomTicketCard = ({ ticket, priorityIcons, statusIcons }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "0.2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <p sx={{ margin: 0, fontSize: 14, marginBottom: "0.4rem" }}>
            {ticket.id}
          </p>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <StatusIcon status={ticket.status} statusIcons={statusIcons} />
          <p sx={{ marginTop: 0, fontSize: 15, fontWeight: 600, marginBottom: "1rem", marginLeft: 1 }}>
            {ticket.title}
          </p>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {priorityIcons[ticket.priority]}
          <FeatureRequest tag={ticket.tag[0]} />
        </Box>
      </Box>
    </Paper>
  );
};

const TicketGroupUser = ({
  data,
  groupedTickets_user,
  priorityIcons,
  statusIcons,
  priorityValues,
  priorityLabels,
  statusValues,
}) => {
  const getUserAvailability = (userId) => {
    const user = data.users.find((user) => user.id === userId);
    return user?.available || false;
  };

  return (
    <>
      {Object.keys(groupedTickets_user).map((userId) => {
        const user = data.users.find((user) => user.id === userId);
        return (
          <Grid item lg={2.4} key={userId} padding={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomLabel>
                <ProfileIcon
                  userId={userId}
                  getUserAvailability={getUserAvailability}
                />
                <h4 sx={{ margin: 0, fontWeight: 500, marginLeft: 0.8 }}>
                  {user?.name || "Unknown User"}
                </h4>
                <h4 sx={{ margin: 0, fontWeight: 400, marginLeft: 0.5 }}>
                  {groupedTickets_user[userId]?.length || 0}
                </h4>
              </CustomLabel>
              <Box sx={{ marginLeft: "auto" }}>
                <CustomAddButton
                  groupId={userId}
                  users={data.users}
                  status={statusValues}
                  priority={priorityLabels}
                />
                <CustomMoreButton />
              </Box>
            </Box>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {groupedTickets_user[userId]?.map((ticket) => (
                <li key={ticket.id} style={{ marginBottom: "8px" }}>
                  <CustomTicketCard
                    ticket={ticket}
                    priorityIcons={priorityIcons}
                    statusIcons={statusIcons}
                  />
                </li>
              ))}
            </ul>
          </Grid>
        );
      })}
    </>
  );
};

// Prop types validation
TicketGroupUser.propTypes = {
  data: PropTypes.object.isRequired,
  groupedTickets_user: PropTypes.object.isRequired,
  priorityIcons: PropTypes.object.isRequired,
  statusIcons: PropTypes.object.isRequired,
  priorityValues: PropTypes.array.isRequired,
  priorityLabels: PropTypes.array.isRequired,
  statusValues: PropTypes.array.isRequired,
};

export default TicketGroupUser;
