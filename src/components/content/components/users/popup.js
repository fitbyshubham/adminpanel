import React, { useState, useContext } from "react";
import {
  Backdrop,
  Paper,
  Box,
  IconButton,
  Avatar,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import Img from "../../../../assets/thumbnail1.png";
import { Context as DataContext } from "../../../../api/dataProvider";
import moment from "moment";

const Popup = ({ classes, open, setOpen }) => {
  const [value, setValue] = useState("male");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const {
    state: { user_profile },
  } = useContext(DataContext);

  return (
    <Backdrop open={open} className={classes.backdrop}>
      {user_profile && (
        <Paper
          style={{
            height: "80vh",
            width: "50vw",
            position: "absolute",
            top: "5vh",
            background: "#fff",
            padding: "2rem",
          }}
        >
          <Box display="flex" flexDirection="row-reverse">
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <Clear />
            </IconButton>
          </Box>
          <Box style={{ padding: "2rem" }} display="flex">
            <Box>
              <Avatar
                src={
                  user_profile &&
                  user_profile.profile_image &&
                  user_profile.profile_image.length > 0
                    ? user_profile.profile_image
                    : Img
                }
                style={{
                  width: "150px",
                  height: "150px",
                  marginRight: "2rem",
                  marginBottom: "2rem",
                }}
                variant="rounded"
              >
                H
              </Avatar>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={
                    user_profile && user_profile.gender === "1"
                      ? "male"
                      : "female"
                  }
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio disabled={true} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio disabled={true} />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                id="date"
                label="created_at"
                disabled={true}
                style={{ margin: "4rem 0" }}
                defaultValue={
                  user_profile &&
                  moment(new Date(user_profile.created_at)).format(
                    "DD MMM YYYY"
                  )
                }
                className={classes.textField}
              />
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="top"
                  disabled={true}
                  control={
                    <Checkbox
                      checked={
                        user_profile && user_profile.is_google_login === "1"
                      }
                      color="primary"
                    />
                  }
                  label="Google Signed-in"
                  labelPlacement="end"
                />
              </FormGroup>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box display="flex">
                <TextField
                  label="First Name"
                  disabled={true}
                  value={user_profile && user_profile.first_name}
                  variant="outlined"
                  style={{ marginRight: "1rem" }}
                />
                <TextField
                  disabled={true}
                  value={user_profile && user_profile.last_name}
                  label="Last Name"
                  variant="outlined"
                />
              </Box>
              <TextField
                value={user_profile && user_profile.full_name}
                label="Full Name"
                disabled={true}
                variant="outlined"
              />
              <TextField
                label="Email Address"
                value={user_profile && user_profile.email}
                variant="outlined"
                disabled={true}
                style={{ marginRight: "1rem" }}
              />
              <TextField
                disabled={true}
                value={user_profile && user_profile.phone}
                label="Phone Number"
                variant="outlined"
                style={{
                  color: "#000",
                }}
              />
            </Box>
          </Box>
        </Paper>
      )}
    </Backdrop>
  );
};

export default Popup;
