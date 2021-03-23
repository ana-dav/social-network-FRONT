import React, { FC } from 'react';
import { Link } from 'react-router-dom';
// Mui
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataAction';
// Type
import { AppState } from '../../redux/store';
import { Like } from '../../redux/types/types';
// Components
import MyButton from '../../util/MyButton';

interface LikeButtonProps {
  postId: string;
  user: { authenticated: boolean; likes: Like[] };
}

type Props = LikeButtonProps & LinkDispatchProps;

const LikeButton: FC<Props> = (props) => {
  const likedScream = () => {
    if (
      props.user.likes
      && props.user.likes.find((like) => like.screamId === props.postId)
    ) {
      return true;
    }
    return false;
  };

  const likePostHandle = () => {
    props.likePost(props.postId);
  };

  const unlikePostHandle = () => {
    props.unlikePost(props.postId);
  };

  const { user } = props;

  return !user.authenticated ? (
    <Link to="/login">
      <MyButton tip="like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikePostHandle}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likePostHandle}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
};

interface LinkDispatchProps {
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { likePost, unlikePost })(LikeButton);
