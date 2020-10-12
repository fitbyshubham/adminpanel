import React from 'react'
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import {useHistory} from 'react-router-dom'
import Lootbox from '../../lootbox.png'
import Logo from "../../logo.png";

const Topbar = () => {
    const history = useHistory()
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        style={{
          // borderRight: "1px solid #504b58",
          // borderBottom: "1px solid #504b58",
          width: "15vw",
          height: "10vh",
          position: "fixed",
          zIndex: 2,
          background: "#282b3c",

          // :'0 2rem'
        }}
      >
        <p
          style={{
            color: "#fff",
            // opacity: 0.6,
            fontSize: "1rem",
            marginLeft: "1rem",
          }}
        >
          <img
          // src={Lootbox}
          src={Logo}
          alt="Lootbox"
          style={{
            // width:"3.6rem",
            height:"1.5rem",
            cursor:'pointer',
            marginLeft:"0.7rem"
          }}
          />
          {/* Lootbox */}
        </p>
        <IconButton
          onClick={() => {
            history.push("/");
          }}
        >
          <HomeIcon
            style={{
              color: "#fff",
              opacity: history.location.pathname === "/" ? 1 : 0.6,
            }}
          />
        </IconButton>
      </Box>
    );
}

export default Topbar
