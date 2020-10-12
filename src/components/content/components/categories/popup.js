import React, { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import SubTable from "./subTable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import Api from "../../../../api";

const SubCategoryTable = ({
  categoryId,
  rows,
  classes,
  setOpen,
  open,
  openEditDialog,
  setOpenEditDialog,
  fetchSubCategories,
}) => {
  const [loading, setLoading] = useState(true);
  const { handleSubmit, register, reset } = useForm();
  const [current, setCurrent] = useState(true);

  const onSubmit = (values) => {
    let x = Object.values(values).splice(2);
    let y = [];
    for (let i = 0; i < x.length; i += 2) {
      y.push({
        name_en: x[i],
        name_ar: x[i + 1],
      });
    }
    let res = {};
    res["name_en"] = values["name_en"];
    res["name_ar"] = values["name_ar"];
    res["status"] = msg;
    res["custom_fields"] = y;
    res["category_id"] = categoryId;
    current &&
      Api.post("admin/subcategory/add", res)
        .then((data) => {
          setOpen(false);
          reset();
        })
        .catch((error) => console.log(error));
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const [customFieldCount, setCustomFieldCount] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open1, setOpen1] = useState(false);
  const [msg, setMsg] = useState(1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen1(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen1(false);
    reset();
  };

  const id = open1 ? "simple-popover" : undefined;

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Paper
        style={{
          maxHeight: "80vh",
          width: "70vw",
          position: "absolute",
          top: "8vh",
          overflowY: "scroll",
          paddingBottom: "2rem",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: "0 1rem", color: "#979aa4" }}
          >
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Add Sub Category
            </p>
            <IconButton
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{
                padding: "1rem",
              }}
            >
              <TextField
                inputRef={register()}
                name="name_en"
                variant="outlined"
                label="Name"
              />
              <TextField
                inputRef={register()}
                name="name_ar"
                variant="outlined"
                label="اسم"
              />

              <Tooltip
                title={msg === 0 ? "InActive" : "Active"}
                placement="left"
              >
                <Fab
                  aria-describedby={id}
                  onClick={handleClick}
                  style={{
                    color: "#fff",
                  }}
                  size="medium"
                  color={msg === 0 ? "primary" : "secondary"}
                >
                  <ExpandMoreIcon />
                </Fab>
              </Tooltip>

              <Popover
                id={id}
                open={open1}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {open1 && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleClose();
                        setMsg(0);
                      }}
                      style={{
                        borderRadius: 0,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                      variant="contained"
                      color="primary"
                    >
                      InActive
                    </Button>
                    <Button
                      onClick={() => {
                        handleClose();
                        setMsg(1);
                      }}
                      style={{
                        borderRadius: 0,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Active
                    </Button>
                  </Box>
                )}
              </Popover>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              style={{ padding: "0 1rem 2rem", color: "#979aa4" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Custom Fields
              </p>

              {[...Array(customFieldCount).keys()].map((i, k) => (
                <Box
                  style={{
                    margin: "1rem 0",
                  }}
                  key={k}
                  display="flex"
                  justifyContent="space-between"
                >
                  <TextField
                    inputRef={register()}
                    name={`name_en${k + 1}`}
                    variant="outlined"
                    label="name_en"
                  />
                  <TextField
                    inputRef={register()}
                    variant="outlined"
                    name={`name_ar${k + 1}`}
                    label="name_ar"
                  />
                  <Box display="flex">
                    {k === [...Array(customFieldCount).keys()].length - 1 && (
                      <Tooltip title="Add New Custom Field" placement="left">
                        <Fab
                          onClick={() => {
                            setCustomFieldCount(customFieldCount + 1);
                          }}
                          size="medium"
                          color="secondary"
                          aria-label="add"
                          style={{
                            marginRight: 10,
                          }}
                        >
                          <AddIcon />
                        </Fab>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete" placement="left">
                      <Fab
                        onClick={() => {
                          setCustomFieldCount(customFieldCount - 1);
                        }}
                        style={{
                          color: "#fff",
                          background: "red",
                        }}
                        size="medium"
                        color="secondary"
                      >
                        <DeleteOutlineIcon />
                      </Fab>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
            </Box>
            {/* <Divider /> */}
          </Box>
          <Box style={{ padding: "1rem" }}>
            {!loading ? (
              <SubTable
                setCurrent={setCurrent}
                classes1={classes}
                rows={rows}
                fetchSubCategories={fetchSubCategories}
                setOpenSubCategory={setOpen}
                openEditDialog={openEditDialog}
                setOpenEditDialog={setOpenEditDialog}
              />
            ) : (
              <CircularProgress />
            )}
          </Box>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            style={{ margin: "1rem 1rem 0" }}
          >
            <Fab
              type="submit"
              onClick={() => {}}
              variant="extended"
              color="primary"
              aria-label="add"
            >
              Save
            </Fab>
          </Box>
        </form>
      </Paper>
    </Backdrop>
  );
};

export default withRouter(SubCategoryTable);
