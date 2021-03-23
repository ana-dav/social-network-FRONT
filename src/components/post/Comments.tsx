import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// Mui
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Type
import { Comment } from '../../redux/types/types';
import api from '../../constants';
// Styles
import styles from './style/Comments.styles';

interface Props extends WithStyles<typeof styles> {
  comments: Comment[];
}

const Comments: FC<Props> = (props) => {
  const { comments, classes } = props;
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const {
          body, createadAt, userImage, userHandle,
        } = comment;
        return (
          <Fragment key={+createadAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
              </Grid>
              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`${api}/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createadAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant="body1">{body}</Typography>
                </div>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(Comments);
