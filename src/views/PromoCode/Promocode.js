import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "../../utils/axios1";
import HistoryIcon from '@material-ui/icons/History';
import PercentageCard from "../PromoCode/PercentageCard/PercentageCard";
import RedeemIcon from "@material-ui/icons/Redeem";
import { Link as RouterLink } from "react-router-dom";
import HistoryModal from '../PromoCode/History/History'

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "#3cb0b3",
  },
  root: {
    padding: "26px",
  },

}));

const PromoCode = (props) => {
  const classes = useStyles();

  const [promo, setPromo] = useState([]);
  const [pricingModalOpen, setPricingModalOpen] = React.useState(false);
  
  const handlePricingOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingClose = () => {
    setPricingModalOpen(false);
  };


  useEffect(() => {
    let mounted = true;

    const fetchPromo = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get("/get_active_promo_code  ", {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              if(response.data.data !== null){
                setPromo(response.data.data);

              }
            }
          })
          .catch((error) => {
            if (error.response.data !== "") {
              alert(error.response.data.error);
            } else {
              alert(error.response.statusText);
            }
          });
      }
    };

    fetchPromo();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={classes.root} style={{ marginTop: "15px" }}>
      <Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              className={classes.filterButton}
              style={{ float: "right" }}
              color="primary"
              size="small"
              variant="outlined"
              component={RouterLink}
              to="/create_promocode"
            >
              <RedeemIcon className={classes.filterIcon} /> Create Promo Code
            </Button>
            <Button
              className={classes.filterButton}
              style={{ float: "right",marginRight:9 }}
              color="primary"
              size="small"
              variant="outlined"
              onClick={handlePricingOpen}
            >
              <HistoryIcon className={classes.filterIcon} /> Promo Code History
            </Button>
          </Grid>        

            <Grid item  md={3}  sm={3} xs={12}>
              <PercentageCard promo ={promo} />
            </Grid>
          
        </Grid>
      </Grid>
      {promo.attributes !==undefined ?
      <HistoryModal
        onClose={handlePricingClose}
        open={pricingModalOpen}
        promoId={promo.attributes.id}
      />:null}
       
    </div>
  );
};
export default PromoCode;
