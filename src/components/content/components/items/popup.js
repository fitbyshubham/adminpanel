import React, { useState, useContext } from "react";
import {
  Backdrop,
  Paper,
  Box,
  IconButton,
  Avatar,
  TextField,
  Fab,
} from "@material-ui/core";
import Img from "../../../../assets/thumbnail1.png";
import { Context as DataContext } from "../../../../api/dataProvider";
import moment from "moment";
import Clear from "@material-ui/icons/Clear";

const Popup = ({ classes, open, setOpen }) => {
  const {
    state: { item_details },
  } = useContext(DataContext);

  return (
    <Backdrop open={open} className={classes.backdrop}>
      {item_details && (
        <Paper
          style={{
            height: "80vh",
            overflowY: "scroll",
            width: "60vw",
            position: "absolute",
            top: "5vh",
            background: "#fff",
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
          <Box
            style={{
              padding: "2rem",
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Avatar
                src={
                  item_details
                    ? item_details.image.length > 1 && item_details.image
                    : Img
                }
                style={{ width: "150px", height: "150px", marginRight: "2rem" }}
                variant="rounded"
              ></Avatar>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <TextField
                  defaultValue={item_details && item_details.name_en}
                  variant="outlined"
                  disabled
                  label="Name_en"
                />
                <TextField
                  defaultValue={item_details && item_details.name_ar}
                  variant="outlined"
                  disabled
                  label="Name_ar"
                />
              </Box>
              <TextField
                rows={7}
                multiline
                disabled
                label="Description_en"
                variant="outlined"
                value={item_details && item_details.description_en}
              />
              <TextField
                rows={7}
                multiline
                disabled
                label="Description_ar"
                variant="outlined"
                defaultValue={item_details && item_details.description_ar}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "2rem 0" }}
            >
              <TextField
                defaultValue={
                  item_details && item_details.price ? item_details.price : null
                }
                variant="outlined"
                disabled
                label="Price"
                type="number"
              />
              <TextField
                defaultValue={
                  item_details && item_details.status === 1
                    ? "Active"
                    : "InActive"
                }
                variant="outlined"
                disabled
                label="Status"
              />
              <TextField
                variant="outlined"
                id="date"
                disabled
                label="created_at"
                // type="date"
                value={
                  item_details &&
                  moment(new Date(item_details.created_at)).format(
                    "DD MMM YYYY"
                  )
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "2rem 0" }}
            >
              <TextField
                variant="outlined"
                defaultValue={item_details && item_details.link_item_id}
                label="link_item_id"
                type="number"
                disabled
              />
              <TextField
                variant="outlined"
                defaultValue={item_details && item_details.category_id}
                label="category"
                disabled
              />
              <TextField
                variant="outlined"
                defaultValue={item_details && item_details.sub_category_id}
                label="sub-category"
                disabled
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <p style={{ fontWeight: "bold" }}>Custom Fields</p>
            </Box>

            {item_details &&
              item_details.custom_fields_values.map((i, k) => (
                <Box
                  key={k}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ margin: "2rem 0" }}
                >
                  <p>{i.name_en}</p>

                  <TextField
                    variant="outlined"
                    label="value_en"
                    defaultValue={i.value_en}
                    disabled
                  />
                  <TextField
                    variant="outlined"
                    label="value_ar"
                    defaultValue={i.value_ar}
                    disabled
                  />
                </Box>
              ))}

            <Box display="flex" flexDirection="row-reverse">
              <Fab
                onClick={() => {
                  console.log(item_details);
                }}
                disabled
                type="submit"
                variant="extended"
                color="primary"
              >
                Save
              </Fab>
            </Box>
          </Box>
        </Paper>
      )}
    </Backdrop>
  );
};

export default Popup;
