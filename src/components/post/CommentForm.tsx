import React, { FC, useState, useEffect } from 'react';
// Mui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataAction';
// Type
import { AppState } from '../../redux/store';

interface Error {
  comment: string;
}
interface CommentFormProps {
  UI: {
    errors: null | Error;
    loading: boolean;
  };
  authenticated: boolean;
  postId: string;
}

type Props = CommentFormProps & LinkDispatchProps;

const CommentForm: FC<Props> = (props) => {
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<Error | null>(null);

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
    if (!props.UI.errors && !props.UI.loading) {
      setBody('');
      setErrors(null);
    }
  }, [props.UI.errors]);

  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBody(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.submitComment(props.postId, body);
    setBody('');
  };

  const { authenticated } = props;
  // const { classes, authenticated } = props;

  const commentFromMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on post"
          error={errors?.comment ? true : false}
          helperText={errors?.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          // className={classes.TextField}
        />
        <Button type="submit" color="primary">
          {/* <Button type="submit" color="primary" className={classes.button}> */}
          Submit
        </Button>
      </form>
      <hr />
      {/* // <hr className={classes.visibleSeparator} /> */}
    </Grid>
  ) : null;
  return commentFromMarkup;
};

interface LinkDispatchProps {
  submitComment: (postId: string, commentData: string) => void;
}

const mapStateToProps = (state: AppState) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(CommentForm);
