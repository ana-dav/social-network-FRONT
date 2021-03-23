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
import { loginUser } from '../redux/actions/userAction';
// Type
import { AppState } from '../redux/store';
// Styles
import styles from './style/Login.style';
// Img
import AppIcon from '../images/icon.png';

interface Errors {
  email: string;
  password: string;
  general: string;
}

interface LoginProps extends WithStyles<typeof styles> {
  UI: {
    loading: boolean;
    errors: Errors | null;
  };
  history: any;
}

type Props = LoginProps & LinkDispatchProps;

const Login: FC<Props> = (props) => {
  const {
    classes,
    UI: { loading, errors },
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Errors | null>(null);

  useEffect(() => {
    if (errors) {
      setError(errors);
    }
  }, [errors]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
    props.loginUser(userData, props.history);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'email') setEmail(event.target.value);
    if (event.target.name === 'password') setPassword(event.target.value);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            don&apos;t have an account? sign up
            <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

interface LinkDispatchProps {
  loginUser: (
    userData: { email: string; password: string },
    history: any,
  ) => void;
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { loginUser })(
  withStyles(styles)(Login),
);
