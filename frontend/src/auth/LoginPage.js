import { connect } from "react-redux";
import { login } from "./authSlice";
import { isEmail } from "./utils";

import {
  Container,
  FormControl,
  Input,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { Navigate } from "react-router-dom";

const LoginPage = (props) => {
  const onSubmit = (data) => {
    const parsed = { ...data };
    if (isEmail(data.username)) {
      parsed.email = data.username;
      delete parsed.username;
    }
    props.login(parsed);
  };

  if (props.isSignIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Box m="auto" width="fit-content" pt={3} pb={5}>
        <img height="200" src={process.env.PUBLIC_URL + "/logo512.png"} />
      </Box>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Box display="flex" flexDirection="column">
            <Box my={1}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="username_field">
                  Username or Email
                </InputLabel>
                <Field name="username">
                  {(props) => (
                    <>
                      <Input
                        id="username_field"
                        name={props.input.name}
                        value={props.input.value}
                        onChange={props.input.onChange}
                      />
                    </>
                  )}
                </Field>
              </FormControl>
            </Box>
            <Box my={1}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="password_field">Password</InputLabel>
                <Field name="password">
                  {(props) => (
                    <>
                      <Input
                        id="password_field"
                        name={props.input.name}
                        value={props.input.value}
                        onChange={props.input.onChange}
                        type="password"
                      />
                    </>
                  )}
                </Field>
              </FormControl>
            </Box>
            <Box mt={4}>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Sign In
              </Button>
            </Box>
          </Box>
        )}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { isSignIn: state.auth.isSignIn };
};

export default connect(mapStateToProps, { login })(LoginPage);
