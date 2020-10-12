import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import Check from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Popup from "./popup";
import { withRouter } from "react-router-dom";
import Api from "../../../../api";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function createData(id, name, name_ar, status) {
  return { id, name, name_ar, status };
}

function SimpleTable({ data }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [subCategories, setSubCategories] = useState(null);
  const [data1, setData1] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const fetchSubCategories = useCallback(
    async (id) => {
      setCategoryId(id);
      setSubCategories(null);
      await Api.post("admin/subcategory/category-wise-list", {
        category_id: id,
      }).then((data) => {
        var x = data.data.data.map((x) => ({
          id: x.sub_category_id,
          categoryId: x.category_id,
          name: x.name_en,
          name_ar: x.name_ar,
          status: x.status,
        }));
        setSubCategories(x);
      });
    },
    [categoryId, open, openEditDialog, setOpenEditDialog]
  );

  async function getSubCategories(rows) {
    return await Promise.all(
      rows.map(async (x) => {
        try {
          const z = await Api.post("admin/subcategory/category-wise-list", {
            category_id: x,
          }).then((data) => {
            var obj = {};
            obj[x] = data.data.data.length;
            return obj;
          });
          return z;
        } catch (err) {}
      })
    );
  }

  const getSub = useCallback(async () => {
    var y = await convertRows(data.data.data).map((i) => i.id);
    const z = await getSubCategories(y);
    setData1(z);
  }, [data, open]);

  useEffect(() => {
    getSub();
  }, [data, open]);

  const convertRows = (data) => {
    return data.map((i, k) =>
      createData(i["category_id"], i["name_en"], i["name_ar"], i["status"])
    );
  };

  const [rows, setRows] = useState(convertRows(data.data.data));
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    Api(`admin/user/list?page=${newPage + 1}`)
      .then((data) => {
        console.log(data.data.data);
        setRows(convertRows(data.data.data));
        setPage(newPage);
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <TableContainer
        style={{ height: "90vh" }}
        elevation={0}
        component={Paper}
      >
        <Table size="small" className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                background: "#f4f4f4",
                height: "3.4rem",
              }}
            >
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  // marginLeft: "2.5rem",
                  textAlign: "center",
                }}
              >
                S No.
                {/* Category Id */}
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
                  // textAlign: "center",
                  paddingLeft: "3rem",
                }}
              >
                Sub Category
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
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, i) => (
                <TableRow
                  elevation={0}
                  style={{
                    height: "3rem",
                    padding: "0px",
                    border: "none",
                  }}
                  key={i}
                >
                  <TableCell
                    style={{
                      paddingLeft: "4rem",
                      color: "#8095a1",
                      fontWeight: 500,
                      // textAlign: "center",
                    }}
                  >
                    {i + 1}
                    {/* {row.id} */}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.name}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.name_ar}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    <Button
                      onClick={() => {
                        setOpen(true);
                        fetchSubCategories(row.id);
                      }}
                      style={{
                        textTransform: "none",
                        fontSize: 12,
                        color: "#8095a1",
                        fontWeight: 600,
                        width: "10rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {data1 &&
                        data1[i][row.id] > 0 &&
                        `${data1[i][row.id]} - `}
                      {data1 && "Add Sub Category"}
                    </Button>{" "}
                  </TableCell>
                  <TableCell
                    style={{
                      // paddingLeft: "2rem",
                      // color: "#8095a1",
                      color: row.status === 1 ? "green" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {row.status === 1 ? "Active" : "InActive"}
                  </TableCell>
                  <TableCell
                    style={{ color: "#8095a1", fontWeight: 500 }}
                  ></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        style={{ background: "#fff" }}
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={10}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
      <Popup
        categoryId={categoryId}
        fetchSubCategories={fetchSubCategories}
        rows={subCategories}
        classes={classes}
        setOpen={setOpen}
        open={open}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
      />
    </React.Fragment>
  );
}

export default withRouter(SimpleTable);
