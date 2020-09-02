import React, { Component } from 'react';
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
import classes from './date.module.css'; 
import "react-datepicker/dist/react-datepicker.css";


class Date extends Component {
    state = {
        startDate:null
      };
     
      handleChange = date => {
        this.setState({
          startDate: date
        });
      };
    render() {
        return (
            <div> 
            <DatePicker  
            selected={this.state.startDate}
            onChange={this.handleChange}
            placeholderText="DOB"
          />
          </div>
        );
    }
}

export default Date;