import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
// Mui
import Grid from '@material-ui/core/Grid';
// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataAction';
// Type
import { AppState } from '../redux/store';
import { Credential, IPost } from '../redux/types/types';
// Components
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
import PostSkeleton from '../util/PostSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
import api from '../constants';

interface UserProps {
  data: {
    posts: IPost[];
    loading: boolean;
  };
  match: {
    path: string;
    url: string;
    isExact: boolean;
    params: {
      handle: string;
    };
  };
}

type Props = UserProps & LinkDispatchToProps;

const User: FC<Props> = (props) => {
  const [profile, setProfile] = useState<Credential | null>(null);

  useEffect(() => {
    const { handle } = props.match.params;
    props.getUserData(handle);

    axios
      .get(`${api}/user/${handle}`)
      .then((res) => setProfile(res.data.user))
      .catch((err) => console.error(err));
  }, []);

  const {
    data: { posts, loading },
  } = props;

  const postsMarkup = loading ? (
    <PostSkeleton />
  ) : posts === null ? (
    <p>No posts have been created yet</p>
  ) : (
    posts.map((post) => <Post key={post.screamId} post={post} />)
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {postsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

interface LinkDispatchToProps {
  getUserData: (userHandle: string) => void;
}

const mapStateToProps = (state: AppState) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
