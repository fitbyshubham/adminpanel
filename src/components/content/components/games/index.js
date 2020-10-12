import React, { useEffect, useState, useContext } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import AddItem from "./addItem";
import Table from "./table";
import { Context as DataContext } from "../../../../api/dataProvider";

const Items = () => {
  const {
    state: { items },
    fetchItems,
    fetchGames
  } = useContext(DataContext);
  const [loading, isLoading] = useState(false);

  const getGames = async () => {
    await fetchGames();
    isLoading(true);
  };

  useEffect(() => {
    getGames();
  }, []);
  return (
    <Box>
      <Box style={{ position: "absolute", top: 1, right: "2vw" }}>
        <AddItem />
      </Box>
      {!loading ? (
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
        <Box
          style={{
            background: "#fff",
            position: "absolute",
            bottom: 0,
            width: "85%",
            height:"90vh"
          }}
        >
          <Table data={items} />
        </Box>
      )}{" "}
    </Box>
  );
};

export default Items;
