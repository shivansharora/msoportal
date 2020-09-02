// import 'date-fns';
import React,{useState , Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import { TimePicker } from "@material-ui/pickers";

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, handleDateChange] = useState(new Date());
//   const handleDateChange = date => {
//     setSelectedDate(date);
//   };

  return (
  <Fragment>
      <Grid container justify="space-around">
       
      
       <TimePicker
        showTodayButton
        todayLabel="now"
        label="Step = 5"
        value={selectedDate}
        minutesStep={5}
        // onChange={handleDateChange}
      />
      </Grid>
      </Fragment>
  );
}
