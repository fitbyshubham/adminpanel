import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { Context as DataContext } from "../../../../api/dataProvider";
import { Box, CircularProgress, Snackbar, IconButton } from "@material-ui/core";
import moment from "moment";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Popup from "./popup";
import Thumbnail from "../../../../assets/thumbnail1.png";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
// import EditItem from "./editItem";

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
  const [openEditDialog, setOpenEditDialog]=useState(false);

  const {
    state: { items, items_count, page_count, message },
    fetchItems,
    toggleItemStatus,
    fetchItem,
    clearMessage,
  } = useContext(DataContext);

  const convertRows = () => {
    console.log(items);
    return (
      items &&
      items.map((i, k) =>
        createData(
          i["item_id"],
          i["name_en"],
          i["name_ar"],
          i["created_at"],
          i["price"],
          i["status"]
        )
      )
    );
  };

  const [rows, setRows] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(true);

  useEffect(() => {
    setRows(null);
    setRows(convertRows());
  }, [items, fetchItems]);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchItems(page + 1, +event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
    fetchItems(newPage + 1, rowsPerPage);
  };

  return (
    <React.Fragment>
      <TableContainer
        style={{
          height: "83vh",
          width: "100%",
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

        <Table
          style={{ width: "100%" }}
          className={classes.table}
          aria-label="simple table"
          size="small"
        >
          <TableHead>
            <TableRow
              style={{
                background: "#f4f4f4",
                height: "3.4rem",
                width: "85vw",
              }}
            >
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                S No
                {/* Item Id */}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                اسم
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
                Price
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
                  paddingLeft: "2rem",
                  color: "#282b3c",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {items && items.length === 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              style={{ width: "85vw", height: "50vh" }}
            >
              <img src={Thumbnail} alt="No items" />
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                No Items Found!
              </p>
            </Box>
          )}

          {!items && (
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
            {items &&
              items.length > 0 &&
              items.map((row, i) => (
                <TableRow
                  elevation={0}
                  style={{
                    height: "3.4rem",
                    padding: "0px",
                    border: "none",
                  }}
                  key={row.item_id}
                >
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                    component="th"
                    scope="row"
                  >
                    {i + 1}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.name_en}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.name_ar}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {moment(row.created_at).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.price}
                  </TableCell>
                  <TableCell
                    onClick={async () => {
                      console.log(row.item_id, +row.status === 1 ? 0 : 1);
                      await toggleItemStatus(
                        row.item_id,
                        +row.status === 1 ? 0 : 1
                      );
                      await fetchItems(page + 1);
                      await clearMessage();
                    }}
                    style={{
                      cursor: "pointer",
                      color: row.status !== 1 ? "red" : "green",
                      fontWeight: 500,
                    }}
                  >
                    {row.status === 1 ? "Active" : "InActive"}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <IconButton
                        onClick={async () => {
                          await fetchItem(row.item_id);
                          setOpen(true);
                        }}
                      >
                        <VisibilityOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                      </IconButton>
                      <IconButton
                        onClick={async () => {
                          await fetchItem(row.item_id);
                          setOpenEditDialog(true);
                        }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        page={page}
        count={items_count}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Popup classes={classes} open={open} setOpen={setOpen} />
      {/* <EditItem
        classes={classes}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      /> */}
    </React.Fragment>
  );
}
