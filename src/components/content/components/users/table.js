import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import Popup from "./popup";
import { Box, CircularProgress } from "@material-ui/core";
import {
  Snackbar,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { Context as DataContext } from "../../../../api/dataProvider";
import Search from "./search";
import Thumbnail from "../../../../assets/thumbnail1.png";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function createData(name, calories, fat, carbs, protein, status) {
  return { name, calories, fat, carbs, protein, status };
}

export default function SimpleTable({ data }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const {
    state: { users, user_count, message },
    fetchUser,
    fetchUsers,
    toggleUserStatus,
    clearMessage,
  } = useContext(DataContext);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [active, isActive] = useState(false);
  const [inActive, isInActive] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchUsers(page + 1);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchUsers(newPage + 1);
  };

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        style={{ zIndex: 3, position: "relative", width: "80vw" }}
      >
        <Box
          display="flex"
          alignItems="center"
          style={{ position: "absolute", top: "-8vh" }}
        >
          <Search active={active} inActive={inActive} />
          <FormGroup row style={{ marginLeft: "2rem" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={active}
                  onChange={() => {
                    if (!active) {
                      isInActive(false);
                      fetchUsers(null, null, null, 1);
                    }
                    if (active) {
                      fetchUsers();
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
                      fetchUsers(null, null, null, 0);
                    }
                    if (inActive) {
                      fetchUsers();
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
      </Box>
      <TableContainer
        dense={true}
        style={{
          height: "83vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        elevation={0}
        component={Paper}
      >
        {message && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openSnackbar}
            message={message}
            onClose={() => {
              setOpenSnackbar(false);
            }}
            autoHideDuration={1000}
          />
        )}
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow
              style={{
                background: "#f4f4f4",
                height: "3.4rem",
              }}
            >
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                {users && users.length > 0 && "Serial Number"}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Username
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Email Id
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Mobile No
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Created At
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          {users && users.length === 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              style={{ width: "85vw", height: "50vh" }}
            >
              <img src={Thumbnail} alt="No users" />
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                No Users Found!
              </p>
            </Box>
          )}
          {!users && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{ height: "70vh", width: "85vw" }}
            >
              <CircularProgress
                style={{
                  color: "#151628",
                }}
              />
            </Box>
          )}

          <TableBody>
            {users &&
              users.length > 0 &&
              users.map((x, i) => (
                <TableRow
                  elevation={0}
                  style={{
                    maxHeight: "3.4rem",
                    padding: "0px",
                    border: "none",
                  }}
                  key={x.user_id}
                >
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                      textAlign: "center",
                    }}
                    component="th"
                    scope="row"
                  >
                    {i + 1}
                    {/* {x.user_id} */}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                    }}
                  >
                    {x.full_name}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                    }}
                  >
                    {" "}
                    {x.email}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                    }}
                  >
                    {" "}
                    {x.phone}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                    }}
                  >
                    {" "}
                    {moment(x.created_at).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell
                    onClick={async () => {
                      await toggleUserStatus(
                        x.user_id,
                        +x.status === 1 ? 0 : 1
                      );
                      await fetchUsers(page + 1);
                      await clearMessage();
                    }}
                    style={{
                      cursor: "pointer",
                      color: x.status !== 1 ? "red" : "green",
                      fontWeight: 500,
                    }}
                  >
                    {x.status === 1 ? "Active" : "InActive"}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    <IconButton
                      onClick={async () => {
                        await fetchUser(x.user_id);
                        setOpen(true);
                      }}
                    >
                      <InfoOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={user_count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Popup classes={classes} open={open} setOpen={setOpen} />
    </React.Fragment>
  );
}
