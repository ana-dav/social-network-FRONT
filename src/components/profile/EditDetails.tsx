import React, {
  FC, useEffect, useState,
} from 'react';
// Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userAction';
// Type
import { AppState } from '../../redux/store';
import { Credential } from '../../redux/types/types';
// Components
import MyButton from '../../util/MyButton';

type EditDetailsProps = {
  credentials: Credential;
};

type Props = EditDetailsProps & EditUserDetails;

const EditDetails: FC<Props> = (props) => {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);

  const mapUserDetailsToState = (credentials: Credential) => {
    credentials.bio ? setBio(credentials.bio) : '';
    credentials.website ? setWebsite(credentials.website) : '';
    credentials.location ? 
    setLocation(credentials.location) : '';
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(props.credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { credentials } = props;
  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === 'bio') {
      setBio(event.currentTarget.value);
    }
    if (event.currentTarget.name === 'website') {
      setWebsite(event.currentTarget.value);
    }
    if (event.currentTarget.name === 'location') {
      setLocation(event.currentTarget.value);
    }
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location,
    };
    props.editUserDetails(userDetails);
    handleClose();
  };

  return (
    <>
      <MyButton tip="Edit details" onClick={handleOpen}>
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              value={bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal / professional website"
              value={website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type EditUserDetails = {
  editUserDetails: (userDetails: any) => void;
};

const mapStateToProps = (state: AppState) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
