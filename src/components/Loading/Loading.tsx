import React from 'react';
import { CircularProgress } from '@mui/material';
import { StyledBox } from './Loading.styled';

const Loading: React.FC = () => {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
};

export default Loading;
