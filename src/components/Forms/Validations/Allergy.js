export default function validate(values) {
    let errors = {};
   
  ///////////////////////////// observation ////////////////////////////////////
    if (!values.observation) {
      errors.observation = 'Observation is required';
    } 


 
    return errors;
  };
  