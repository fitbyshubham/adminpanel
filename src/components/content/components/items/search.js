import React, { useState, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Context as DataContext } from "../../../../api/dataProvider";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "20rem",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: "#3d4977",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase({ active, inActive }) {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const { fetchItems } = useContext(DataContext);
  const [searched, setSearched] = useState(false);
  const search = useRef();
  const { reset, handleSubmit, register } = useForm();

  const onSubmit = (data) => {};

  return (
    <Paper component="form" className={classes.root}>
      {!searched ? (
        <IconButton
          onClick={async () => {
            if (value) {
              if (active) await fetchItems(null, null, value, 1);
              else if (inActive) {
                await fetchItems(null, null, value, 0);
              } else {
                await fetchItems(null, null, value,null);
              }
            }
            setSearched(true);
            // setValue(null);
          }}
          className={classes.iconButton}
          aria-label="menu"
        >
          <SearchIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            setValue("");
            fetchItems();
            setSearched(false);
          }}
          className={classes.iconButton}
          aria-label="menu"
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBase
          value={value}
          name="search"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          ref={register()}
          className={classes.input}
          placeholder="Search "
        />
      </form>
    </Paper>
  );
}
