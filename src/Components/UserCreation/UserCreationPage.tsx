import React, { useState, BaseSyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import "./userCreationPage.css";
import GoogleLocation from "./UserGoogleLocation";
import { setUserToCreate } from "../../store/userToCreateSlice";
import { setUser } from "../../store/userSlice";
import { RootState } from "../../store";
import { Avatar, Box, Link } from "@mui/material";
import Logo from "../../resources/logo.svg";

const CreateUserPage = () => {
  const userToCreate = useSelector(
    (state: RootState) => state.userToCreate.userToCreate
  );
  const [validity, setValidity] = useState({ username: false, email: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserStateChange = (e: BaseSyntheticEvent) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setUserToCreate({ ...userToCreate, [name]: value }));
  };

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    if (!Object.values(validity).includes(true)) {
      try {
        event.preventDefault();
        const { data: created } = await axios.post("/api/user", userToCreate);
        dispatch(setUser(created));
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateUsername = async (event: BaseSyntheticEvent) => {
    try {
      const currentUsername = event.target.value;

      const response = await axios.post("/api/user/usernameAuth", {
        currentUsername,
      });

      const usernameValid = response.status !== 200;

      setValidity({ ...validity, username: usernameValid });
    } catch (error) {
      setValidity({ ...validity, username: true });
    }
  };

  const validateEmail = async (event: BaseSyntheticEvent) => {
    try {
      const currentEmail = event.target.value;

      const response = await axios.post("/api/user/userEmailAuth", {
        currentEmail,
      });

      const emailValid = response.status !== 200;

      setValidity({ ...validity, email: emailValid });
    } catch (error) {
      setValidity({ ...validity, email: true });
    }
  };

  return (
    <Box>
        <Link sx={{position: "absolute"}} aria-label="Link back to Limit Landing page" href="/">
          <Avatar
            role={"navigation"}
            alt="Limit Logo"
            variant="square"
            sx={{
              mr: 10,
              height: "20vh",
              width: "max-content",
              padding: 1,
            }}
            src={Logo}
          ></Avatar>
        </Link>
      <Container
        sx={{ display: "flex", flexDirection: "column", placeSelf: "center" }}
      >
        <Typography sx={{ placeSelf: "center" }} variant={"h2"}>
          Create Your Account
        </Typography>
        <Form className="form">
          <div className="userForm">
            <FormControl error={validity.username} required>
              <InputLabel htmlFor="username-input">Your Username</InputLabel>
              <Input
                name="username"
                id="username-input"
                aria-describedby="username-helper-text"
                onChange={(event) => {
                  handleUserStateChange(event);
                  validateUsername(event);
                }}
              />
              <FormHelperText id="username-helper-text">
                {validity.username
                  ? "Your username must be unique."
                  : "Other users will see this username."}
              </FormHelperText>
            </FormControl>

            <FormControl required>
              <InputLabel htmlFor="password-input">Your Password</InputLabel>
              <Input
                name="password"
                id="password-input"
                aria-describedby="password-helper-text"
                onChange={handleUserStateChange}
              />
              <FormHelperText id="password-helper-text">
                Your password should include a number.
              </FormHelperText>
            </FormControl>

            <FormControl required>
              <InputLabel htmlFor="firstName-input">First Name</InputLabel>
              <Input
                name="firstName"
                id="firstName-input"
                aria-describedby="firstName-helper-text"
                onChange={handleUserStateChange}
              />
              <FormHelperText id="firstName-helper-text">
                Please enter your first name only.
              </FormHelperText>
            </FormControl>

            <FormControl required>
              <InputLabel htmlFor="lastName-input">Last Name</InputLabel>
              <Input
                name="lastName"
                id="lastName-input"
                aria-describedby="lastName-helper-text"
                onChange={handleUserStateChange}
              />
              <FormHelperText id="lastName-helper-text">
                Please enter your last name only.
              </FormHelperText>
            </FormControl>
            <FormControl error={validity.email} required>
              <InputLabel htmlFor="email-input">Your Email</InputLabel>
              <Input
                error={validity.email}
                name="email"
                id="email-input"
                aria-describedby="email-helper-text"
                onChange={(event) => {
                  handleUserStateChange(event);
                  validateEmail(event);
                }}
              />
              <FormHelperText id="email-helper-text">
                {validity.email
                  ? "This email address has already been used."
                  : "Please enter your email address."}
              </FormHelperText>
            </FormControl>

            <FormControl required>
              <InputLabel htmlFor="phoneNum-input">
                Your Phone Number
              </InputLabel>
              <Input
                name="phoneNum"
                id="phoneNum-input"
                aria-describedby="phoneNum-helper-text"
                onChange={handleUserStateChange}
              />
              <FormHelperText id="phoneNum-helper-text">
                Please enter your phone number with area code.
              </FormHelperText>
            </FormControl>

            <FormControl required>
              <InputLabel htmlFor="avatar-input">Your Avatar</InputLabel>
              <Input
                name="avatarUrl"
                id="avatar-input"
                aria-describedby="avatar-helper-text"
                onChange={handleUserStateChange}
              />
              <FormHelperText id="avatar-helper-text">
                Please provide an avatar image URL for your avatar.
              </FormHelperText>
            </FormControl>
            <FormControl required>
              <InputLabel shrink htmlFor="birthday-input">
                Birthday
              </InputLabel>
              <Input
                type="date"
                name="birthday"
                id="birthday-input"
                aria-describedby="birthday-helper-text"
                onChange={handleUserStateChange}
              />
              <FormHelperText id="birthday-helper-text">
                Please provide your birth date.
              </FormHelperText>
            </FormControl>

            <FormControl required>
              <GoogleLocation />
              <FormHelperText id="address-helper-text">
                Please provide your current address.
              </FormHelperText>
            </FormControl>
          </div>
          <Button
            size="large"
            sx={{ width: "20vw", height: "10vh" }}
            onClick={handleSubmit}
            variant="contained"
          >
            <Typography
              sx={{
                display: { xs: "none", md: "flex" },
                fontWeight: 500,
                letterSpacing: ".2rem",
              }}
              variant={"h4"}
            >
              Submit
            </Typography>
          </Button>
        </Form>
      </Container>{" "}
    </Box>
  );
};

export default CreateUserPage;
