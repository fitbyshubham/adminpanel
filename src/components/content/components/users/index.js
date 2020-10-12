import React, { useEffect, useState, useContext } from "react";

import { Box, CircularProgress } from "@material-ui/core";

import Table from "./table";
import { Context as DataContext } from "../../../../api/dataProvider";

const Users = () => {
  const [loading, isLoading] = useState(false);
  const {
    state: { users },
    fetchUsers,
  } = useContext(DataContext);

  const loadUsers = async () => {
    await fetchUsers();
  };

  useEffect(() => {
    loadUsers();
    isLoading(true);
  }, []);

  return (
    <Box>
      <Box
        style={{
          width: "85%",
          height: "90vh",
          background: "#fff",
          position: "absolute",
          bottom: 0,
          display: !loading ? "flex" : "",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!users? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ height: "60vh" }}
        >
          <CircularProgress
            style={{
              margin: "auto",
              color: "#151628",
              position: "relative",
              top: "10vh",
            }}
          />
        </Box>
        ) : (
          <Table />
        )}
      </Box>
    </Box>
  );
};

export default Users;
