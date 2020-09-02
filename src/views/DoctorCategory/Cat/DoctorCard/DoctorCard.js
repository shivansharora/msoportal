import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StarIcon from '@material-ui/icons/Star';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Link as RouterLink } from 'react-router-dom';

import Card from '../../../../components/Card/Card'
import CardAvatar from "../../../../components/Card/CardAvatar";
import CardBody from "../../../../components/Card/CardBody";
import CardFooter from "../../../../components/Card/CardFooter";
import avatar from '../../../../assets/img/mask2.png';
import styles from "../../../../assets/jss/material-dashboard-react/views/doctorCategory";
import Custombuttons from '../../../../components/CustomButtons/Button';

const useStyles = makeStyles(styles);
const DoctorCard = (props) => {
  const { doctor } = props;
  const classes = useStyles();
  return (
    <Card profile className={classes.card} >
      <CardAvatar profile>
        <a href="#pablo" onClick={e => e.preventDefault()}>
          <img src={avatar} alt="..." />
        </a>
      </CardAvatar>
      <CardBody profile>
        <h6 className={classes.cardCategory}>Dr. {doctor.attributes.name}({doctor.attributes.designation})
        </h6>
        <div className={classes.stats}>
          <WorkIcon />{doctor.attributes.work_experience} yeaars of experience
        </div> <br />
        <div className={classes.stats}>
          <AccountBalanceWalletIcon />Rs {doctor.attributes.fee}
        </div><br />

        <div className={classes.stats}>
          <ScheduleIcon />Consultation Time :11 A.M
        </div><br />
        <div className={classes.stats}>
          <StarIcon style={{ backgroundColor: '#FF9529' }} />4.5/5
        </div><br />
      </CardBody>
      <CardFooter>
        <Custombuttons
          style={{ padding: '8px 3px', fontSize: '14px' }}
          component={RouterLink}
          to="book_appointment"
        >Book Appointment</Custombuttons>
        <Custombuttons
          style={{ padding: '8px 17px', fontSize: '14px' }}
          component={RouterLink}
          to={`/doctor_category/${doctor.id}`}
        >View Bio</Custombuttons>
      </CardFooter>
    </Card>
  );
}

export default DoctorCard;