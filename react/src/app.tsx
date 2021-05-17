import { defaultTheme, Provider } from '@adobe/react-spectrum';
import HeaderComponent from '@app/@code-fights/components/header';
import useScrollTop from '@app/@code-fights/hooks/use-scroll-top';
import CreateRoom from '@app/@pages/create-room';
import LandingPage from '@app/@pages/landing-page';
import Room from '@app/@pages/room';
import AuthHeader from '@app/auth/auth-header';
import ForgotPassword from '@app/auth/forgot-password';
import Login from '@app/auth/login';
import AuthProvider from '@app/auth/provider/auth-provider';
import Signup from '@app/auth/signup';
import BattleArena from '@app/battle-arena';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

function ScrollToTop(): JSX.Element {
  useScrollTop();
  return <></>;
}

function App(): JSX.Element {
  return (
    <Provider theme={defaultTheme} scale={'medium'}>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Switch>
            <Route path={'/auth'}>
              <Provider scale={'medium'}>
                <AuthHeader />
                <Route exact path={'/auth/login'} component={Login} />
                <Route exact path={'/auth/signup'} component={Signup} />
                <Route
                  exact
                  path={'/auth/forgot-password'}
                  component={ForgotPassword}
                />
              </Provider>
            </Route>

            <Route exact path={'/fight'} component={BattleArena} />

            <Route path={'/'}>
              <HeaderComponent />
              <Route exact path={'/'} component={LandingPage} />
              <Route exact path={'/create-room'} component={CreateRoom} />
              <Route exact path={'/room/:id'} component={Room} />
            </Route>
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
