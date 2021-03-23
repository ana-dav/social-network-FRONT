import React, { FC, Fragment, useState } from 'react';
// Mui
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';
// Redux
import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataAction';
// Components
import MyButton from '../../util/MyButton';
// Styles
import styles from './style/DeletePost.styles';

interface DeletePostProps extends WithStyles<typeof styles> {
  postId: string;
}

type Props = DeletePostProps & LinkDispatchProps;

const DeletePost: FC<Props> = (props) => {
  const { classes } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePostHandle = () => {
    props.deletePost(props.postId);
    setOpen(false);
  };

  return (
    <>
      <MyButton
        tip="Delete Post"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePostHandle} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

interface LinkDispatchProps {
  deletePost: (postId: string) => void;
}

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
