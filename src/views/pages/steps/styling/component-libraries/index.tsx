import Antd from './antd';
import MaterialUI from './material-ui';
import { StyleSheet, css } from 'aphrodite';
import { Button } from '@material-ui/core';

const libsList = [['React Bootstrap', 'https://github.com/react-bootstrap/react-bootstrap'],
['Blueprint', 'https://github.com/palantir/blueprint'],
['Reactstrap', 'https://github.com/reactstrap/reactstrap'],
['Grommet', 'https://github.com/grommet/grommet'],
['Semantic UI React', 'https://github.com/Semantic-Org/Semantic-UI-React'],
['Evergreen', 'https://github.com/segmentio/evergreen'],
['Rebass', 'https://github.com/rebassjs/rebass'],
['PrimeReact', 'https://github.com/primefaces/primereact'],
];

const ComponentLibraries = () => {
  return (
    <div className={css(styles.container)} >
      <pre>{`
      but it'd way easier and faster if we use component libraries and UI Kits to build a React app.
      here we list the top 10 in use:
      `}
      </pre>
      <MaterialUI />
      <br />
      <Antd />
      <br />
      <p>and you may want to check: </p>
      {libsList.map(x => (
        <p key={x[0]}>
          <a href={x[1]} target="_blank" >{x[0]}</a>
        </p>
      ))}
      <Button variant="contained" color="primary" href="js-styling">Back</Button>
    </div>
  )
}

export default ComponentLibraries;


const styles = StyleSheet.create({
  container: {
    maxWidth: 1100,
    margin: '0 auto',
  }
});