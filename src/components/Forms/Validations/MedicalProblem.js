export default function validate(values) {
  let errors = {};

  ///////////////////////////// duration ////////////////////////////////////
  if (!values.duration) {
    errors.duration = 'Duration is required';
  }

  /////////////////////////// duration_type //////////////////////////////////////
  if (!values.duration_type) {
    errors.duration_type = 'Duration Type is required';
  }
  /////////////////////////// progression //////////////////////////////////////
  // if (!values.progression) {
  //   errors.progression = 'Progression is required';
  // }
  /////////////////////////// Occurrence //////////////////////////////////////
  // if (!values.onset) {
  //   errors.onset = 'Occurrence is required';
  // }
  /////////////////////////// aggravating_factor //////////////////////////////////////
  // if (!values.aggravating_factor) {
  //   errors.aggravating_factor = 'Aggravating Factor is required';
  // }
  /////////////////////////// current_status //////////////////////////////////////
  // if (!values.current_status) {
  //   errors.current_status = 'Current Status is required';
  // }
  /////////////////////////// start_datetime //////////////////////////////////////
  // if (!values.start_datetime) {
  //   errors.start_datetime = 'Start Date is required';
  // }
  /////////////////////////// end_datetime //////////////////////////////////////
  // if (!values.end_datetime) {
  //   errors.end_datetime = 'End Date is required';
  // }

   /////////////////////////// associated_symtoms //////////////////////////////////////
  //  if (!values.associated_symtoms) {
  //   errors.associated_symtoms = 'Associated Symtoms is required';
  // }

 
  return errors;
};
