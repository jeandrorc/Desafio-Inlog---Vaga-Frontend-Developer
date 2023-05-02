import React from "react";
import { Skeleton } from "@mui/material";
import { styled } from "@mui/system";

const MapSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: theme.shape.borderRadius,
}));

const GoogleMapSkeleton: React.FC = () => {
  return <MapSkeleton data-testid='google-map-skeleton' variant="rectangular" />;
};

export default GoogleMapSkeleton;
