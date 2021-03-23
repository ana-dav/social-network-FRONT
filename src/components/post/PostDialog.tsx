import React, { FC, Fragment, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// Mui
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataAction';
import LikeButton from './LikeButton';
// Components
import MyButton from '../../util/MyButton';
import api from '../../constants';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { AppState } from '../../redux/store';
// Styles
import styles from './style/PostDialog.styles';
import { IPost } from '../../redux/types/types';

interface IPostDialog extends WithStyles<typeof styles> {
  post: IPost;
  UI: { loading: boolean };
  postId: string;
  userHandle: string;
}

type Props = IPostDialog & LinkDispatchProps;

const PostDialog: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    props.getPost(props.postId);
  };

  const handleClose = () => {
    setOpen(false);
    props.clearErrors();
  };

  const {
    classes,
    post: {
      screamId,
      body,
      createdAt,
      likeCount,
      userImage,
      userHandle,
      comments,
    },
    UI: { loading },
  } = props;

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <MyButton
            tip="Close"
            onClick={handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {loading ? (
              <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
              </div>
            ) : (
              <Grid container>
                <Grid item sm={5}>
                  <img
                    src={userImage}
                    alt="Profile"
                    className={classes.profileImage}
                  />
                </Grid>
                <Grid item sm={7}>
                  <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`${api}/users/${userHandle}`}
                  >
                    @
                    {userHandle}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant="body1">{body}</Typography>
                  <LikeButton postId={screamId} />
                  <span>
                    {likeCount}
                    Likes
                  </span>
                  <MyButton tip="comments">
                    <ChatIcon color="primary" />
                  </MyButton>
                  <span>
                    {comments ? comments.length : null}
                    Comments
                  </span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm postId={screamId} />
                <Comments comments={comments} />
              </Grid>
            )}
          </DialogContent>
        </Dialog>
      </Dialog>
    </>
  );
};

interface LinkDispatchProps {
  getPost: (postId: string) => void;
  clearErrors: () => void;
}

const mapStateToProps = (state: AppState) => ({
  post: state.data.post,
  UI: state.UI,
});

export default connect(mapStateToProps, { getPost, clearErrors })(
  withStyles(styles)(PostDialog),
);
