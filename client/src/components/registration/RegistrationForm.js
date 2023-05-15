import React, { useState } from "react";
import ErrorList from "../layout/ErrorList"
import FormError from "../layout/FormError";
import config from "../../config";
import translateServerErrors from "../../services/translateServerErrors";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    age: "",
    pronouns: "",
    cityNeighborhood: "",
    experienceLevel: "",
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});

    const { email, password, passwordConfirmation, firstName, age, pronouns, cityNeighborhood, experienceLevel } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/users", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          if (!response.ok) {
            if (response.status === 422) {
              const errorBody = await response.json()
              const newServerErrors = translateServerErrors(errorBody.errors)
              setServerErrors(newServerErrors)
            }
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const userData = await response.json();
          setShouldRedirect(true);
        }
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container">
      <h1>Register</h1>
      <ErrorList errors={serverErrors} />
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <label>
            First Name
            <input type="text" name="firstName" value={userPayload.firstName} onChange={onInputChange} />
            <FormError error={errors.firstName} />
          </label>
        </div>
        <div>
          <label>
            Age
            <input type="integer" name="age" value={userPayload.age} onChange={onInputChange} />
            <FormError error={errors.age} />
          </label>
        </div>
        <div>
          <label>
            Pronouns
            <input type="text" name="pronouns" value={userPayload.pronouns} onChange={onInputChange} />
            <FormError error={errors.pronouns} />
          </label>
        </div>
        <div>
          <label>
            City/Neighborhood
            <input type="text" name="cityNeighborhood" value={userPayload.cityNeighborhood} onChange={onInputChange} />
            <FormError error={errors.cityNeighborhood} />
          </label>
        </div>
        <div>
          <label>
            Give a brief description of your "Gym Experience Level".  Are you new?  Have you been lifting for a year or two?
            <input type="text" name="experienceLevel" value={userPayload.experienceLevel} onChange={onInputChange} />
            <FormError error={errors.experienceLevel} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
