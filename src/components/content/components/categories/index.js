import React, { useState, useEffect } from "react";
import Table from "./table";
import { Box, CircularProgress } from "@material-ui/core";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from "./search";
import Api from "../../../../api";

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    Api("admin/category/list")
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {/* <Box display="flex">
          <Fab
            size="medium"
            color="secondary"
            aria-label="add"
            style={{
              marginRight: 10,
            }}
          >
            <AddIcon />
          </Fab>
          <Fab variant="extended" color="primary" aria-label="add">
            Action
            <ExpandMoreIcon />
          </Fab>
        </Box> */}

      <Box
        display="flex"
        flexDirection="row-reverse"
        style={{ padding: "0 2rem", position: "absolute", right: 2, top: "2vh" }}
      >
        <Search />
      </Box>
      <div
        style={{
          // marginTop: "20vh",
          position: "absolute",
          bottom: 0,
          display: loading ? "flex" : "",
          alignItems: "center",
          justifyContent: "center",
          width: "85%",
          height: loading ? "90vh" : "",
          background: "#fff",
        }}
      >
        {loading ? (
          <CircularProgress
            style={{
              margin: "auto",
              color: "#151628",
            }}
          />
        ) : (
          <React.Fragment>
            <Table data={data} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Category;
