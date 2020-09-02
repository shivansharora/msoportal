import React, { useState, useEffect, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import Grid from "@material-ui/core/Grid";
import axios from "../../utils/axios1";
import "./PathologyReport.css";
import avtar from "../../assets/img/report1.png";
import { DirectUpload } from "@rails/activestorage";

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
      `direct-uploadss-${this.index}`
    );
    this.progressBar = document.getElementById(
      `direct-uploadss-progress-${this.index}`
    );
  }

  upload(file) {
    return new Promise((resolve, reject) => {
      this.uploadObj.create((error, blob) => {
        if (error) {
          this.progressElement.classList.add("direct-uploadss--error");
          this.progressElement.setAttribute("title", error);
          reject(error);
        } else {
          this.progressElement.classList.add("direct-uploadss--complete");
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("value", blob.signed_id);
          hiddenField.id = `pathologydocument_${this.index}`;
          document.getElementById("pathalogy").appendChild(hiddenField);
          resolve("Success");
        }
      });
    });
  }

  directUploadDidProgress(event) {
    this.progressBar.style.width = `${(100 * event.loaded) / event.total}%`;
  }

  directUploadWillStoreFileWithXHR(request) {
    this.progressElement.classList.remove("direct-uploadss--pending");
    request.upload.addEventListener("progress", (event) =>
      this.directUploadDidProgress(event)
    );
  }
}

const PathologyReport = (props) => {
  const { patientid, visitid ,handlePathologyCount } = props;
  const classes = useStyles();
  const [documents, setDocument] = useState([]);
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
              setList(response.data[0]);
              // console.log(response.data[0])
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

    const fetchDocument = () => {
      if (
        localStorage.getItem("jwt") !== "" ||
        localStorage.getItem("jwt") !== undefined
      ) {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios
          .get(`/get_patient_documents_by_visit_id/${patientid}/${visitid}`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (mounted) {
              setDocument(response.data);
              // console.log(response.data);
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
    fetchDocument();

    return () => {
      mounted = false;
    };
  }, []);

  const fileInput = createRef();
  const addProgressBar = (file, index, handler) => {
    handler.insertAdjacentHTML(
      "afterend",
      `<br/>
     <div id="direct-uploadss-${index}" class="direct-uploadss direct-uploadss--pending">
     <div id="direct-uploadss-progress-${index}" class="direct-uploadss__progress" 
     style="width: 0%"></div>
     <span class=direct-uploadss__filename">${file.name}</span>
     </div>`
    );
  };

  const handlePathologyFile = (formData) => {
    return new Promise((resolve, reject) => {
      const promises = [];
      for (let i = 0; i < fileInput.current.files.length; i++) {
        addProgressBar(fileInput.current.files[i], i, fileInput.current);
        promises.push(uploadFile(fileInput.current.files[i], i));
      }
      Promise.all(promises)
        .then(() => {
          var pathologyFiles = [];
          for (let i = 0; i < fileInput.current.files.length; i++) {
            pathologyFiles.push(
              document.getElementById(`pathologydocument_${i}`).value
            );
          }
          var pathologyReport = [];
          for (let i = 0; i < pathologyFiles.length; i++) {
            pathologyReport.push({
              documents: pathologyFiles[i],
              visit_id: visitid,
              document_type: list.key,
            });
            Object.keys(pathologyReport[i]).forEach((key) => {
              formData.append(
                `patient[patient_documents_attributes][${i}][${key}]`,
                pathologyReport[i][key]
              );
            });
          }

          // for (let pair of formData.entries()) {
          //   console.log(pair[0] + ": " + pair[1]);
          // }

          // console.log(pathologyReport);
        })
        .then(() => resolve("looped through all files!"))
        .catch((error) => reject(error));
    });
  };

  const uploadFile = (file, index) => {
    return new Promise((resolve, reject) => {
      const URL = "/rails/active_storage/direct_uploads";
      new Uploader(file, URL, index)
        .upload(file)
        .then((message) => resolve(message))
        .catch((error) => reject(error));
    });
  };

  const handle = (event) => {
    var formData = new FormData();

    handlePathologyFile(formData)
      .then((message) => {
        // console.log(patientid);
        if (
          localStorage.getItem("jwt") !== "" ||
          localStorage.getItem("jwt") !== undefined
        ) {
          let token = "Bearer " + localStorage.getItem("jwt");
          fetch(`/save_patient_documents/${patientid}`, {
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
                handlePathologyCount()
              } else {
                alert(data.error);
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
            <img src={avtar} style={{ height: 165 }} alt="document" />
            <div style={{ textAlign: "center", fontSize: 16, fontWeight: 500 }}>
              <label>Select Pathology Report</label>
            </div>
            <CardBody>
              <form id="pathalogy">
                <div className="fileUpload" style={{ marginLeft: 25 }}>
                  <input
                    type="file"
                    onChange={handle}
                    multiple={true}
                    className="upload"
                    ref={fileInput}
                  />
                  <span>Upload</span>
                </div>
                <br />
              </form>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PathologyReport;
