import React from "react";

const FormErrors = (props) => {
  const pStyle = {
    color: "red",
  };
  let formErrors = props.formErrors;
  return (
    <div className="formErrors">
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return (
            <p style={pStyle} key={i}>
              {formErrors[fieldName]}
            </p>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
};

export default FormErrors;
