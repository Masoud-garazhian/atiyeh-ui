import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Highlight from '../../../../../components/view/highlight';


const MaterialUI = () => {
  const classes = useStyles();

  return (
    <div>
      <Accordion className={classes.adWrapper}>
        <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor="white" />} >
          <Typography className={classes.heading}>Material UI</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.body}>
            this accordion is made using <a href="https://material-ui.com/">material-ui</a> Accordion component with this code :
            <Highlight>{`
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={classes.heading}>Material UI</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.body}>
            this accordion is made by material-ui <Accordion/> component with this code :
            ...
          </Typography>
        </AccordionDetails>
      </Accordion>
    `}</Highlight>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )

}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    adWrapper: { backgroundColor: '#4a4a8869' },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      color: 'white',
    },
    body: { width: '100%' }
  }),
);

export default MaterialUI;