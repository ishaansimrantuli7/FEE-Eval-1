import React, { useState } from "react";
import "../assets/signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthClass, setStrengthClass] = useState(""); // State for strength class
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearErrors = () => {
    setErrors({});
  };

  const showError = (field, message) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: message }));
  };

  const validateForm = () => {
    clearErrors();
    let isValid = true;

    if (formData.username.length < 4 || formData.username.length > 15) {
      showError("usernameError", "Username must be between 4 and 15 characters.");
      isValid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!formData.email.match(emailPattern)) {
      showError("emailError", "Invalid Email Format.");
      isValid = false;
    }

    if (formData.password.length < 6) {
      showError("passwordError", "Password must be at least 6 characters long.");
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("confirmPasswordError", "Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is Valid. Submitting.");
      const date = new Date().toLocaleString();
      // Proceed with form submission or API call here
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&#]/.test(password)) strength++;

    setPasswordStrength(strength);

    // Assign class based on strength
    if (strength === 1) setStrengthClass("weak");
    else if (strength === 2) setStrengthClass("medium");
    else if (strength === 3) setStrengthClass("fair");
    else if (strength === 4) setStrengthClass("strong");
    else setStrengthClass(""); // Default state
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup">
        <div className="signup-box">
      <div className="box_image">
        <img src="./Images/signup_image.jpeg" alt="Signup Visual" />
      </div>
      <div className="box_content">
        <h1>Create Your Account</h1>
        <form id="signUpPage" onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label htmlFor="username">
              <i className="fas fa-user" /> Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.usernameError && <div className="error">{errors.usernameError}</div>}
          </div>

          <div className="inputContainer">
            <label htmlFor="email">
              <i className="fas fa-envelope" /> Email ID:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email ID"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.emailError && <div className="error">{errors.emailError}</div>}
          </div>

          <div className="inputContainer">
            <label htmlFor="password">
              <i className="fas fa-lock" /> Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) => {
                handleInputChange(e);
                checkPasswordStrength(e.target.value);
              }}
            />
            {errors.passwordError && <div className="error">{errors.passwordError}</div>}
            <div className={`strength-meter ${strengthClass}`}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={i < passwordStrength ? "active" : ""} />
              ))}
            </div>
            {/* Display password strength text only if there is a password entered */}
            {formData.password && (
              <div id="passwordStrengthText" className={strengthClass}>
                {passwordStrength === 1
                  ? "Password is too Weak"
                  : passwordStrength === 2
                  ? "Password is Weak"
                  : passwordStrength === 3
                  ? "Password is Fair"
                  : passwordStrength === 4
                  ? "Password is Strong"
                  : "Password is too Weak"}
              </div>
            )}
          </div>

          <div className="inputContainer">
            <label htmlFor="confirmPassword">
              <i className="fas fa-lock" /> Confirm Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <label htmlFor="showPassword" className="showPassword">
              <input
                type="checkbox"
                name="showPassword"
                id="showPassword"
                checked={showPassword}
                onChange={toggleShowPassword}
              />{" "}
              Show Password
            </label>
            {errors.confirmPasswordError && <div className="error">{errors.confirmPasswordError}</div>}
          </div>

          <p>
            Already Have an Account? <a href="SignIn.html">Sign In</a>
          </p>
          <button type="submit" id="submitBtn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
