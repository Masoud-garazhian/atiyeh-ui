import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        </div>
      </header>
    </div>
  )
}

export default App;
