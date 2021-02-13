import React, { FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import styles from './Navbar.module.scss';

const Navbar: FC = () => (
  <div>
    <h1>Navbar</h1>
    <AppBar color="secondary">
      <Toolbar className={styles.wrapper__nav}>
        <Button
          className={styles.nav_button}
          color="primary"
          component={Link}
          href="/login">
          Login
        </Button>
        <Button color="secondary" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/signup">
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

export default Navbar;
