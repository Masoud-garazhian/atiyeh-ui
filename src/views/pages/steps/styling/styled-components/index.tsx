/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import { jsx, css, keyframes } from '@emotion/react';
import { createUseStyles } from 'react-jss';
import { StyleSheet, css as aphCss } from 'aphrodite';


const StyledComponents = () => {
  const jssClasses = jssCss();

  return (
    <pre>
      <p>Styling in react can be done in different ways.</p>
      <p>appart from className property which <a href="https://reactjs.org/docs/faq-styling.html" target="_blank">React docs</a> explains, there are some useful libraries you need to check!</p>
      <StyledP>this paragraph is styled by <a href="https://github.com/styled-components/styled-components">Styled Components</a>!</StyledP>
      <p css={emotionCss} >and this paragraph by <a css={emotionCss} href="https://github.com/emotion-js/emotion">Emotion JS</a>!</p>
      <p className={jssClasses.borderedP}>and this one by <a href="https://cssinjs.org/?v=v10.7.1">JSS</a>!</p>
      <p><span className={aphCss(aphStyles.highlight)}>and the last paragraph by <a href="https://github.com/Khan/aphrodite">Aphrodite</a>!
      </span></p>
      <br />
      <p>you may also want to check <a href="https://reactcommunity.org/react-transition-group/">React Transition Group</a>
        , <a href="https://github.com/chenglou/react-motion">React motion</a>
        &nbsp;and <a href="https://github.com/pmndrs/react-spring">React Spring</a> for animations in React!
      </p>
      <p>{`<>`}<a href="https://github.com/aronmi/preactice/tree/05f4a4f53f364e5bc1071dc590f4f0dda0859aef">this code</a> and <a href="https://github.com/aronmi/preactice/commit/05f4a4f53f364e5bc1071dc590f4f0dda0859aef">the changes</a>{`</>`}</p>
      <a href="/step/styling/component-libs">Next</a>
      <br /><a href="/step/patterns/lazy">Back</a>
    </pre>
  )
}

const StyledP = styled.p`
      background-color: rgba(3,1,5,0.5);
      padding: 20px;
      margin:20px;
      border:1px dashed white;
      `;

const bounce = keyframes`
      from, 20%, 53%, 80%, to {transform: translate3d(0,0,0); }
      40%, 43% {transform: translate3d(0, -10px, 0); }
      70% {transform: translate3d(0, -5px, 0); }
      90% {transform: translate3d(0,-2px,0); }
      `
const emotionCss = [css`animation: ${bounce} 2s ease infinite`, css`padding - top: 30px`];

const jssCss = createUseStyles({
  borderedP: {
    border: '1px solid white',
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px',
  }
});

const aphStyles = StyleSheet.create({
  highlight: {
    backgroundColor: 'rgba(64,101,121,0.5)',
    padding: '10px',
    marginBottom: '10px',
    borderLeft: '1px solid white',
  },
});

export default StyledComponents;