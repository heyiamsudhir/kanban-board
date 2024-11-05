import React from "react";
import { Grid, Paper, styled } from "@mui/material";

import CustomMoreButton from "./CustomMoreButton";
import CustomAddButton from "./CustomAddButton";
import FeatureRequest from "./FeatureRequest";
import ProfileIcon from "./ProfileIcon";
import PropTypes from "prop-types";

const CustomTicketCard = ({ ticket, getUserAvailability, priorityIcons }) => {
  return (
    <Paper sx={{ padding: 2 }}>
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
        <p sx={{ margin: 0, fontSize: 15, fontWeight: 600, marginBottom: "1rem" }}>
          {ticket.title}
        </p>
        <div sx={{ display: "flex", alignItems: "center" }}>
          {priorityIcons[ticket.priority]}
          <FeatureRequest tag={ticket.tag[0]} />
        </div>
      </div>
    </Paper>
  );
};

const CustomLabel = styled("label")({
  display: "flex",
  alignItems: "center",
  padding: 0,
});

const TicketGroupStatus = ({
  data,
  groupedTickets_status,
  priorityIcons,
  statusIcons,
  priorityLabels,
  statusValues,
}) => {
  const getUserAvailability = (userId) => {
    const user = data.users.find((user) => user.id === userId);
    return user?.available || false;
  };

  return (
    <>
      {statusValues.map((status) => (
        <Grid item lg={2.4} key={status} padding={2}>
          <div sx={{ display: "flex", alignItems: "center" }}>
            <CustomLabel>
              <img
                src={statusIcons[status]}
                alt={`${status} icon`}
                style={{ width: 16, height: 16, marginRight: 4 }}
              />
              <h4 sx={{ margin: 0, fontWeight: 500, marginLeft: 0.8 }}>
                {status}
              </h4>
              <h4 sx={{ margin: 0, fontWeight: 400, marginLeft: 0.5 }}>
                {groupedTickets_status[status]?.length || 0}
              </h4>
            </CustomLabel>
            <div sx={{ marginLeft: "auto" }}>
              <CustomAddButton
                groupId={status}
                users={data.users}
                status={statusValues}
                priority={priorityLabels}
              />
              <CustomMoreButton />
            </div>
          </div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {groupedTickets_status[status]?.map((ticket) => (
              <li key={ticket.id} style={{ marginBottom: "8px" }}>
                <CustomTicketCard
                  ticket={ticket}
                  getUserAvailability={getUserAvailability}
                  priorityIcons={priorityIcons}
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
TicketGroupStatus.propTypes = {
  data: PropTypes.object.isRequired,
  groupedTickets_status: PropTypes.object.isRequired,
  priorityIcons: PropTypes.object.isRequired,
  statusIcons: PropTypes.object.isRequired,
  priorityLabels: PropTypes.object.isRequired,
  statusValues: PropTypes.array.isRequired,
};

export default TicketGroupStatus;
