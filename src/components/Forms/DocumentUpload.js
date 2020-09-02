import React, { useState, useEffect, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import Grid from "@material-ui/core/Grid";
import axios from "../../utils/axios1";
import "./Document.css";
import { DirectUpload } from "@rails/activestorage";
import avtar from "../../assets/img/document1.png";

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
      `direct-upload-${this.index}`
    );
    this.progressBar = document.getElementById(
      `direct-upload-progress-${this.index}`
    );
  }

  upload(file) {
    return new Promise((resolve, reject) => {
      this.uploadObj.create((error, blob) => {
        if (error) {
          this.progressElement.classList.add("direct-upload--error");
          this.progressElement.setAttribute("title", error);
          reject(error);
        } else {
          this.progressElement.classList.add("direct-upload--complete");
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("value", blob.signed_id);
          hiddenField.id = `document_${this.index}`;
          document.querySelector("form").appendChild(hiddenField);
          resolve("Success");
        }
      });
    });
  }

  directUploadDidProgress(event) {
    this.progressBar.style.width = `${(100 * event.loaded) / event.total}%`;
  }

  directUploadWillStoreFileWithXHR(request) {
    this.progressElement.classList.remove("direct-upload--pending");
    request.upload.addEventListener("progress", (event) =>
      this.directUploadDidProgress(event)
    );
  }
}

const UploadDocument = (props) => {
  const { patientid, visitid,handleCount } = props;
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
              setList(response.data[2]);
              // console.log(response.data[2]);
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

  const fileInput = createRef();
  // console.log(fileInput);
  const addProgressBar = (file, index, handler) => {
    handler.insertAdjacentHTML(
      "afterend",
      `<br/>
     <div id="direct-upload-${index}" class="direct-upload direct-upload--pending">
     <div id="direct-upload-progress-${index}" class="direct-upload__progress" 
     style="width: 0%"></div>
     <span class=direct-upload__filename">${file.name}</span>
     </div>`
    );
  };

  const handleFiles = (formData) => {
    //  setCount(count + 1)
    return new Promise((resolve, reject) => {
      const promises = [];
      for (let i = 0; i < fileInput.current.files.length; i++) {
        // console.log(fileInput.current);
        addProgressBar(fileInput.current.files[i], i, fileInput.current);
        promises.push(uploadFiles(fileInput.current.files[i], i));
      }
      Promise.all(promises)
        .then(() => {
          var prescriptionFiles = [];
          for (let i = 0; i < fileInput.current.files.length; i++) {
            prescriptionFiles.push(
              document.getElementById(`document_${i}`).value
            );
          }
          var pr = [];
          for (let i = 0; i < prescriptionFiles.length; i++) {
            pr.push({
              documents: prescriptionFiles[i],
              visit_id: visitid,
              document_type: list.key,
            });
            Object.keys(pr[i]).forEach((key) => {
              formData.append(
                `patient[patient_documents_attributes][${i}][${key}]`,
                pr[i][key]
              );
            });
          }

          // for (let pair of formData.entries()) {
          //   console.log(pair[0] + ": " + pair[1]);
          // }

          // console.log(pr);
        })
        .then(() => resolve("looped through all files!"))
        .catch((error) => reject(error));
    });
  };

  const uploadFiles = (file, index) => {
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

    handleFiles(formData)
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
                handleCount()
                // window.location.reload(false);
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
              <label>Select Prescription</label>
            </div>
            <CardBody>
              <form>
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

export default UploadDocument;
