import React, { useState, useEffect, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import Grid from "@material-ui/core/Grid";
import axios from "../../utils/axios1";
import "./RadiologyReport.css";
import { DirectUpload } from "@rails/activestorage";
import baseUrl from '../../utils/baseUrl'

import '../../assets/css/toast.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import avtar from "../../assets/img/radio.png";

const styles = (theme) => ({
  root: {
    padding: "16px",
  },
});
const useStyles = makeStyles(styles);

class Uploader {
  constructor(file, url, index) {
    this.file = file;
    this.url = url;
    this.index = index;
    this.uploadObj = new DirectUpload(this.file, this.url, this);
    this.progressElement = document.getElementById(
      `direct-uploads-${this.index}`
    );
    this.progressBar = document.getElementById(
      `direct-uploads-progress-${this.index}`
    );
  }

  uploads(file) {
    return new Promise((resolve, reject) => {
      this.uploadObj.create((error, blob) => {
        if (error) {
          this.progressElement.classList.add("direct-uploads--error");
          this.progressElement.setAttribute("title", error);
          reject(error);
        } else {
          this.progressElement.classList.add("direct-uploads--complete");
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("value", blob.signed_id);
          hiddenField.id = `radiodocument_${this.index}`;
          document.getElementById("radio").appendChild(hiddenField);
          resolve("Success");
        }
      });
    });
  }

  directUploadDidProgress(event) {
    this.progressBar.style.width = `${(100 * event.loaded) / event.total}%`;
  }

  directUploadWillStoreFileWithXHR(request) {
    this.progressElement.classList.remove("direct-uploads--pending");
    request.upload.addEventListener("progress", (event) =>
      this.directUploadDidProgress(event)
    );
  }
}

const RadiologyReport = (props) => {
  const { patientid, visitid,handleRadioCount } = props;
  const classes = useStyles();
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchDocumentTitle = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/get_patient_document_type_list`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setList(response.data[1]);
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

    fetchDocumentTitle();

    return () => {
      mounted = false;
    };
  }, []);

  const radioInputFile = createRef();
  const addProgressBar = (file, index, handler) => {
    handler.insertAdjacentHTML(
      "afterend",
      `<br/>
     <div id="direct-uploads-${index}" class="direct-uploads direct-uploads--pending">
     <div id="direct-uploads-progress-${index}" class="direct-uploads__progress" 
     style="width: 0%"></div>
     <span class=direct-uploads__filename">${file.name}</span>
     </div>`
    );
  };

  const handleRadioFile = (formData) => {
    return new Promise((resolve, reject) => {
      const promises = [];
      for (let i = 0; i < radioInputFile.current.files.length; i++) {
        addProgressBar(
          radioInputFile.current.files[i],
          i,
          radioInputFile.current
        );
        promises.push(uploadFiles(radioInputFile.current.files[i], i));
      }
      Promise.all(promises)
        .then(() => {
          var radioFiles = [];
          for (let i = 0; i < radioInputFile.current.files.length; i++) {
            radioFiles.push(
              document.getElementById(`radiodocument_${i}`).value
            );
          }
          var radioReport = [];
          for (let i = 0; i < radioFiles.length; i++) {
            radioReport.push({
              documents: radioFiles[i],
              visit_id: visitid,
              document_type: list.key,
            });
            Object.keys(radioReport[i]).forEach((key) => {
              formData.append(
                `patient[patient_documents_attributes][${i}][${key}]`,
                radioReport[i][key]
              );
            });
          }

          // for (let pair of formData.entries()) {
          //   console.log(pair[0] + ": " + pair[1]);
          // }

          // console.log(radioReport);
        })
        .then(() => resolve("looped through all files!"))
        .catch((error) => reject(error));
    });
  };

  const uploadFiles = (file, index) => {
    return new Promise((resolve, reject) => {
      const URL = `${baseUrl}/rails/active_storage/direct_uploads`;
      new Uploader(file, URL, index)
        .uploads(file)
        .then((message) => resolve(message))
        .catch((error) => reject(error));
    });
  };

  const handle = (event) => {
    var formData = new FormData();

    handleRadioFile(formData)
      .then((message) => {
        // console.log(patientid);
        if (
          localStorage.getItem("jwt") !== "" ||
          localStorage.getItem("jwt") !== undefined
        ) {
          let token = "Bearer " + localStorage.getItem("jwt");
          fetch(`${baseUrl}/save_patient_documents/${patientid}`, {
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
                handleRadioCount()
              } else {
                toast.error(<p>{data.error}</p>,{autoClose:3000}) 
              }
            });
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={classes.root} style={{ marginTop: "-20px" }}>
      <Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            style={{
              marginTop: "14px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)",
            }}
          >
            <img
              src={avtar}
              style={{ height: 165, width: "208px", margin: "0 auto" }}
              alt="document"
            />
            <div style={{ textAlign: "center", fontSize: 16, fontWeight: 500 }}>
              <label>Select Radiology Report</label>
            </div>
            <CardBody>
              <form id="radio">
                <div className="fileUpload" style={{ marginLeft: 25 }}>
                  <input
                    type="file"
                    onChange={handle}
                    multiple={true}
                    className="upload"
                    ref={radioInputFile}
                  />
                  <span>Upload</span>
                </div>
                <ToastContainer/>
                <br />
              </form>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RadiologyReport;
