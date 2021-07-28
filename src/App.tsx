import { useEffect, useState } from 'react';
import Routes from './views/routes';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import 'bootstrap/dist/css/bootstrap.css'
import { ThemeProvider } from '@material-ui/core';
import { appTheme } from './layout/theme/theme';
import { Config } from './core/services/config/config.service';
import { wait } from './core/utils/js-utils';

function App() {
  const [remaining, $remaining] = useState<number>(1);
  useEffect(() => {
    Config.instance.load().then(_ => {
      wait(1).then(() => $remaining(rem => rem - 1));
    });
  }, []);

  return (
    (remaining > 0) ?
      <span>loading...</span>
      :
      <ThemeProvider theme={appTheme}>
        <Routes />
      </ThemeProvider>
  )
}

export default App;
