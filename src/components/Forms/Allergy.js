import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import CardFooter from "../../components/Card/CardFooter";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import "./CurrentMedication.css";
import axios from "../../utils/axios1";
import Button from "../CustomButtons/Button";
import { Link as RouterLink } from "react-router-dom";
import baseUrl from '../../utils/baseUrl'
import {
  Grid,
  TextField,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import '../../components/toast.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "17px",
  },
  container: {
    marginTop: theme.spacing(3),
  },
  danger: {
    color: "brown",
    marginTop: 4,
    fontSize: 15,
  },
}));

const Allergy = (props) => {
  const [allergy, setAllergy] = useState([]);

  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      allergies: [
        {
          id: "",
          observation: "",
        },
      ],
    },
  });

  const {
    fields: allergiesFields,
    append: allergiesAppend,
    prepend: allergiesPrepend,
    remove: allergiesRemove,
  } = useFieldArray({ control, name: "allergies" });

  const addExistingAllergy = (item) => {
    allergiesPrepend({
      id: item.attributes.id,
      observation: item.attributes.observation,
    });
  };

  useEffect(() => {
    if (allergy.length !== 0) {
      const timer = setTimeout(
        () => allergy.forEach((item) => addExistingAllergy(item)),
        10
      );
      return () => clearTimeout(timer);
    }
  }, [allergy]);

  useEffect(() => {
    let mounted = true;
    const fetchCurrentMedication = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(
            `get_patient_allergies_by_patient_id/${props.match.params.id}`,
            { headers: { Authorization: token } }
          )
          .then((response) => {
            if (mounted) {
              setAllergy(response.data.data);
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

    fetchCurrentMedication();

    return () => {
      mounted = false;
    };
  }, []);


  const onSubmit = (data) => {
    var formData = new FormData();

      for (let i = 0; i < data.allergies.length; i++) {
      if (data.allergies[i].id === "" || isNaN(data.allergies[i].id)) {
        delete data.allergies[i].id;
      }
      if (data.allergies[i].observation === "") {
        alert("Please Enter Observation");
        return false;
      }
      Object.keys(data.allergies[i]).forEach((key) => {
        formData.append(
          `patient[patient_allergies_attributes][${i}][${key}]`,
          data.allergies[i][key]
        );
      });
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    if (
      localStorage.getItem("jwt") !== "" ||
      localStorage.getItem("jwt") !== undefined
    ) {
      let token = "Bearer " + localStorage.getItem("jwt");
      fetch(`${baseUrl}/save_patient_allergies/${props.match.params.id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      }).then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            toast(<p>{data.message}</p>, {
              className: 'custom',
              autoClose:1000
            });
            setTimeout(()=> {
              props.history.push(`/patient_list/${props.match.params.id}/${props.match.params.type}`);
            }, 1000);
          } else {
            toast.error(<p>{data.error}</p>,{autoClose:3000}) 
          }
        });
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={9}>
          <Card style={{ marginTop: "23px" }}>
            <CardHeader
              style={{ width: "147px", padding: "14px" }}
              color="success"
            >
              <h4 className={classes.cardTitleWhite}>Allergy</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12} sm={12} md={12}>
                  <table className="crud" id="tab_logic">
                    <thead>
                      <tr>
                      </tr>
                    </thead>
                    <tbody>
                      {allergiesFields.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td style={{ display: "none" }}>
                              <Controller
                                as={<input />}
                                name={`allergies[${index}].id`}
                                control={control}
                                defaultValue={item.id}
                                type="hidden"
                              />
                            </td>
                            <td>
                               <Controller
                                as={<TextField />}
                                error={Boolean(errors.observation)}
                                name={`allergies[${index}].observation`}
                                control={control}
                                defaultValue={item.observation}
                                multiline
                                rowsMax="4"
                                label="Observation"
                                type="text"
                                fullWidth
                              />
                            </td>
                            <td>
                              {!item.id || isNaN(item.id)? 
                              <HighlightOffIcon
                              className={classes.icon}
                              onClick={() => allergiesRemove(index)}
                            /> :null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <section>
                    <AddCircleIcon
                      onClick={() => {
                        allergiesAppend({
                          observation: "",
                        });
                      }}
                    />
                  </section>
                </Grid>
                <CardFooter style={{ float: "right" }}>
                  <Button style={{ width: 72 }} type="submit">
                    Submit
                  </Button>
                  <Button
                    style={{ width: 72 }}
                    component={RouterLink}
                    to={`/patient_list/${props.match.params.id}/${props.match.params.type}`}
                  >
                    Cancel
                  </Button>
                  <ToastContainer/>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Allergy;
