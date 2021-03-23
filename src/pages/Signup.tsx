import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Mui
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userAction';
// Type
import { AppState } from '../redux/store';
import { NewUser } from '../redux/types/types';
// Styles
import styles from './style/Signup.style';
// img
import AppIcon from '../images/icon.png';

interface Error {
  email: string;
  password: string;
  confirmPassword: string;
  handle: string;
  general: string;
}

interface SignupProps extends WithStyles<typeof styles> {
  UI: { loading: boolean; errors: null | Error };
  history: {};
}

type Props = SignupProps & LinkDispatchProps;

const Signup: FC<Props> = (props) => {
  const {
    classes,
    UI: { loading, errors },
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (errors) {
      setError(errors);
    }
  }, [errors]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    props.signupUser(newUserData, props.history);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'email') setEmail(event.target.value);
    if (event.target.name === 'password') setPassword(event.target.value);
    if (event.target.name === 'confirmPassword') {
      setConfirmPassword(event.target.value);
    }
    if (event.target.name === 'handle') setHandle(event.target.value);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={error?.email}
            error={error?.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={error?.password}
            error={error?.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={error?.confirmPassword}
            error={error?.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={error?.handle}
            error={error?.handle ? true : false}
            value={handle}
            onChange={handleChange}
            fullWidth
          />
          {error?.general && (
            <Typography variant="body2" className={classes.custromError}>
              {error.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? login
            <Link to="login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

interface LinkDispatchProps {
  signupUser: (newUserData: NewUser, history: any) => void;
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup),
);
