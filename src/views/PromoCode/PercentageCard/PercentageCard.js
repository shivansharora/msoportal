import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import Card from '../../../components/Card/Card'
import CardAvatar from "../../../components/Card/CardAvatar";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import styles from "../../../assets/jss/material-dashboard-react/views/PromoCard";
import Custombuttons from '../../../components/CustomButtons/Button';
import GroupIcon from '@material-ui/icons/Group';
import avatar from '../../../assets/img/chikitsamitra.png'

const useStyles = makeStyles(styles);
const PercentageCard = (props) => {
  const { promo } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      {promo !== null  ?
    <Card profile className={classes.card} >
       {promo.attributes !== undefined ?
       <React.Fragment>
      <h4 className={classes.cardTitleWhite}>{promo.attributes.discount}% OFF</h4>
       
      <CardAvatar profile style={{ marginLeft: 80, margin: 'auto', boxShadow: 'none', borderRadius: 'unset', maxWidth: 98 }}>
        <a href="#pablo" onClick={e => e.preventDefault()}>
          <img src={avatar} alt="..." />
        </a>
      </CardAvatar>
      <CardBody profile style={{ marginTop: -27 }}>
        <h6 className={classes.cardCategory} style={{ fontWeight:700 }}> {promo.attributes.title}
        </h6>
        <br/>
        <div className={classes.stats}>
          <Typography style={{ fontWeight:500 }}>Start:</Typography>
          <Typography>{promo.attributes.start_datetime}</Typography>
        </div>
        <br />
        <div className={classes.stats}>
        <Typography style={{ fontWeight:500 }}>End:</Typography>
          <Typography>{promo.attributes.end_datetime}</Typography> 
        </div>
        <br />
        <div className={classes.stats}>
        <Typography style={{ fontWeight:500 }}>Max Usage: </Typography>
          <Typography>{promo.attributes.max_usage}</Typography> 
        </div>
        <br />
        <br/>
        <div className={classes.stats} style={{ border: '2px dotted red', padding: 10, backgroundColor: 'beige' }}>
          Code: {promo.attributes.code}
        </div>
        <br />
        <div className={classes.stats} style={{ color: '#808E99', fontSize: 13 }}>
          <GroupIcon />{promo.attributes.used_count} People Used
        </div>
        <br/>
        {promo.attributes.is_approved === 0 ?
        <div className={classes.stats} style={{ color: 'red', fontSize: 16 }}>
          Unapproved
        </div>
        :
        <div className={classes.stats} style={{ color: 'green', fontSize: 16 }}>
        Approved
        </div>
        }
      </CardBody>
      {promo.attributes.is_approved === 0 ?
      <CardFooter>
        <Custombuttons
          style={{ marginLeft: 68, fontSize: '14px', marginTop: -15 }}
          component={RouterLink}
          to={`/edit_promocode/${promo.attributes.id}`}
        >Edit</Custombuttons>
      </CardFooter>:null}
      </React.Fragment>:null}
    </Card>:null
      }
    </React.Fragment>
  );
}

export default PercentageCard;