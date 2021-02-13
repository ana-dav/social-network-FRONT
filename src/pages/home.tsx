import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import api from '../constants';
import Post from '../components/Post';

const home: FC = () => {
  const [posts, setPosts] = useState<Array<Object> | null>([]);

  useEffect(() => {
    const fetchScreams = async () => {
      const res = await axios(`${api}/screams`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => console.error(err));
    };
    fetchScreams();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {posts ? (
          posts.map((post) => <Post key={post.screamId} post={post} />)
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default home;
