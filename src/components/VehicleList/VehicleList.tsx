import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { Vehicle } from "types/vehicle";
import { distanceToHuman } from "utils/helpers/distanceHelper";
import { useTheme } from "@mui/system";

type Props = {
  data: Array<Vehicle>;
  onVehicleSelect?: (vehicle: Vehicle) => void;
};

const VehicleList: React.FC<Props> = ({ data, onVehicleSelect }) => {
  const theme = useTheme();
  const listItemStyles = useMemo(
    () => ({
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
        transition: "background-color 0.3s",
      },
    }),
    [theme.palette.action.hover]
  );


  return (
    <List>
      {data.map((vehicle, index) => (
        <React.Fragment key={vehicle.tracker_serial_number}>
          <ListItem
            key={index}
            sx={listItemStyles}
            onClick={() => onVehicleSelect && onVehicleSelect(vehicle)}
          >
            <ListItemAvatar>
              <Avatar variant="square">
                <img alt={vehicle.identifier} src={vehicle.image} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={vehicle.identifier}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    PLACA: {vehicle.license_plate}
                  </Typography>
                  <Typography sx={{ marginLeft: "auto" }}>
                    {distanceToHuman(vehicle?.distance)}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default VehicleList;
