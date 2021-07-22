import Highlight from '../../../../components/view/highlight';

const RouterStep = () => {
  return (
    <>
      <p>look! the url is changed!</p>
      <p>to build a proper React app we need a way to handle the routes and control the screen to show based on the route, <a href="https://reactrouter.com/">React Router</a> made one! (and there are more...)</p>
      <p>in the previous step we made <a href="https://github.com/aronmi/preactice/commit/60cdbd378e2d49f7d9875e75791d9b54f3b8ca2f" target="_blank">these changes</a> and added react router to the project, the core code is :</p>
      <Highlight>
        {`<BrowserRouter> <Switch> <Route path="/step/router"><RouterStep/></Route> <Route path="/"><InitStep/></Route> </Switch> </BrowserRouter>`}
      </Highlight>
      <p>the source code ? <a href="https://github.com/aronmi/preactice/tree/60cdbd378e2d49f7d9875e75791d9b54f3b8ca2f">here!</a></p>
      <p>learn more at <a href="https://reactrouter.com/web/guides/quick-start">React Router</a></p>
      <br />
      <a href="/step/about-reactick" >Back</a>
    </>

  )
}

export default RouterStep;