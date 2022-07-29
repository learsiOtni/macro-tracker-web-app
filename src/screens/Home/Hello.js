import React from 'react';
import { Typography, Avatar } from '@mui/material';
import AvatarImg from '../../assets/img/avatar.jpg';

const Hello = () => {
  return (
      <React.Fragment>
          <Typography variant="subtitle" gutterBottom>Hi Daniel,</Typography>
          <Typography variant="h4" gutterBottom>Your Goal for Today</Typography>
          <Avatar alt="profile image" src={AvatarImg} sx={{width: 100, height: 100, mt: 2}} />
      </React.Fragment>
  )
}

export default Hello