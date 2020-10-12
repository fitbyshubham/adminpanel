import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Fab,
  Backdrop,
  Paper,
  makeStyles,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { Clear, CameraAlt } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";
import AddPackage from "./addPackage";
import Search from "./search";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AddItem = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [subCategories, setSubCategories] = useState(null);
  const [value, setValue] = useState(0);
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [openPackageForm, setOpenPackageForm] = useState(false);
  const [active, isActive] = useState(false);
  const [inActive, isInActive] = useState(false);

  const {
    state: { resolution_list },
    fetchResolutions,
    addGame,
    fetchGames,
  } = useContext(DataContext);

  useEffect(() => {
    fetchResolutions();
  }, []);

  const onSubmit = async (y) => {
    setDisabled(true);
    await addGame({
      name_en,
      name_ar,
      value,
      imgFile,
    });

    await fetchGames();
    setNameEn("");
    setNameAr("");
    setImgFile(null);
    setFile(null)
    setValue(0);
    setDisabled(false);
    setDisabled(false);
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ padding: "0.9rem 2rem" }}
    >
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

        <Box
          display="flex"
          justifyContent="space-between"
          style={{ zIndex: 3, position: "relative", width: "80vw" }}
        >
          <Box display="flex" alignItems="center">
            <Search active={active} inActive={inActive} />
            <FormGroup row style={{ marginLeft: "2rem" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={active}
                    onChange={() => {
                      if (!active) {
                        isInActive(false);
                        fetchGames(null, null, null, 1);
                      }
                      if (active) {
                        fetchGames();
                      }
                      isActive(!active);
                    }}
                    name="checkedA"
                    color="primary"
                  />
                }
                label={<p style={{ color: "#fff" }}>Active</p>}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={inActive}
                    onChange={() => {
                      if (!inActive) {
                        isActive(false);
                        fetchGames(null, null, null, 0);
                      }
                      if (inActive) {
                        fetchGames();
                      }
                      isInActive(!inActive);
                    }}
                    name="InActive"
                  />
                }
                label={<p style={{ color: "#fff" }}>InActive</p>}
              />
            </FormGroup>
          </Box>

          <Box display="flex">
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
                marginRight: "1.5rem",
              }}
            >
              Add Game
            </p>

            <p
              onClick={() => {
                setOpenPackageForm(true);
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
              Add Package
            </p>
          </Box>
        </Box>

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
                  setNameEn("");
                  setNameAr("");
                  setImgFile(null);
                  setFile(null)
                  setValue(0);
                  setDisabled(false);
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
              />
              <TextField
                variant="outlined"
                label="name_ar"
                value={name_ar}
                onChange={(e) => setNameAr(e.target.value)}
                style={{ width: "47%" }}
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
                  <label htmlFor="icon-button-file">
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
                        <CameraAlt />
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
                Select Resolution :
              </p>
              <FormControl style={{ width: "47%" }}>
                <Select
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {resolution_list ? (
                    resolution_list.map((i, k) => (
                      <MenuItem value={i}>{i}</MenuItem>
                    ))
                  ) : (
                    <MenuItem value={0}></MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>

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
                  Add
                </Fab>
              )}
            </Box>
          </Paper>
        </Backdrop>
      </form>
      <AddPackage
        classes={classes}
        setOpen={setOpenPackageForm}
        open={openPackageForm}
        disabled={disabled}
        setDisabled={setDisabled}
      />
    </Box>
  );
};

export default AddItem;
