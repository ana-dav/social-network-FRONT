import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// Mui
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// Redux
import { connect } from 'react-redux';
import { uploadImage, logoutUser } from '../../redux/actions/userAction';
// Type
import { AppState } from '../../redux/store';
import { Credential } from '../../redux/types/types';
// Components
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
// Styles
import styles from './style/Profile.styles';

interface ProfileProps extends WithStyles<typeof styles> {
  user: {
    credentials: Credential;
    loading: boolean;
    authenticated: boolean;
  };
}

type Props = ProfileProps & LinkDispatchProps;

const Profile: FC<Props> = (props) => {
  const {
    classes,
    user: {
      credentials: {
        handle, createdAt, imageUrl, bio, website, location,
      },
      loading,
      authenticated,
    },
  } = props;

  const handleImageChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    const image = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    props.uploadImage(formData);
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput?.click();
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  const profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden
              onChange={handleImageChange}
            />
            <MyButton
              tip="Edit profile picture"
              onClick={handleEditImage}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @
              {handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />
            {' '}
            <span>
              { 'Joined ' }
              {dayjs(createdAt).format('MMM YYYY')}
            </span>
          </div>
          <MyButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Typography>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );
  return profileMarkup;
};

interface LinkDispatchProps {
  logoutUser: () => void;
  uploadImage: (formData: any) => void;
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser, uploadImage })(
  withStyles(styles)(Profile),
);
