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
    checklistItems: [],
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
    const { name, type, value, checked } = event.currentTarget;
  
    if (type === 'checkbox') {
      if (checked) {
        setUserPayload((prevPayload) => ({
          ...prevPayload,
          [name]: [...prevPayload[name], value],
        }));
      } else {
        setUserPayload((prevPayload) => ({
          ...prevPayload,
          [name]: prevPayload[name].filter((item) => item !== value),
        }));
      }
    } else {
      setUserPayload((prevPayload) => ({
        ...prevPayload,
        [name]: value,
      }));
    }
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
            <select name="pronouns" value={userPayload.pronouns} onChange={onInputChange}>
              <option value="">Select pronouns</option>
              <option value="he/him">He/Him</option>
              <option value="she/her">She/Her</option>
              <option value="they/them">They/Them</option>
              <option value="n/a">Prefer Not To Say</option>
            </select>
            <FormError error={errors.pronouns} />
          </label>
        </div>
        <div>
          <label>
            City
            <input type="text" name="cityNeighborhood" value={userPayload.cityNeighborhood} onChange={onInputChange} />
            <FormError error={errors.cityNeighborhood} />
          </label>
        </div>
        <div>
          <label>
            State
            <select name="state" value={userPayload.state} onChange={onInputChange}>
              <option value="">Select state</option>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
            </select>
            <FormError error={errors.state} />
          </label>
        </div>
        <div>
          <label>
            Give a brief description of your experience level in the gym.  Are you new?  Have you been lifting for a year or two?<br></br>  
            Are you looking to find a buddy before jumping in for the first time?
            <input type="text" name="experienceLevel" value={userPayload.experienceLevel} onChange={onInputChange} />
            <FormError error={errors.experienceLevel} />
          </label>
        </div>
        <h4>Set your goals!  Check all that apply.</h4>
        <div className="grid-x">
          <div className="cell small-4">
            <div>
              <label>
                <span className="label-text">Build Muscle</span>
                <input
                  type="checkbox"
                  name="checklistItems"
                  value="Checklist Item 1"
                  onChange={onInputChange}
                  checked={userPayload.checklistItems.includes("Checklist Item 1")}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="label-text">Lose Fat</span>
                <input
                  type="checkbox"
                  name="checklistItems"
                  value="Checklist Item 2"
                  onChange={onInputChange}
                  checked={userPayload.checklistItems.includes("Checklist Item 2")}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="label-text">Lift Heavier</span>
                <input
                  type="checkbox"
                  name="checklistItems"
                  value="Checklist Item 3"
                  onChange={onInputChange}
                  checked={userPayload.checklistItems.includes("Checklist Item 3")}
                />
              </label>
            </div>
          </div>
          <div className="cell small-4">
            <div>
              <label>
                <span className="label-text">Build Cardio Endurance</span>
                <input
                  type="checkbox"
                  name="checklistItems"
                  value="Checklist Item 4"
                  onChange={onInputChange}
                  checked={userPayload.checklistItems.includes("Checklist Item 4")}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="label-text">Training for a 5k</span>
                <input
                  type="checkbox"
                  name="checklistItems"
                  value="Checklist Item 5"
                  onChange={onInputChange}
                  checked={userPayload.checklistItems.includes("Checklist Item 5")}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="label-text">Improve General Health</span>
                <input
                  type="checkbox"
                  name="checklistItems"
                  value="Checklist Item 6"
                  onChange={onInputChange}
                  checked={userPayload.checklistItems.includes("Checklist Item 6")}
                />
              </label>
            </div>
          </div>
          <div className="cell small-4">
            <div>
              <label>
                <span className="label-text">Get Your Daily Steps</span>
                <input
                  type="checkbox"
                  name="checklistItems"
                  value="Checklist Item 7"
                  onChange={onInputChange}
                  checked={userPayload.checklistItems.includes("Checklist Item 7")}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="label-text">Build Confidence</span>
                <input
                  type="checkbox"
                  name="checklistItems"
                  value="Checklist Item 8"
                  onChange={onInputChange}
                  checked={userPayload.checklistItems.includes("Checklist Item 8")}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="label-text">Sports Training</span>
                <input
                  type="checkbox"
                  name="checklistItems"
                  value="Checklist Item 9"
                  onChange={onInputChange}
                  checked={userPayload.checklistItems.includes("Checklist Item 9")}
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
