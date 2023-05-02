import React from "react";

import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

const VehicleListSkeleton: React.FC = () => {
  const skeletonItems = new Array(5).fill(null);

  return (
    <List>
      {skeletonItems.map((_, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemAvatar>
              <Avatar variant="square">
                <Skeleton variant="rectangular" width={40} height={40} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton width="80%" />}
              secondary={<Skeleton width="60%" />}
            />
            <Box flexGrow={1} />
            <Skeleton width="40%" />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default VehicleListSkeleton;
