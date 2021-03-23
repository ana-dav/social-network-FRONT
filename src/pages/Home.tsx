import React, { FC, useEffect } from 'react';
// MUI
import Grid from '@material-ui/core/Grid';
// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataAction';
// Type
import { AppState } from '../redux/store';
import { IPost } from '../redux/types/types';
// Components
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PostSkeleton from '../util/PostSkeleton';

interface HomeProps {
  data: {
    posts: IPost[];
    loading: boolean;
  };
}

type Props = HomeProps & LinkDispatchProps;

const Home: FC<Props> = (props) => {
  const { data } = props;

  useEffect(() => {
    props.getPosts();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {!data.loading ? (
          data.posts.map((post) => <Post key={post.screamId} post={post} />)
        ) : (
          <PostSkeleton />
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

interface LinkDispatchProps {
  getPosts: () => void;
}

const MapStateToProps = (state: AppState) => ({
  data: state.data,
});

export default connect(MapStateToProps, { getPosts })(Home);
