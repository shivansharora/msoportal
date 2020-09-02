
import React, { Suspense, useState,useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import axios from '../../utils/axios1'
import { NavBar} from './components';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto',
    padding:'0px'
  }
}));

const Dashboard = props => {
  const { route } = props;

  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);
 

  useEffect(()=>{
    if (localStorage.getItem("jwt") === '' || localStorage.getItem("jwt") === null) {
      props.history.push("/auth/login");
    }


    if (localStorage.getItem("jwt") !== '' || localStorage.getItem("jwt") !== undefined) {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios.get('/is_valid_jwt', { headers: { Authorization: token } }).then(response => {
          // console.log(response.data)
      }).catch(error => {
        if (error.response.data !== "") {
          alert(error.response.data.error);
          if(error.response.status = '401'){
            localStorage.clear();
            props.history.push("/auth/login");
          }
        } else {
          alert(error.response.statusText);
        }
      });
    }

  })
  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };
  


  return (
  
  <div className={classes.root}>
  <div className={classes.container}>
    <NavBar
      className={classes.navBar}
      onMobileClose={handleNavBarMobileClose}
      openMobile={openNavBarMobile}
      // key="nav"
    />
    <main style={{ marginTop:'54px' }} className={classes.content}>
      <Suspense fallback={<LinearProgress />}>
        {renderRoutes(route.routes)}
      </Suspense>
    </main>
  </div>
</div>
  
  );
};

Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;
