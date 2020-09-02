export default function validate(values) {
    let errors = {};
    
  //////////////////////////// Mobile ///////////////////////////////////
    if (!values.mobile) {
      errors.mobile = 'Mobile is required';
    }else if (isNaN(values.mobile)) {
        errors.mobile = 'User must write digits only not characters';
      }else if (values.mobile.length !==10) {
        errors.mobile = 'Number length should be 10';
      }
  //////////////////////////// Email ////////////////////////////////////
      if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  
  /////////////////////////// Age //////////////////////////////////////
  if (!values.age) {
    errors.age = 'Age is required';
  }else if (isNaN(values.age)) {
    errors.age = 'User must write digits only not characters';
  }

    /////////////////////////// Emergency Contact //////////////////////////////////////
    // if (!values.emergency_contact_no) {
    //   errors.emergency_contact_no = 'Emergency Contact is required';
    // }else if (isNaN(values.emergency_contact_no)) {
    //     errors.emergency_contact_no = 'User must write digits only not characters';
    //   }else if (values.emergency_contact_no.length !==10) {
    //     errors.emergency_contact_no = 'Emergency Contact length should be 10';
    //   }
    ///////////////////////////////// curr_pass ///////////////////////////////  
    if (!values.current_password) {
        errors.current_password = 'Current Password is required';
        }
    
          ///////////////////////////////// curr_pass ///////////////////////////////  
          if (!values.new_password) {
            errors.new_password = 'New Password is required';
            }
      ///////////////////////////////// confirmpassword /////////////////////////////// 
      if (!values.confirm_password) {
        errors.confirm_password = 'Confirm Password is required';
      } else if(values.new_password !==values.confirm_password) {
        errors.confirm_password='Password are not Matching'
      }      
    return errors;
  };
  