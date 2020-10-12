import React from "react";
import Box from "@material-ui/core/Box";
import Lootbox from "../../lootbox.png";

const Home = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      style={{
        background: "#151628",
        width: "100%",
        height: "90vh",
      }}
    >
      <img
        className="animate__animated animate__zoomIn"
        src={Lootbox}
        // src={Logo}
        style={{
          height: "10rem",
          width: "10rem",
        }}
        alt="img"
      />
      <div
        className="animate__animated animate__fadeIn"
        style={{ textAlign: "center" }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: "2rem",
          }}
        ></p>
        <p
          style={{
            color: "#fff",
            opacity: 0.6,
            fontSize: "1rem",
          }}
        >
          welcome back to lootbox
          {/* lorem ipsum dolor sit amet, consectetur adipiscing */}
        </p>
      </div>
    </Box>
  );
};

export default Home;
