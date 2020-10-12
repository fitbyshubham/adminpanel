import React, { useState, useEffect } from "react";
import {
  Box,
  Fab,
  Backdrop,
  Paper,
  makeStyles,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { Add, Clear, CameraAlt } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [subValue, setSubValue] = useState(0);
  const [value, setValue] = useState(0);
  const [brandValue, setBrandValue] = useState(0);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    axios({
      url:
        "https://test-api.loot-box.co/api/admin/item/brand-list",
      method: "get",
      headers: {
        "X-Localization": "en",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyNzhiZjQ0MjM5YjIwNjVkYmZjZGNhNzU1ZTkxYzM3Nzc0MTk5Nzc4MWUwMzlmZGViOTE4ZjEwZWFjYzBlNWMyYmVlNzI5OGQyZGM4OGQiLCJpYXQiOjE1OTM0OTU1MzQsIm5iZiI6MTU5MzQ5NTUzNCwiZXhwIjoxNjI1MDMxNTM0LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.k690oN3lko2MEDhLCTgtAdvB6_FCla9_LhQLI2JvZxCyelgnOvZTUPZlZPSGWQ8gUaKeA9ELacNNpyhX_UFYnORVfrmWUrLxwxrzf337_aWGrA_4R4rPYSjL5RQaxwimBlYP1EdPRTGvuxzCn1cBdHEbRNLP2RMobK_2bHRNJ2VQjMDgeFJVjBEC0iIqKglZOLwIAQJ0roNAYBjbhxWFEuuANrv2U_vsENrbtsfQ1x9kF27O7x-8zkAATGJqmEng7U2GzI_lMjCMzcdAL55k9n4Hg8iyr3NeOwh1BCQ7tutpzO11Fzqydzna6CDVx6nP3Ov_DCCE_1MnjTUHYtnCAe7NcwC-4FvKqE2moUtEXK1NtHF1an52SrCExcSa1JiVx2veRl6sSFucXQQC9kE1N-MkDuoTdj9ZzWqcCXCGi1xx4S5x0NPgmiD--xh7sYGUMwG7xNPd7t1FZw0QHuHaFysM_Dea90TQ4XKtUA2_x9dG96QflGGkloW1DnEcZ-A8v2l8Klsl6cLXfBcsLimIzmVPSr7OdFxpgm0IBh3YQsxJNHrA0_DhLwZFe7px1OmWfRm_ed9UHpBxFsMeDDQ3uGgdzGn3-7tEW0MjYFzs2lvSWTcmndlPbrOaY-hkrOHH_zpjoL9klbQEpLIo3cwj7NNp0YfpW6owqssiqKIh7f4",
      },
    })
      .then((data) => {
        setData(data.data.data);
      })
      .catch((error) => console.log(error));
    axios({
      url: `https://test-api.loot-box.co/api/admin/category/list`,
      method: "get",
      headers: {
        "X-Localization": "en",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyNzhiZjQ0MjM5YjIwNjVkYmZjZGNhNzU1ZTkxYzM3Nzc0MTk5Nzc4MWUwMzlmZGViOTE4ZjEwZWFjYzBlNWMyYmVlNzI5OGQyZGM4OGQiLCJpYXQiOjE1OTM0OTU1MzQsIm5iZiI6MTU5MzQ5NTUzNCwiZXhwIjoxNjI1MDMxNTM0LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.k690oN3lko2MEDhLCTgtAdvB6_FCla9_LhQLI2JvZxCyelgnOvZTUPZlZPSGWQ8gUaKeA9ELacNNpyhX_UFYnORVfrmWUrLxwxrzf337_aWGrA_4R4rPYSjL5RQaxwimBlYP1EdPRTGvuxzCn1cBdHEbRNLP2RMobK_2bHRNJ2VQjMDgeFJVjBEC0iIqKglZOLwIAQJ0roNAYBjbhxWFEuuANrv2U_vsENrbtsfQ1x9kF27O7x-8zkAATGJqmEng7U2GzI_lMjCMzcdAL55k9n4Hg8iyr3NeOwh1BCQ7tutpzO11Fzqydzna6CDVx6nP3Ov_DCCE_1MnjTUHYtnCAe7NcwC-4FvKqE2moUtEXK1NtHF1an52SrCExcSa1JiVx2veRl6sSFucXQQC9kE1N-MkDuoTdj9ZzWqcCXCGi1xx4S5x0NPgmiD--xh7sYGUMwG7xNPd7t1FZw0QHuHaFysM_Dea90TQ4XKtUA2_x9dG96QflGGkloW1DnEcZ-A8v2l8Klsl6cLXfBcsLimIzmVPSr7OdFxpgm0IBh3YQsxJNHrA0_DhLwZFe7px1OmWfRm_ed9UHpBxFsMeDDQ3uGgdzGn3-7tEW0MjYFzs2lvSWTcmndlPbrOaY-hkrOHH_zpjoL9klbQEpLIo3cwj7NNp0YfpW6owqssiqKIh7f4",
      },
    })
      .then((data) => {
        setCategories(data.data.data);
      })
      .catch((error) => console.log(error));

    axios({
      url: `https://test-api.loot-box.co/api/admin/item/getitem?item_id=20`,
      method: "get",
      data:{
       item_id:20
      },
      headers: {
        "X-Localization": "en",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyNzhiZjQ0MjM5YjIwNjVkYmZjZGNhNzU1ZTkxYzM3Nzc0MTk5Nzc4MWUwMzlmZGViOTE4ZjEwZWFjYzBlNWMyYmVlNzI5OGQyZGM4OGQiLCJpYXQiOjE1OTM0OTU1MzQsIm5iZiI6MTU5MzQ5NTUzNCwiZXhwIjoxNjI1MDMxNTM0LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.k690oN3lko2MEDhLCTgtAdvB6_FCla9_LhQLI2JvZxCyelgnOvZTUPZlZPSGWQ8gUaKeA9ELacNNpyhX_UFYnORVfrmWUrLxwxrzf337_aWGrA_4R4rPYSjL5RQaxwimBlYP1EdPRTGvuxzCn1cBdHEbRNLP2RMobK_2bHRNJ2VQjMDgeFJVjBEC0iIqKglZOLwIAQJ0roNAYBjbhxWFEuuANrv2U_vsENrbtsfQ1x9kF27O7x-8zkAATGJqmEng7U2GzI_lMjCMzcdAL55k9n4Hg8iyr3NeOwh1BCQ7tutpzO11Fzqydzna6CDVx6nP3Ov_DCCE_1MnjTUHYtnCAe7NcwC-4FvKqE2moUtEXK1NtHF1an52SrCExcSa1JiVx2veRl6sSFucXQQC9kE1N-MkDuoTdj9ZzWqcCXCGi1xx4S5x0NPgmiD--xh7sYGUMwG7xNPd7t1FZw0QHuHaFysM_Dea90TQ4XKtUA2_x9dG96QflGGkloW1DnEcZ-A8v2l8Klsl6cLXfBcsLimIzmVPSr7OdFxpgm0IBh3YQsxJNHrA0_DhLwZFe7px1OmWfRm_ed9UHpBxFsMeDDQ3uGgdzGn3-7tEW0MjYFzs2lvSWTcmndlPbrOaY-hkrOHH_zpjoL9klbQEpLIo3cwj7NNp0YfpW6owqssiqKIh7f4",
      },
    })
      .then((data) => {
          var x=data.data.data
          setDescription({
              desc:x.description_en,
              desc_ar:x.description_ar
          })

        })
      .catch((error) => console.log(error));




  }, []);

  const fetchSubCategories = (id) => {
    axios({
      url:
        "https://test-api.loot-box.co/api/admin/subcategory/category-wise-list",
      method: "post",
      data: {
        category_id: id,
      },
      headers: {
        "X-Localization": "ar",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyNzhiZjQ0MjM5YjIwNjVkYmZjZGNhNzU1ZTkxYzM3Nzc0MTk5Nzc4MWUwMzlmZGViOTE4ZjEwZWFjYzBlNWMyYmVlNzI5OGQyZGM4OGQiLCJpYXQiOjE1OTM0OTU1MzQsIm5iZiI6MTU5MzQ5NTUzNCwiZXhwIjoxNjI1MDMxNTM0LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.k690oN3lko2MEDhLCTgtAdvB6_FCla9_LhQLI2JvZxCyelgnOvZTUPZlZPSGWQ8gUaKeA9ELacNNpyhX_UFYnORVfrmWUrLxwxrzf337_aWGrA_4R4rPYSjL5RQaxwimBlYP1EdPRTGvuxzCn1cBdHEbRNLP2RMobK_2bHRNJ2VQjMDgeFJVjBEC0iIqKglZOLwIAQJ0roNAYBjbhxWFEuuANrv2U_vsENrbtsfQ1x9kF27O7x-8zkAATGJqmEng7U2GzI_lMjCMzcdAL55k9n4Hg8iyr3NeOwh1BCQ7tutpzO11Fzqydzna6CDVx6nP3Ov_DCCE_1MnjTUHYtnCAe7NcwC-4FvKqE2moUtEXK1NtHF1an52SrCExcSa1JiVx2veRl6sSFucXQQC9kE1N-MkDuoTdj9ZzWqcCXCGi1xx4S5x0NPgmiD--xh7sYGUMwG7xNPd7t1FZw0QHuHaFysM_Dea90TQ4XKtUA2_x9dG96QflGGkloW1DnEcZ-A8v2l8Klsl6cLXfBcsLimIzmVPSr7OdFxpgm0IBh3YQsxJNHrA0_DhLwZFe7px1OmWfRm_ed9UHpBxFsMeDDQ3uGgdzGn3-7tEW0MjYFzs2lvSWTcmndlPbrOaY-hkrOHH_zpjoL9klbQEpLIo3cwj7NNp0YfpW6owqssiqKIh7f4",
      },
    }).then((data) => {
      setSubCategories(data.data.data);
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ padding: "1rem 2rem", height: "90vh" }}
    >
      <Fab
        onClick={() => {
          setOpen(true);
        }}
        color="secondary"
      >
        <Add />
      </Fab>
      <Backdrop open={open} className={classes.backdrop}>
        <Paper
          style={{
            position: "absolute",
            top: "10vh",
            maxHeight: "70vh",
            overflowY: "scroll",
            width: "27rem",
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
          <Box style={{ padding: "0 2rem 2rem" }}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0" }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    fontWeight: 600,
                  }}
                >
                  Select Category :
                </p>
                <FormControl style={{ width: "47%" }}>
                  {/* <InputLabel id="categories">Category</InputLabel> */}
                  <Select
                    // labelId="categories"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      fetchSubCategories(e.target.value);
                    }}
                  >
                    {categories &&
                      categories.map((i, k) => (
                        <MenuItem value={i["category_id"]}>
                          {i["name_en"]}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0" }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    fontWeight: 600,
                  }}
                >
                  Select Sub-Category :
                </p>
                <FormControl style={{ width: "47%" }}>
                  {/* <InputLabel id="sub-categories">Sub Category</InputLabel> */}
                  <Select
                    // labelId="sub-categories"
                    value={subValue}
                    onChange={(e) => {
                      setSubValue(e.target.value);
                    }}
                  >
                    {subCategories ? (
                      subCategories.map((i, k) => (
                        <MenuItem value={k}>{i["name_en"]}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value={0}></MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0" }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    fontWeight: 600,
                  }}
                >
                  Select Brand :
                </p>

                <Select
                  //   labelId="sub-categories"
                  style={{
                    width: "47%",
                  }}
                  value={brandValue}
                  onChange={(e) => {
                    setBrandValue(e.target.value);
                  }}
                >
                  {data &&
                    data.map((i, k) => (
                      <MenuItem value={k}>{i["name_en"]}</MenuItem>
                    ))}
                </Select>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <TextField
                variant="outlined"
                label="name"
                style={{ width: "47%" }}
              />
              <TextField
                variant="outlined"
                label="name_ar"
                style={{ width: "47%" }}
              />
            </Box>

            {description && (
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#282b3c",
                      fontWeight: 600,
                    }}
                  >
                    Description_en :
                  </p>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    defaultValue={description.desc}
                    // placeholder="placeholder text"
                    style={{ width: "47%", opacity: 0.8 }}
                  />
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{ margin: "2rem 0" }}
                >
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#282b3c",
                      fontWeight: 600,
                    }}
                  >
                    Description_ar :
                  </p>
                  <TextField
                    multiline
                    rows={4}
                    defaultValue={description.desc_ar}
                    variant="outlined"
                    style={{ width: "47%", opacity: 0.8 }}
                  />
                </Box>
              </Box>
            )}

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0" }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    fontWeight: 600,
                  }}
                >
                  Price :
                </p>
                <TextField variant="outlined" style={{ width: "47%" }} />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0" }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    fontWeight: 600,
                  }}
                >
                  Image :
                </p>
                <Paper style={{ width: "47%" }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      height: "20vh",
                      cursor: "pointer",
                    }}
                  >
                    <IconButton>
                      <CameraAlt />
                    </IconButton>
                  </Box>
                </Paper>
              </Box>{" "}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row-reverse"
            style={{
              marginTop: "1rem",
              marginRight: "2rem",
            }}
          >
            <Fab 
            onClick={() => {
                setOpen(false);
            }}
            variant="extended" color="primary">
              Save
            </Fab>
          </Box>
        </Paper>
      </Backdrop>
    </Box>
  );
};

export default Notifications;
