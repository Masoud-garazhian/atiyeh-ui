import './styles.css';

const AboutProject = () => {
  return (
    <pre>
      {`Ok, what's there for the next step?
      we believe `}<a href="https://reactjs.org/tutorial/tutorial.html">React tutorial</a>{` is enough for developers to start with React and learn everything about the React itself.
      after tutorial you may want to check the `}<a href="https://reactjs.org/docs/getting-started.html">React docs</a>{` to check the main concepts. and this `}<a href="https://devhints.io/react">React cheatsheet</a>.{`
      but we will talk about advanced concepts, testing, hooks, patterns and a lot more here in Preactice.
      what we are going to build here is a React tutorial web app which by following the git changes anyone can learn React step by step.
`}
      <a href="/step/router" >Next</a>
      <br />
      <a href="/" >Back</a>
    </pre>

  )
}

export default AboutProject;