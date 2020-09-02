import {
    successColor,
    whiteColor,
    grayColor,
    hexToRgb
  } from '../../material-dashboard-react';
  
  const PatientDetailView = theme => ({
    successText: {
      color: successColor[0]
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor:'#889192',
      color: theme.palette.text.secondary,
      color: 'aliceblue',
      fontSize: 'larger',
      fontWeight: 'bold'
    },
    upArrowCardCategory: {
      width: "16px",
      height: "16px"
    },
    stats: {
      color: '#352e2e',
      display: "inline-flex",
      fontSize: "14px",
      lineHeight: "26px",
      marginLeft:'-10px',
      "& svg": {
        top: "4px",
        width: "16px",
        height: "16px",
        position: "relative",
        marginRight: "3px",
        marginLeft: "3px"
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        top: "4px",
        fontSize: "16px",
        position: "relative",
        marginRight: "3px",
        marginLeft: "5px"
      }
    },
    cardCategory: {
      // color: grayColor[0],
      color: 'black',
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      paddingTop: "10px",
      fontWeight: 400,
      marginBottom: "0",
      // textShadow: '2px 2px 5px grey'
    },
    cardCategoryWhite: {
      color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitle: {
      color: grayColor[2],
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    cardTitleWhite: {
      color: whiteColor,
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    card: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)',
        // marginTop:'110px'
        // marginLeft:'-10px',
        paddingRight:'3px',
        textAlign:'unset',
        backgroundColor:'#fbfafa',
        marginLeft:'6px',
        marginTop:'55px'
    }
  });
  
  export default PatientDetailView;
  