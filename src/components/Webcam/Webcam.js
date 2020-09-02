/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Switch from '@material-ui/core/Switch';
import Webcam from 'react-webcam';
import Button from '../../components/CustomButtons/Button';
import CameraIcon from '@material-ui/icons/Camera';
import CropIcon from '@material-ui/icons/Crop';
import UndoIcon from '@material-ui/icons/Undo';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Croppie from 'croppie';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';

const downloadjs = require('downloadjs');
// import ava from ''


export default class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      camIsOn: true,
      imageData: null,
      fileName: '',
    };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageData: imageSrc });
  };

 

  crop = () => {
    const el = document.getElementById('demo-basic');
    console.log(el);
    const vanilla = new Croppie(el, {
      viewport: { width: 150, height: 150, type: 'circle' },
      boundary: { width: 300, height: 300 },
      showZoomer: true,
      enableOrientation: false,
      enableResize: false,
    });
    vanilla.bind({
      url: this.state.imageData,
      orientation: 1,
    });


    const doCropBtn = document.getElementById('doCrop');
    const saveBtn = document.getElementById('saveBtn');
    doCropBtn.style.display = 'inline-flex';
    console.log('📋: WebcamCapture -> crop -> doCropBtn', doCropBtn);
    doCropBtn.addEventListener('click', () => {
      vanilla.result({ type: 'base64', format: 'png', size: 'original' })
        .then((base64) => {
          document.getElementById('imgbase64').setAttribute('src', base64);
          this.setState({ imageData: base64 });
          doCropBtn.style.display = 'none';
          saveBtn.style.display = 'inline-flex';
        });
    });
  }


  render() {
    const videoConstraints = {
      width: 640,
      height: 480,
      // the default is the device which is first in enumerateDevices
      // disable all interal cameras in Device Manager if you want external camera
      /* facingMode: 'user', */ // facingMode: { exact: "environment" }
    };

    const webcam = (
      <div id="webcam">
        <Webcam
          audio={false}
          width={640}
          height={480}
          ref={this.setRef}
          screenshotFormat="image/webp"
          videoConstraints={videoConstraints}
        />
      </div>
    );

    const photo = (
      <div id="still-photo">
        <img id="photo" alt="" src={this.state.imageData} />
      </div>
    );

    const campic = this.state.imageData === null ? webcam : photo;
    const buttons = this.state.imageData === null ? (
      <Button onClick={this.capture} variant="contained">
        <CameraIcon />
        {' '}
        CAPTURE
      </Button>
    )
      : (
        <Button
          onClick={() => this.setState({ imageData: null })}
          variant="contained"
         
        >
          <UndoIcon />
          {' '}
        Undo
        </Button>
      );

    const doCropBtn = (
      <Button
        style={{ display: 'none' }}
        id="doCrop"
        variant="contained"
       
      >
        <CropIcon />
        {' '}
        Crop Selection
      </Button>
    );

    const saveBtn = (
      <Button
        style={{ display: 'none' }}
        onClick={() => downloadjs(this.state.imageData, 'Patient', '../../assets/Patient image/png')}
        id="saveBtn"
        variant="contained"
       
        component={RouterLink}
				to="/create_patient"
        
      >
        <SaveIcon />
        {' '}
        Save
        
      </Button>
    );
   const style={
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    // textAlign:'center'
   }
    return (
        <div style={style}>
        {this.state.camIsOn && campic}
        {this.state.camIsOn && buttons}

         {this.state.imageData && (
          <>
            <Button
              onClick={() => this.crop()}
              variant="contained"
            
            >
              <EditIcon />
              {' '}
              Crop Photo...
            </Button>
            <div id="demo-basic" />

            <img alt="" id="imgbase64" />

            {doCropBtn}

            {saveBtn}


          </>
        )} 
      </div>
    );
  }
}
