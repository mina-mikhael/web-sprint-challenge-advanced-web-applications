import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
const { login } = props;
const changeHandler = (evt) => {
  const { id, value } = evt.target;
  setValues({ ...values, [id]: value });
};

const onSubmit = (evt) => {
  evt.preventDefault();
  // ✨ implement
  login({ username: values.username, password: values.password });
};

const isDisabled = () => {
  // ✨ implement
  // Trimmed username must be >= 3, and
  // trimmed password must be >= 8 for
  // the button to become enabled
  if (values.username.trim().length >= 3 && values.password.trim().length >= 8) {
    return false;
  } else return true;
};

return (
  <div>
    {window.localStorage.getItem("token") ? (
      <h2> You are logged in</h2>
    ) : (
      <form id="loginForm" onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          maxLength={20}
          value={values.username}
          onChange={changeHandler}
          placeholder="Enter username"
          id="username"
        />
        <input
          maxLength={20}
          value={values.password}
          onChange={changeHandler}
          placeholder="Enter password"
          id="password"
        />
        <button disabled={isDisabled()} id="submitCredentials">
          Submit credentials
        </button>
      </form>
    )}
  </div>
);
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
