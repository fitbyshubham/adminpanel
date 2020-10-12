import React from "react";
import Button from "@material-ui/core/Button";
import ScrollArea from "react-scrollbar";
import Topbar from "./topbar";
import Box from "@material-ui/core/Box";
import { useHistory, withRouter, Link } from "react-router-dom";
import { options } from "./data";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/reducers/actionTypes";
import Cookie from "js-cookie";

const Sidebar = ({ dispatch }) => {
  const history = useHistory();
  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        width: "15%",
        maxWidth: "15rem",
        minHeight: "110vh",
        overflowY: "scroll",
      }}
    >
      <Box
        style={{
          height: "9.9vh",
          width: "100%",
          background: "#282b3c",
          paddingRight: "1px",
        }}
      >
        <Topbar />
        <Box
          style={{
            background: "#282b3c",
            borderRight: "1px solid #504b58",
            borderBottom: "1px solid #504b58",
            width: "100%",
            minHeight: "110vh",
            marginTop: "10vh",
            marginBottom: 0,
          }}
        >
          <ScrollArea speed={0.8} horizontal={false}>
            {options.map((i, k) => (
              <Box key={k}>
                <Button
                  onClick={() => {
                    history.push(i.path);
                  }}
                  style={{
                    width: "100%",
                    textTransform: "none",
                    paddingLeft: "1rem",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    style={{
                      width: "100%",
                      color: "#fff",
                      opacity: history.location.pathname === i.path ? 1 : 0.6,
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      style={{ width: "2rem" }}
                    >
                      {i.icon}
                    </Box>
                    <p
                      style={{
                        marginLeft: "0.8rem",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      {i.id}
                    </p>
                  </Box>
                </Button>
                <Box>
                  {i.paths.includes(history.location.pathname) &&
                    i.options.map((a, b) => (
                      <Button
                        key={b}
                        onClick={() => {
                          history.push(a.path);
                        }}
                        style={{
                          width: "100%",
                          textTransform: "none",
                          color: "#fff",
                          opacity:
                            history.location.pathname === a.path ? 1 : 0.6,
                          display: "flex",
                          justifyContent: "flex-start",
                          paddingLeft: "4rem",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          {a.name}
                        </p>
                      </Button>
                    ))}
                </Box>
              </Box>
            ))}
            <Button
              onClick={() => {
                Cookie.set("token", null);
                dispatch(setCurrentUser(null));
              }}
              style={{
                width: "100%",
                textTransform: "none",
                paddingLeft: "1rem",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                style={{
                  width: "100%",
                  color: "#fff",
                  opacity: 0.6,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "2rem" }}
                >
                  <ExitToAppOutlinedIcon />
                </Box>

                <Link
                  to="/"
                  style={{
                    marginLeft: "0.8rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#fff",
                    opacity: 0.8,
                    textDecoration: "none",
                  }}
                >
                  <p>Logout</p>
                </Link>
              </Box>
            </Button>
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  );
};

export default connect(null)(withRouter(Sidebar));
