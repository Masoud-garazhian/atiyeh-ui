import { lazy, Suspense } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './styles.css';

const InitStep = lazy(() => import('../pages/steps/init-app'));
const LoginScreen = lazy(() => import('../auth/login/screen/login-screen'));
const AboutProject = lazy(() => import('../pages/steps/init-app/about-project'));
const LazyLoadingStep = lazy(() => import('../pages/steps/patters/lazy'));
const RouterStep = lazy(() => import('../pages/steps/router'));
const StyledComponents = lazy(() => import('../pages/steps/styling/styled-components'));
const ComponentLibraries = lazy(() => import('../pages/steps/styling/component-libraries'));

const Routes = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/"><LoginScreen /></Route>
            <Route path="/step/about-project"><AboutProject /></Route>
            <Route path="/step/router"><RouterStep /></Route>
            <Route path="/step/patterns/lazy"><LazyLoadingStep /></Route>
            <Route path="/step/styling/js-styling"><StyledComponents /></Route>
            <Route path="/step/styling/component-libs"><ComponentLibraries /></Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default Routes;