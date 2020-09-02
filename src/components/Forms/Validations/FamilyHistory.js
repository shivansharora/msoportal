export default function validate(values) {
    let errors = {};
   
  ///////////////////////////// father_disease ////////////////////////////////////
    if (!values.father_disease) {
      errors.father_disease = 'Disease is required';
    } 

  /////////////////////////// father_desc //////////////////////////////////////
  if (!values.father_desc) {
    errors.father_desc = 'Description is required';
  }
  /////////////////////////// progression //////////////////////////////////////
  if (!values.mother_disease) {
    errors.mother_disease = 'Disease is required';
  }
  /////////////////////////// Occurrence //////////////////////////////////////
  if (!values.mother_desc) {
    errors.mother_desc = 'Description is required';
  }
  /////////////////////////// aggravating_factor //////////////////////////////////////
  if (!values.sibling_disease) {
    errors.sibling_disease = 'Disease is required';
  }
  /////////////////////////// current_status //////////////////////////////////////
  if (!values.sibling_desc) {
    errors.sibling_desc = 'Description is required';
  }
  /////////////////////////// start_datetime //////////////////////////////////////
  if (!values.spouce_disease) {
    errors.spouce_disease = 'Disease is required';
  }
  /////////////////////////// end_datetime //////////////////////////////////////
  if (!values.spouce_desc) {
    errors.spouce_desc = 'Description is required';
  }
 
    return errors;
  };
  