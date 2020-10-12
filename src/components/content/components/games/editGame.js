import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Box,
  Fab,
  Backdrop,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import { Clear, CameraAlt } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";
import Thumbnail from "../../../../assets/thumbnail1.png";

const EditPopup = ({ classes, open, setOpen }) => {
  const {
    state: { game_details, resolution_list },
    fetchResolutions,
    addGame,
    fetchGames,
  } = useContext(DataContext);

  const [value, setValue] = useState(game_details && game_details.status);
  const [resolution, setResolution] = useState(
    game_details && game_details.resolution
  );
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [picked, isPicked] = useState(false);

  const onSubmit = async (y) => {
    // setOpen(false);
    setDisabled(true);

    if (imgFile) {
      await addGame({
        name_en,
        name_ar,
        value: resolution,
        imgFile,
        status: value,
        game_id: game_details.game_id,
      });
    } else {
      console.log(file);
      await addGame({
        game_id: game_details.game_id,
        name_en,
        name_ar,
        file: file.split("com/")[1],
        value: resolution,
        status: value,
      });
    }

    await fetchGames();
    setDisabled(false);
    setFile(null);
    setImgFile(null);
    setOpen(false);
  };

  const handleImgChange = useCallback(
    (e) => {
      var file1 = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        setFile(reader.result);
        setImgFile(file1);
        // console.log(file);
      };
      reader.readAsDataURL(file1);
    },
    [file]
  );

  useEffect(() => {
    fetchResolutions();
    if (game_details && resolution_list) {
      setValue(game_details.status);
      setNameEn(game_details.name_en);
      setNameAr(game_details.name_ar);
      setResolution(game_details.resolution);
      setFile(game_details.image);
    }
  }, [game_details]);

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ padding: "1rem 2rem" }}
      >
        <input
          accept=".png,.jpeg,.jpg"
          onChange={(e) => {
            handleImgChange(e);
          }}
          style={{ display: "none" }}
          id="icon-button-file1"
          type="file"
        />

        {game_details && (
          <form onSubmit={handleSubmit(onSubmit)}>
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
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{ margin: "1rem 0" }}
                >
                  <TextField
                    variant="outlined"
                    label="name"
                    value={name_en}
                    onChange={(e) => setNameEn(e.target.value)}
                    style={{ width: "47%" }}
                    // defaultValue={game_details.name_en}
                  />
                  <TextField
                    variant="outlined"
                    label="name_ar"
                    value={name_ar}
                    onChange={(e) => setNameAr(e.target.value)}
                    style={{ width: "47%" }}
                    // defaultValue={game_details.name_ar}
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
                    <Paper
                      style={{ width: "47%" }}
                      onClick={() => {
                        isPicked(true);
                      }}
                    >
                      <label htmlFor="icon-button-file1">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          style={{
                            height: "20vh",
                            cursor: "pointer",
                          }}
                        >
                          {file ? (
                            <img
                              style={{
                                height: "20vh",
                              }}
                              alt="img"
                              src={file}
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
                      </label>
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
                      value={resolution}
                      onChange={(e) => {
                        setResolution(e.target.value);
                        // console.log(e.target.value);
                      }}
                    >
                      {resolution_list &&
                        resolution_list.map((i, k) => (
                          <MenuItem value={i}>{i}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* <Box
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
                      onChange={(e) => {
                        setValue(e.target.value);
                        // console.log(e.target.value);
                      }}
                    >
                      <MenuItem value={0}>InActive</MenuItem>
                      <MenuItem value={1}>Active</MenuItem>
                    </Select>
                  </FormControl>
                </Box> */}

                <Box
                  display="flex"
                  flexDirection="row-reverse"
                  style={{
                    marginTop: "1rem",
                    marginRight: "2rem",
                  }}
                >
                  {disabled ? (
                    <CircularProgress />
                  ) : (
                    <Fab type="submit" variant="extended" color="primary">
                      Save
                    </Fab>
                  )}
                </Box>
              </Paper>
            </Backdrop>
          </form>
        )}
      </Box>
    </Backdrop>
  );
};

export default EditPopup;
