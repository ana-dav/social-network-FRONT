import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
// Mui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icon
import HomeIcon from '@material-ui/icons/Home';
// Redux
import { connect } from 'react-redux';
// Type
import { AppState } from '../../redux/store';
// Component
import MyButton from '../../util/MyButton';
import AddPost from '../post/AddPost';
// style
import styles from './Navbar.module.scss';

type Prop = {
  authenticated: boolean;
};

const Navbar: FC<Prop> = ({ authenticated }) => (
  <div>
    <h1>Navbar</h1>
    <AppBar color="secondary">
      <Toolbar className={styles.wrapperNav}>
        {authenticated ? (
          <>
            <AddPost />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon color="primary" />
              </MyButton>
            </Link>
          </>
        ) : (
          <>
            <Button
              className={styles.navButton}
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button color="secondary" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

const mapStateToProps = (state: AppState) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
