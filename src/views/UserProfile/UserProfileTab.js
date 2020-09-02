import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserProfile from './UserProfile'
import ChangePassword from './ChangePassword'

const styles = (theme) => ({
  root: {
    // padding: "16px",
  },
});
const useStyles = makeStyles(styles);

const UserProfileTab = () => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ marginTop: "36px" }}>
        <Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CustomTabs
              headerColor="success"
              tabs={[
                {
                  tabName: "User Profile",
                  tabIcon: AccountCircleIcon,
                  tabContent: (
                    <React.Fragment>
                        <div>
                  <UserProfile />
                        </div>
                    </React.Fragment>
                  ),
                },
                {
                  tabName: "Change Password",
                  tabIcon: LockOpenIcon,
                  tabContent: (
                    <React.Fragment>            
                        <div>
                       <ChangePassword />
                        </div>
                    </React.Fragment>
                  ),
                },
              ]}
            />
          </Grid>
        </Grid>
    </div>
  );
};

export default UserProfileTab;
