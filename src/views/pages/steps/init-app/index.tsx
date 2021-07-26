
import React,{ Component } from 'react';
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




export interface InitStepProps {
  
}
 
export interface InitStepState {
  
}
 
class InitStep extends React.Component<InitStepProps, InitStepState> {
  state = { isActiveOtp : false  }
   useStyles = makeStyles((theme) => ({
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
  classes = this.useStyles();

   renderOtpTextfield = () =>
    this.state.isActiveOtp ? "block" :"none";

  render() {  
    return (
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.classes.paper}>
          <Avatar className={this.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ورود به سامانه
          </Typography>
          <form className={this.classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="MobileNo"
                  label="شماره تلفن"
                  name="MobileNo"
                  autoComplete="tel"
                />
              </Grid>            
              <Grid item xs={12}>
              {/* <Box component="div" display={this.renderOtpTextfield}>  */}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="OtpCode"
                  label="کد دریافتی"
                  name="OtpCode"
                  autoComplete="tel"
                />
                {/* </Box> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.classes.submit}
              onClick={() => { alert('clicked') }}
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
export default InitStep;




