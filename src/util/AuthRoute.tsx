import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';

interface Props {
  component: any;
  authenticated: boolean;
  exact?: boolean;
  path: string;
}

const AuthRoute: FC<Props> = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (authenticated === true
      ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

const mapStateToProps = (state: AppState) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
