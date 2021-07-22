import { Switch, BrowserRouter, Route } from 'react-router-dom';
import InitStep from '../pages/steps/init-app';
import AboutProject from '../pages/steps/init-app/about-project';
import LazyLoadingStep from '../pages/steps/patters/lazy';
import RouterStep from '../pages/steps/router';
import './styles.css';


const Routes = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><InitStep /></Route>
          <Route path="/step/about-project"><AboutProject /></Route>
          <Route path="/step/router"><RouterStep /></Route>
          <Route path="/step/patterns/lazy"><LazyLoadingStep /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Routes;