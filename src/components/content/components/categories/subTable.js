import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { ArrowBack } from "@material-ui/icons";
import { Tooltip, Fab } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditDialog from "./editDialog";
import Api from "../../../../api";
import Search from "./search";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DenseTable({
  fetchSubCategories,
  setOpenSubCategory,
  rows,
  classes1,
  setCurrent,
  openEditDialog,
  setOpenEditDialog,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  const fetchCustomFields = useCallback(
    async (id) => {
      Api(`admin/subcategory/custom-fields?sub_category_id=${id}`).then(
        (data) => {
          var x = data.data.data.map((x) => ({
            id: x["custom_field_id"],
            name: x["name_en"],
            name_ar: x["name_ar"],
          }));
          setData(x);
        }
      );
    },
    [openEditDialog, setOpenEditDialog]
  );

  return (
    <React.Fragment>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          margin: "0 2rem",
        }}
      >
        <Search />
      </Box>
      <br />
      {!open && (
        <TableContainer
          style={{ marginTop: "2rem" }}
          elevation={0}
          component={Paper}
        >
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                  S.no
                </TableCell>
                <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                  Name
                </TableCell>
                <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                  عربى
                </TableCell>
                <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                  Status
                </TableCell>
                <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                  Custom Fields
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!rows ? (
                <CircularProgress />
              ) : (
                rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell style={{ color: "#a197a3" }}>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ color: "#a197a3" }}>
                      {row.name_ar}
                    </TableCell>
                    <TableCell
                      style={{
                        // paddingLeft: "2rem",
                        // color: "#8095a1",
                        color: row.status === 1 ? "green" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {/* <Chip
                        style={{
                          color: "#6cc07f",
                          background: "#fff",
                          fontWeight: 600,
                        }}
                        label={row.status}
                      /> */}
                      {row.status === 1 ? "Active" : "InActive"}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#a197a3",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "20%",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          fetchCustomFields(row.id);
                        }}
                        style={{
                          color: "#3f51b5",
                        }}
                      >
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setCurrent(false);
                          setOpenEditDialog(true);
                          setSelected(row);
                          fetchCustomFields(row.id);
                        }}
                        style={{ color: "orange" }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {open && (
        <Box>
          <Tooltip title="Go Back" placement="right">
            <Fab
              onClick={() => {
                setOpen(false);
                setData(null);
              }}
              size="medium"
              color="secondary"
              aria-label="add"
            >
              <ArrowBack />
            </Fab>
          </Tooltip>
          <TableContainer
            style={{ marginTop: "1rem" }}
            elevation={0}
            component={Paper}
          >
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                    Id
                  </TableCell>
                  <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                    اسم
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data ? (
                  data.map((i, k) => (
                    <TableRow key={k}>
                      <TableCell component="th" scope="row">
                        {i.id}
                      </TableCell>
                      <TableCell style={{ color: "#a197a3" }}>
                        {i.name}
                      </TableCell>
                      <TableCell style={{ color: "#a197a3" }}>
                        {i.name_ar}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <CircularProgress size={27} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <EditDialog
        classes1={classes1}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        fetchSubCategories={fetchSubCategories}
        current={selected}
        data={data}
        setData={setData}
        setOpen={setOpenSubCategory}
      />
    </React.Fragment>
  );
}
