import React, {
  FC, useState, useEffect,
} from 'react';
// Mui
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DialogContent } from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux
import { connect } from 'react-redux';
import { addPost, clearErrors } from '../../redux/actions/dataAction';
// Type
import { AppState } from '../../redux/store';
// Components
import MyButton from '../../util/MyButton';
// Styles
import styles from './style/AddPost.style';

interface Error {
  body: string;
}

interface AddPostProps extends WithStyles<typeof styles> {
  UI: {
    errors: null | Error;
    loading: boolean;
  };
}

type Prop = AddPostProps & LinkDispatchToProps;

const AddPost: FC<Prop> = (props) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [error, setError] = useState<null | Error>(null);

  const { classes, UI: { errors, loading } } = props;

  useEffect(() => {
    if (errors) {
      setError(errors);
    }
    if (!errors && !loading) {
      setBody('');
      setOpen(false);
      setError(null);
    }
  }, [errors, loading]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.clearErrors();
    setOpen(false);
    setError(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.addPost(body);
  };

  return (
    <>
      <MyButton onClick={handleOpen} tip="Add a Post">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Add a new Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="post"
              multiline
              rows="3"
              placeholder="Add a post"
              error={error?.body ? true : false}
              helperText={error?.body}
              onChange={handleChange}
              className={classes.textField}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submitButton}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface LinkDispatchToProps {
  addPost: (newPost: string) => void;
  clearErrors: () => void;
}

const mapStateToProps = (state: AppState) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { addPost, clearErrors })(
  withStyles(styles)(AddPost),
);
