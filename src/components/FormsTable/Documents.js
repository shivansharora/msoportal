import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "../../utils/axios1";
import Fab from "@material-ui/core/Fab";
import PathologyReport from "../Forms/PathologyReport";
import RadioReport from "../Forms/RadiologyReport";
import Document from "../Forms/DocumentUpload";
import baseUrl from '../../utils/baseUrl'

import {
  TableContainer,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const styles = (theme) => ({
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  icon: {
    cursor: "pointer",
  },
  fab: {
    margin: 2,
    backgroundColor: "#66a668",
    width: 50,
    height: 42,
  },
});

const useStyles = makeStyles(styles);

const Documents = (props) => {
  const classes = useStyles();
  const { patient } = props;
  const [documents, setDocument] = useState([]);
  const [count , setCount] = useState(0)
  const [pathologyCount , setPathologyCount] = useState(0)
  const [radioCount , setRadioCount] = useState(0)

  // console.log(patient.attributes.id)
  useEffect(() => {
    let mounted = true;
    const fetchDocument = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(
            `/get_patient_documents_by_visit_id/${patient.attributes.id}/${patient.attributes.last_visit_id}`,
            { headers: { Authorization: token } }
          )
          .then((response) => {
            if (mounted) {
              setDocument(response.data.data);
              // console.log(response.data.data);
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

    fetchDocument();

    return () => {
      mounted = false;
    };
  }, [patient.attributes.id, patient.attributes.last_visit_id,count,radioCount,pathologyCount]);

  useEffect(()=>{
console.log(documents)
  },[documents])

  const handleCount = ()=>{
    setCount(count +1)
   
  }
  const handleRadioCount = ()=>{
    setRadioCount(radioCount +1)
   
  }

  const handlePathologyCount = ()=>{
    setPathologyCount(pathologyCount +1)
   
  }
  const deleteDocument = (id) => {
    // console.log(documents);
    // console.log(id);
    const document_data = {
      id: id,
      _destroy: "1",
    };
    var formData = new FormData();

    Object.keys(document_data).forEach((key) => {
      formData.append(
        `patient[patient_documents_attributes][0][${key}]`,
        document_data[key]
      );
    });

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    if (window.confirm("Do you want to Delete this document ?")) {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        fetch(`${baseUrl}/save_patient_documents/${patient.attributes.id}`, {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: formData,
        }).then((response) => {
          response.json().then((data) => {
            // console.log(response.status);
            if (response.status === 200) {
              alert(data.message);
              const newArray = documents.filter(function(el) {
                return el.attributes.id !== id;
              });
              // console.log(newArray);
              setDocument(newArray);
            } else {
              alert(data.error);
            }
          });
        });
      }
    }
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <Document
            patientid={patient.attributes.id}
            handleCount={handleCount}
            visitid={patient.attributes.last_visit_id}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <PathologyReport
            patientid={patient.attributes.id}
            visitid={patient.attributes.last_visit_id}
            handlePathologyCount={handlePathologyCount}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <RadioReport
            patientid={patient.attributes.id}
            visitid={patient.attributes.last_visit_id}
            handleRadioCount={handleRadioCount}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            style={{
              marginTop: "8px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)",
            }}
          >
            <CardHeader
              style={{ width: "85px", padding: "7px", marginTop: "-17px" }}
              color="success"
            >
              <h4 className={classes.cardTitleWhite}>Documents</h4>
            </CardHeader>
            <CardBody>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <StyledTableRow>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Document Type
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Document
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "#6a7075", color: "white" }}
                      >
                        Action
                      </TableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {documents.map((doc) => (
                      <StyledTableRow hover key={doc.id}>
                        <TableCell>{doc.attributes.document_type}</TableCell>
                        <TableCell>
                          <a
                            href={doc.attributes.document}
                            target="_blank"
                            rel=""
                          >
                            view
                          </a>
                        </TableCell>
                        <TableCell>
                          <Link
                            color="inherit"
                            // onClick={handleEditOpen}
                            onClick={() => deleteDocument(doc.attributes.id)}
                            variant="h6"
                          >
                            <Tooltip
                              title="Delete Document"
                              aria-label="Delete Document"
                            >
                              <Fab className={classes.fab}>
                                <DeleteIcon />
                              </Fab>
                            </Tooltip>
                          </Link>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Documents;
