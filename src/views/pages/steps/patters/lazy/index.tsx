import Highlight from '../../../../../components/view/highlight'

const LazyLoadingStep = () => {
  return (
    <div>
      <pre>
        {`Before we continue with styling in React, let's check something cool.
        as `}<a href="https://reactjs.org/docs/code-splitting.html" target="_blank">React docs</a> also mentions:
        <blockquote>"as your app grows, your bundle will grow too. Especially if you are including large third-party libraries."</blockquote>
        <pre>{`and this is exactly what happens to our app when we add styling libraries or component libraries to our app.
        so let's follow the React.Lazy pattern for the next steps.
        (there are more things to do to optimize the code, we will talk about it later)
        but for now just React.Lazy, it so simple! all we need is to change the way we import like lines 3 and 4:`}</pre>
        <br />
        <Highlight skipFormat={true}>{`import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </BrowserRouter>
)`}</Highlight>
        <pre>{`
        what about line 8 ?
        accourding to React docs:
        The lazy component should then be rendered inside a Suspense component, which allows us to show some fallback content (such as a loading indicator) while we’re waiting for the lazy component to load.
The fallback prop accepts any React elements that you want to render while waiting for the component to load. You can place the Suspense component anywhere above the lazy component. You can even wrap multiple lazy components with a single Suspense component.`}</pre>
        <br /> <a href="/step/router">Back</a>
      </pre>
    </div>
  )
}

export default LazyLoadingStep;