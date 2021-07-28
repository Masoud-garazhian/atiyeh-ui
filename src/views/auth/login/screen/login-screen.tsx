
import React, { Component, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { forcePatternInput } from '../../../../core/utils/input-utils';
import { LoginService } from '../services/login.service';
import { OtpKey } from '../../../../core/data/enum/otp-key.enum';
import { IServerOTP } from '../../../../core/models/data/server-otp.model';
import { RegisterService } from '../../register/service/register.service';
import sha1 from 'sha1';
import { useHistory } from 'react-router-dom';


export interface InitStepProps {

}

const LoginScreen: React.FC<InitStepProps> = props => {
  const classes = useStyles();
  const [phoneNo, $phoneNo] = useState<string>('');
  const [serverOtp, $serverOtp] = useState<IServerOTP | undefined>(undefined);
  const [otp, $otp] = useState<string>('');
  const [message, $message] = useState<string>('');
  const history = useHistory();

  const handleSubmitClick = () => {
    if (serverOtp) {
      const encOtp = sha1(otp);
      if (serverOtp.otpKey === OtpKey.register) {
        RegisterService.instance.registerByPhone(phoneNo, encOtp).then(x => {
          history.push('step/about-project'); //todo : change to register 
        }, error => {
          $message(error);
        })
      }
      else if (serverOtp.otpKey === OtpKey.login) {
        LoginService.instance.login(phoneNo, encOtp).then(x => {
          history.push('/step/router'); //todo : change to home 
        }, error => {
          $message(error);
        })
      }
    } else {
      LoginService.instance.submitPhone(phoneNo).then(x => {
        $serverOtp(x);
      }, error => {
        $message(error);
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ورود به سامانه
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                {...forcePatternInput(/[0-9]/)}
                fullWidth
                value={phoneNo}
                onChange={x => $phoneNo(x.target.value)}
                label="شماره تلفن"
                autoComplete="phoneNo"
              />
            </Grid>
            {serverOtp &&
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  {...forcePatternInput(/[0-9]/)}
                  fullWidth
                  value={otp}
                  onChange={x => $otp(x.target.value)}
                  label="یکبار رمز"
                  autoComplete="off"
                />
              </Grid>
            }
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitClick}
          >
            دریافت کد
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                درحال حاضر دارای اکانت هستم. ورود
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Todo: change this :D
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default LoginScreen;


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));