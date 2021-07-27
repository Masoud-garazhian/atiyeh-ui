import Routes from './views/routes';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import 'bootstrap/dist/css/bootstrap.css'
import { ThemeProvider } from '@material-ui/core';
import { appTheme } from './layout/theme/theme';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App;
