
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from '@material-ui/core/Grid';

import CustomInput from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButtons/Button';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardIcon from '../../components/Card/CardIcon';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';
import CardAvatar from '../../components/Card/CardAvatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import avatar from "../../assets/img/patient.png";

import DateRangeIcon from '@material-ui/icons/DateRange';
import WcIcon from '@material-ui/icons/Wc';
import TodayIcon from '@material-ui/icons/Today';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import ContactlessIcon from '@material-ui/icons/Contactless';
import EmailIcon from '@material-ui/icons/Email';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';




const styles = theme => ({
    root: {
        padding: '16px'

    }
});
const useStyles = makeStyles(styles);

const ChangePassword = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} style={{ marginTop: '3px' }} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9} md={9} >
                    <Card >
                        <CardBody>
                            <form >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} >
                                        <CustomInput
                                            required
                                            inputProps={{
                                                autoFocus: true
                                            }}
                                            id="fullName"
                                            name="fullName"
                                            label="First name"
                                            value="Raj Kumar"
                                            inputProps={{
                                                disabled: true
                                            }}
                                        // value={values.fullName}
                                        // changed={handleFieldChange}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} >
                                        <CustomInput
                                            required
                                            id="mobile"
                                            name="mobile"
                                            label="Mobile"
                                            value="7017483927"
                                        // value={values.mobile}
                                        // changed={handleFieldChange}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} >
                                        <CustomInput
                                            required
                                            id="email"
                                            name="email"
                                            label="Email"
                                            value="arorashivansh@gmail.com"
                                        // value={values.email}
                                        // changed={handleFieldChange}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} >
                                        <CustomInput
                                            required
                                            id="age"
                                            name="age"
                                            label="Age"
                                            value="27"
                                        // value={values.mobile}
                                        // changed={handleFieldChange}

                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </CardBody>
                    </Card>
                </Grid>
                
            </Grid>
        </div>
    );
};

export default ChangePassword;