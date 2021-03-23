import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Mui
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
// Type
import { AppState } from '../../redux/store';
import { IPost } from '../../redux/types/types';
// Components
import MyButton from '../../util/MyButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';
// Style
import styles from './style/Post.styles';

interface PostProps extends WithStyles<typeof styles> {
  post: IPost;
  user: {
    authenticated: boolean;
    credentials: { handle: string };
  };
}

const Post: FC<PostProps> = (props) => {
  const {
    classes,
    post: {
      body,
      createdAt,
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount,
    },
    user: {
      authenticated,
      credentials: { handle },
    },
  } = props;

  dayjs.extend(relativeTime);

  const deleteButton = authenticated
  && userHandle === handle ? (
    <DeletePost postId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
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
          {commentCount}
          Comments
        </span>
        <PostDialog postId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

const MapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(MapStateToProps)(withStyles(styles)(Post));
