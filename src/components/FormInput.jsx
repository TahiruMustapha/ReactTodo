import React from "react";
// import toast from "react-hot-toast";
// import { v4 as uuidv4 } from "uuid";
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
