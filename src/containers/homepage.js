import React, { useState } from "react";
import Content from "../components/content";
import Sidebar from "../components/sidebar";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { withRouter } from "react-router-dom";

const Homepage = ({ user }) => {
  const [open, setOpen] = useState(true);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#e6ebed",
        //   position: "absolute",
        //   bottom: 0,
      }}
    >
      <Sidebar />
      <Box style={{ width: "85%", height: "100vh" }}>
        <Box
          style={{
            height: "10vh",
            width: "100%",
            background: "#282b3c",
            position: "fixed",
            top: 0,
            zIndex: 2,
          }}
        ></Box>
        <div style={{ marginTop: "10vh" }}>
          <Content />
        </div>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        message={`Welcome Back ${user.first_name}`}
        autoHideDuration={1000}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(withRouter(Homepage));
