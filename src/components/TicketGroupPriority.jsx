import React from "react";
import { Grid, Paper, styled } from "@mui/material";

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

const CustomTicketCard = ({ ticket, getUserAvailability, statusIcons }) => {
  return (
    <Paper sx={{ padding: 1 }}>
      <div sx={{ display: "flex", flexDirection: "column", padding: "0.2rem" }}>
        <div sx={{ display: "flex", justifyContent: "space-between" }}>
          <p sx={{ margin: 0, fontSize: 14, marginBottom: "0.2rem" }}>
            {ticket.id}
          </p>
          <ProfileIcon
            userId={ticket.userId}
            getUserAvailability={getUserAvailability}
          />
        </div>
        <div sx={{ display: "flex", alignItems: "flex-start" }}>
          <StatusIcon status={ticket.status} statusIcons={statusIcons} />
          <p sx={{ margin: 0, fontSize: 15, fontWeight: "600", marginBottom: "1rem" }}>
            {ticket.title}
          </p>
        </div>
        <div sx={{ display: "flex", alignItems: "center" }}>
          <FeatureRequest tag={ticket.tag[0]} />
        </div>
      </div>
    </Paper>
  );
};

const TicketGroupPriority = ({
  data,
  groupedTickets_priority,
  priorityIcons,
  statusIcons,
  priorityValues,
  priorityLabels,
  statusValues,
}) => {
  const getUserAvailability = (userId) => {
    const user = data.users.find((user) => user.id === userId);
    if (!user) {
      console.warn(`User with ID ${userId} not found.`);
      return false;
    }
    return user.available || false;
  };

  return (
    <>
      {priorityValues.map((priority) => (
        <Grid item lg={2.4} key={priority} padding={2}>
          <div sx={{ display: "flex", alignItems: "center" }}>
            <CustomLabel>
              {priorityIcons[priority]}
              <h4 sx={{ margin: 0, fontWeight: 500, marginLeft: 0.8 }}>
                {priorityLabels[priority]}
              </h4>
              <h4 sx={{ margin: 0, fontWeight: 400, marginLeft: 0.5 }}>
                {groupedTickets_priority[priority]?.length || 0}
              </h4>
            </CustomLabel>
            <div sx={{ marginLeft: "auto" }}>
              <CustomAddButton
                groupId={priority}
                users={data.users}
                status={statusValues}
                priority={priorityLabels}
              />
              <CustomMoreButton />
            </div>
          </div>
          <ul sx={{ listStyleType: "none", padding: 0 }}>
            {groupedTickets_priority[priority]?.map((ticket) => (
              <li key={ticket.id} style={{ marginBottom: "8px" }}>
                <CustomTicketCard
                  ticket={ticket}
                  statusIcons={statusIcons}
                  getUserAvailability={getUserAvailability}
                />
              </li>
            ))}
          </ul>
        </Grid>
      ))}
    </>
  );
};

// Prop types validation
TicketGroupPriority.propTypes = {
  data: PropTypes.object.isRequired,
  groupedTickets_priority: PropTypes.object.isRequired,
  priorityIcons: PropTypes.object.isRequired,
  statusIcons: PropTypes.object.isRequired,
  priorityValues: PropTypes.array.isRequired,
  priorityLabels: PropTypes.object.isRequired,
  statusValues: PropTypes.array.isRequired,
};

export default TicketGroupPriority;
