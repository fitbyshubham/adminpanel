import React, { useContext, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Box,
  Backdrop,
  Paper,
  IconButton,
  TableCell,
} from "@material-ui/core";
import { Clear, EditOutlined, VisibilityOutlined } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";
import Package from "./viewPackage";
import EditPackage from "./editPackage";

const ViewPackages = ({ classes, open, setOpen }) => {
  const {
    state: { game_packages, game_details },
    fetchPackage,
    fetchGamePackages,
    togglePackage,
  } = useContext(DataContext);
  const [openPackageDialog, setOpenPackageDialog] = useState(false);
  const [openEditPackageDialog, setOpenEditPackageDialog] = useState(false);

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Paper
        style={{
          position: "absolute",
          top: "7vh",
          maxHeight: "80vh",
          overflowY: "scroll",
          width: "70vw",
          height: "70vh",
          overflowX: "hidden",
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
        {game_packages && (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow style={{ background: "#f4f4f4", height: "3.4rem" }}>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      color: "#282b3c",
                    }}
                  >
                    S.No.
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      color: "#282b3c",
                    }}
                  >
                    English Name
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      color: "#282b3c",
                    }}
                  >
                    Arabic Name
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      color: "#282b3c",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      color: "#282b3c",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {game_packages.map((i, k) => (
                  <TableRow key={k}>
                    <TableCell
                      style={{
                        color: "#8095a1",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      {k + 1}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#8095a1",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      {i.name_en}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#8095a1",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      {i.name_ar}
                    </TableCell>
                    <TableCell
                      onClick={async () => {
                        await togglePackage(
                          i.package_id,
                          +i.status == 1 ? 0 : 1
                        );
                        await fetchGamePackages(game_details.game_id);
                      }}
                      style={{
                        cursor: "pointer",
                        fontWeight: 500,
                        textAlign: "center",
                        color: +i.status != 1 ? "red" : "green",
                      }}
                    >
                      {+i.status == 1 ? "Active" : "InActive"}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#8095a1",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          onClick={async () => {
                            await fetchPackage(i.package_id);
                            setOpenEditPackageDialog(true);
                          }}
                        >
                          <EditOutlined style={{ cursor: "pointer" }} />{" "}
                        </IconButton>
                        <IconButton
                          onClick={async () => {
                            await fetchPackage(i.package_id);
                            setOpenPackageDialog(true);
                          }}
                        >
                          <VisibilityOutlined style={{ cursor: "pointer" }} />{" "}
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <Package
        classes={classes}
        open={openPackageDialog}
        setOpen={setOpenPackageDialog}
      />
      <EditPackage
        classes={classes}
        open={openEditPackageDialog}
        setOpen={setOpenEditPackageDialog}
      />
    </Backdrop>
  );
};

export default ViewPackages;
