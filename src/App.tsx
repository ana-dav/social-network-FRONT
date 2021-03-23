import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Mui
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { UserActionTypes } from './redux/types/actions';
import { logoutUser, getUserData } from './redux/actions/userAction';
// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
// Style
import themeObj from './util/themeObj';
import './App.scss';

interface IToken {
  token: string;
  exp: number;
}

const theme = createMuiTheme(themeObj);

const token: string = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode<IToken>(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch<any>(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: UserActionTypes.SET_AUTHENTICATED });
    axios.defaults.headers.common.Authorization = token;
    store.dispatch<any>(getUserData());
  }
}

const App: FC = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <Route exact path="/users/:handle" component={User} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default App;
