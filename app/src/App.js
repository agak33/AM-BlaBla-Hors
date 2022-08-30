import { Route, Routes } from 'react-router-dom';
import { Header } from './common/Header';
import { LandingPage } from './components/landing/LandingPage';
import { AuthorizationPage } from './components/authorization/AuthorizationPage';
import { FormContainer } from './components/form/FormContainer';
import { RouteList } from './components/form/RouteList';
import { Page404 } from './components/errors/Page404';
import { SettingsPage } from './components/user/SettingsPage';
import { useSessionToken } from './components/hooks/useSessionToken';
import { LoadingPage } from './components/errors/LoadingPage';
import { ProtectedRoutesNavigation } from './components/authorization/ProtectedRoutesNavigation';
import './static/css/commonStyle.css';
import { useState } from 'react';

function App() {
  const { isLoading, isValid } = useSessionToken();

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <Header isValid={isValid} />
      <Routes>
        <Route exact path="/" element={<LandingPage isValid={isValid} />} />

        <Route
          path="/"
          element={
            <ProtectedRoutesNavigation authRoutes={false} isValid={isValid} />
          }
        >
          <Route
            path="/login"
            element={<AuthorizationPage isLoginPage={true} />}
          />
          <Route
            path="/register"
            element={<AuthorizationPage isLoginPage={false} />}
          />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoutesNavigation authRoutes={true} isValid={isValid} />
          }
        >
          <Route path="/new" element={<FormContainer isSearchForm={false} />} />
          <Route
            path="/search"
            element={<FormContainer isSearchForm={true} />}
          />
          <Route path="/routes" element={<RouteList isUserList={false} />} />
          <Route path="/account" element={<SettingsPage />} />
          <Route path="/myroutes" element={<RouteList isUserList={true} />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
