import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Fab,
  Backdrop,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import { Clear, CameraAlt, EditOutlined } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";
import Thumbnail from "../../../../assets/thumbnail1.png";

const Popup = ({ classes, open, setOpen, setOpenPackageDialog }) => {
  const {
    state: { game_details },
  } = useContext(DataContext);

  const [value, setValue] = useState(0);
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (y) => {
    setOpen(false);
  };

  const handleImgChange = (e) => {
    var file1 = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      setFile(reader.result);
      console.log(file);
    };
    reader.readAsDataURL(file1);
  };

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ padding: "1rem 2rem" }}
      >
        {game_details && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              accept=".png,.jpeg,.jpg"
              onChange={(e) => {
                handleImgChange(e);
                setImgFile(e.target.files[0]);
              }}
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
            />

            <p
              onClick={() => {
                setOpen(true);
              }}
              style={{
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
                position: "relative",
                zIndex: 3,
                top: -5,
              }}
            >
              Add Game
            </p>
            <Backdrop open={open} className={classes.backdrop}>
              <Paper
                style={{
                  position: "absolute",
                  top: "7vh",
                  maxHeight: "80vh",
                  overflowY: "scroll",
                  width: "70vw",
                  padding: "2rem",
                }}
              >
                <Box display="flex" flexDirection="row-reverse">
                  <IconButton
                    onClick={() => {
                      setDisabled(false);
                      setOpen(false);
                    }}
                  >
                    <Clear />
                  </IconButton>
                  {/* <IconButton
                    onClick={() => {
                      setDisabled(false);
                      setOpenPackageDialog(true);
                    }}
                  >
                    <EditOutlined />
                  </IconButton> */}
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{ margin: "1rem 0" }}
                >
                  <TextField
                    variant="outlined"
                    label="name"
                    disabled
                    // value={name_en}
                    // onChange={(e) => setNameEn(e.target.value)}
                    style={{ width: "47%" }}
                    defaultValue={game_details.name_en}
                  />
                  <TextField
                    variant="outlined"
                    disabled
                    label="name_ar"
                    name={name_ar}
                    onChange={(e) => setNameAr(e.target.value)}
                    style={{ width: "47%" }}
                    defaultValue={game_details.name_ar}
                  />
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ margin: "1rem 0" }}
                  >
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        fontWeight: 600,
                      }}
                    >
                      Image :
                    </p>
                    <Paper style={{ width: "47%" }}>
                      {/* <label htmlFor="icon-button-file"> */}
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          height: "20vh",
                          cursor: "pointer",
                        }}
                      >
                        {game_details.image && game_details.image.length > 0 ? (
                          <img
                            style={{
                              height: "20vh",
                            }}
                            alt="img"
                            src={game_details.image}
                          />
                        ) : (
                          <img
                            style={{
                              height: "20vh",
                            }}
                            alt="img"
                            src={Thumbnail}
                          />
                        )}
                      </Box>
                      {/* </label> */}
                    </Paper>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{ margin: "1rem 0" }}
                >
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#282b3c",
                      fontWeight: 600,
                    }}
                  >
                    Resolution :
                  </p>
                  <FormControl style={{ width: "47%" }}>
                    <Select
                      value={value}
                      disabled
                      onChange={(e) => {
                        setValue(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      <MenuItem value={0}>
                        {game_details && game_details.resolution}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{ margin: "1rem 0" }}
                >
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#282b3c",
                      fontWeight: 600,
                    }}
                  >
                    Status :
                  </p>
                  <FormControl style={{ width: "47%" }}>
                    <Select
                      value={value}
                      disabled
                      onChange={(e) => {
                        // setValue(e.target.value);
                        // console.log(e.target.value);
                      }}
                    >
                      <MenuItem value={0}>
                        {game_details && game_details.status === 1
                          ? "Active"
                          : "InActive"}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Paper>
            </Backdrop>
          </form>
        )}
      </Box>
    </Backdrop>
  );
};

export default Popup;
