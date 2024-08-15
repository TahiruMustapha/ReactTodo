import React from "react";
const FormInput = ({
  onSubmit,
  inputValue,
  onChangeText,
  buttonText,
  placeholderText,
  inputName,
}) => {
  return (
    <form onSubmit={onSubmit} className=" todo-changeList">
      <input
        type="text"
        name={inputName}
        value={inputValue}
        onChange={onChangeText}
        placeholder={placeholderText}
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};
export default FormInput;
