import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from 'react-router-dom';

import Card from '../../../components/Card/Card'
import CardAvatar from "../../../components/Card/CardAvatar";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import styles from "../../../assets/jss/material-dashboard-react/views/PromoCard";
import Custombuttons from '../../../components/CustomButtons/Button';
import GroupIcon from '@material-ui/icons/Group';


const useStyles = makeStyles(styles);
const FixedCard = (props) => {
  const { fixedpromo} = props;
  const classes = useStyles();
  return (
    <Card profile className={classes.card} >
      <h4 className={classes.cardTitleWhite}>Rs. {fixedpromo.discount} OFF</h4>
      <CardAvatar profile style={{ marginLeft: 80, margin: 'auto', boxShadow: 'none', borderRadius: 'unset', maxWidth: 98 }}>
        <a href="#pablo" onClick={e => e.preventDefault()}>
          <img src={fixedpromo.author.avatar} alt="..." />
        </a>
      </CardAvatar>
      <CardBody profile style={{ marginTop: -27 }}>
        <h6 className={classes.cardCategory}> {fixedpromo.title}
        </h6>
        <div className={classes.stats}>
          Start: {fixedpromo.start_datetime}
        </div> <br />
        <div className={classes.stats}>
          End: {fixedpromo.end_datetime}
        </div><br />

        <div className={classes.stats}>
          Status: {fixedpromo.status}
        </div><br />
        <div className={classes.stats} style={{ border: '2px dotted red', padding: 10, backgroundColor: 'beige' }}>
          Code: {fixedpromo.promo}
        </div><br />
        <div className={classes.stats} style={{ color: '#808E99', fontSize: 13 }}>
          <GroupIcon />12 People Used
            </div>
      </CardBody>
      <CardFooter>
        <Custombuttons
          style={{ marginLeft: 68, fontSize: '14px', marginTop: -15 }}
          component={RouterLink}
          to={`/edit_promocode/${fixedpromo.id}`}
        >Edit</Custombuttons>
      </CardFooter>
    </Card>
  );
}

export default FixedCard;