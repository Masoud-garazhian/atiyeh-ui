import logo from './logo.svg';
import './styles.css'


const InitStep = () => {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <blockquote><i>"It starts with, one thing":</i></blockquote>
        <p><code>npx create-react-app preactice --template typescript</code></p>
        <p>and it makes&nbsp;
          <a href="https://github.com/aronmi/preactice/tree/ab8c213119a77db27fefb6ddf8b0cc955ad2c474" target="_blank">this</a>
        </p>
        <p>
          <span>see more&nbsp;</span>
          <a href="https://create-react-app.dev/docs/adding-typescript/" target="_blank" >here</a>
        </p>
        <p>and then we made <a href="https://github.com/aronmi/preactice/commit/a44888069f99c86e9027ee2c94b0a2a4fd60eb14" target="_blank">this changes</a></p>
        <p><span>tried it? </span><a href="/step/about-project" >Let's go!</a></p>
      </div>
    </>
  );
}


export default InitStep;