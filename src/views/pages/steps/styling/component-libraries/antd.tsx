/** @jsxImportSource @emotion/react */
import { Collapse } from 'antd';
import { jsx, css, keyframes } from '@emotion/react';

const { Panel } = Collapse;

const Antd = () => {
  return (
    <Collapse css={styles.collapse} >
      <Panel header="Ant Design" key="1" css={styles.panel} >
        <p >{`this panel is made using `}<a href="https://ant.design/" target="_blank">Ant Design</a></p>
      </Panel>
    </Collapse>
  )
}

const styles = {
  collapse: css`
    background-color: #4a4a8869;
    text-align: left;
    color: white;
    & .ant-collapse-header {
      color : white !important;
    }
    `,
  panel: css`
    background-color: #4a4a8869;
    & * {
    background-color: #4a4a8869;
    }
    `
}

export default Antd;