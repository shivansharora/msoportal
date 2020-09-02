import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import Grid from '@material-ui/core/Grid';
// import CustomInput from '../CustomInput/CustomInput';
// import SearchBar from '../SearchBar/SearchBar'; 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
// const handleFilter = () => {};
//   const handleSearch = () => {};

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow:1,
    backgroundColor: '#eaeaea',
    // width: 1020,
  },
  indicator: {
    backgroundColor: '#3daa99'
  }
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
       {/* <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      /> */}
      <AppBar position="static" color="default">
     
        <Tabs
          value={value}
          onChange={handleChange}
          style={{ color:'#3daa99' }}
          indicatorColor="primary"
          classes={{ indicator: classes.indicator }}
        //   textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Category 1" {...a11yProps(0)} />
          <Tab label="Category 2" {...a11yProps(1)} />
          <Tab label="Category 3" {...a11yProps(2)} />
          <Tab label="Category 4" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews 
        
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} >
      
         <Grid container spacing={2}>
        
        
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        
        </Grid> 
        
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
         <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        </Grid> 
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} >
        <DoctorCard/>
        </Grid>
        </Grid> 
        </TabPanel>
        
      </SwipeableViews>
    </div>
  );
}