import React, { FC } from 'react';
// Mui
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
// Img
import noImg from '../images/no-img.png';
// Style
import styles from './style/ProfileSkeletonStyle';

const ProfileSkeleton: FC<WithStyles<typeof styles>> = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={classes.imageWrapper}>
          <img src={noImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" />
          <span>Location</span>
          <hr />
          <LinkIcon color="primary" />
          https://website.com
          <hr />
          <CalendarToday color="primary" />
          Joined date
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ProfileSkeleton);
