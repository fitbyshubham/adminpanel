import React, { useState, useEffect, useContext } from "react";
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
  Input,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
  CircularProgress,
} from "@material-ui/core";
import { Add, Clear, CameraAlt } from "@material-ui/icons";
import Api from "../../../../api";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";
import { uploadFile } from "react-s3";
import Search from "./search";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AddItem = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [subValue, setSubValue] = useState("a");
  const [value, setValue] = useState(null);
  const [brandValue, setBrandValue] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const [desc_en, setDescEn] = useState("");
  const [desc_ar, setDescAr] = useState("");
  const {
    addItem,
    fetchItems,
    fetchLinkableItems,
    state: { linkableItems },
  } = useContext(DataContext);
  const [customFields, setCustomFields] = useState([]);
  const [fields, setFields] = useState([]);
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [active, isActive] = useState(false);
  const [inActive, isInActive] = useState(false);
  const [item_available, is_item_available] = useState(false);
  const [item_value, setItemValue] = useState(null);
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChangeMultiple = (e) => {
    setItems(e.target.value);
  };

  const handleImgChange = (e) => {
    var file1 = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      setFile(reader.result);
      console.log(file);
    };
    reader.readAsDataURL(file1);
  };

  const handleChange = (e) => {
    setFields(e.target.value);
  };

  const handleSubmit1 = async (data) => {
    const y = [];
    var x = Object.values(data);
    for (let i = 0; i < x.length; i += 2) {
      y.push({
        custom_field_id: customFields[i / 2]["custom_field_id"],
        value_en: x[i],
        value_ar: x[i + 1],
      });
    }
    await handleSave(y);
  };

  useEffect(() => {
    Api("admin/item/brand-list")
      .then((data) => {
        setData(data.data.data);
      })
      .catch((error) => console.log(error));
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    await Api(`admin/category/list`)
      .then((data) => {
        setCategories(data.data.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchSubCategories = (id) => {
    Api.post("admin/subcategory/category-wise-list", {
      category_id: id,
    }).then(async (data) => {
      console.log(data);
      await fetchLinkableItems();
      setSubCategories(data.data.data);
    });
  };

  const fetchCustomFields = async (id) => {
    await Api.post(`admin/subcategory/subcategory-by-id`, {
      sub_category_id: ` ${subCategories[id]["sub_category_id"]}`,
    }).then((data) => {
      if (subCategories[id]["link_item_available"]) {
        is_item_available(true);
      }
      console.log(data.data.data);
      setFields(
        data.data.data.custom_fields.map((i, k) => {
          return `${i["name_en"]} ${i["name_ar"]} ${i["custom_field_id"]}`;
        })
      );
      setCustomFields(data.data.data.custom_fields);
    });
  };

  const handleSave = async (y) => {
    console.log({
      category_id: subCategories[subValue]["category_id"],
      sub_category_id: subCategories[subValue]["sub_category_id"],
      brand_id: data[brandValue]["brand_id"],
      name_en: name_en,
      name_ar: name_ar,
      description_en: desc_en,
      description_ar: desc_ar,
      image: file,
      price: price ? +price : 0,
      status: 1,
      item_custom_values: y,
    });
    setDisabled(true);
    if (items && items.length > 0) {
      await addItem({
        category_id: subCategories[subValue]["category_id"],
        sub_category_id: subCategories[subValue]["sub_category_id"],
        brand_id: data[brandValue]["brand_id"],
        name_en: name_en,
        link_item_id: items,
        name_ar: name_ar,
        description_en: desc_en,
        description_ar: desc_ar,
        image: imgFile,
        price: price ? +price : 0,
        status: 1,
        item_custom_values: y,
      });
    } else {
      await addItem({
        category_id: subCategories[subValue]["category_id"],
        sub_category_id: subCategories[subValue]["sub_category_id"],
        brand_id: data[brandValue]["brand_id"],
        name_en: name_en,
        name_ar: name_ar,
        description_en: desc_en,
        description_ar: desc_ar,
        image: imgFile,
        price: price ? +price : 0,
        status: 1,
        item_custom_values: y,
      });
    }

    setSubCategories(null);
    setCategories(null);
    setNameEn("");
    setNameAr("");
    setDescEn("");
    setDescAr("");
    setValue(null);
    setBrandValue(null);
    setDescription(null);
    setItemValue(null);
    setCustomFields(null);
    setPrice(0);
    setChecked(false);
    setFile(null);
    await fetchItems();
    await fetchCategories();
    setDisabled(false);
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ padding: "0.2rem 2rem" }}
    >
      <form onSubmit={handleSubmit(handleSubmit1)}>
        <input
          accept=".png,.jpeg,.jpg"
          onChange={(e) => {
            handleImgChange(e);
            setImgFile(e.target.files[0]);
            setFile(e.target.files[0]);
          }}
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
        />
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ zIndex: 3, position: "relative", width: "80vw" }}
        >
          <Box display="flex" alignItems="center">
            <Search active={active} inActive={inActive} />
            <FormGroup row style={{ marginLeft: "2rem" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={active}
                    onChange={() => {
                      if (!active) {
                        isInActive(false);
                        fetchItems(null, null, null, 1);
                      }
                      if (active) {
                        fetchItems();
                      }
                      isActive(!active);
                    }}
                    name="checkedA"
                    color="primary"
                  />
                }
                label={<p style={{ color: "#fff" }}>Active</p>}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={inActive}
                    onChange={() => {
                      if (!inActive) {
                        isActive(false);
                        fetchItems(null, null, null, 0);
                      }
                      if (inActive) {
                        fetchItems();
                      }
                      isInActive(!inActive);
                    }}
                    name="InActive"
                  />
                }
                label={<p style={{ color: "#fff" }}>InActive</p>}
              />
            </FormGroup>
          </Box>

          <Box display="flex">
            <p
              onClick={() => {
                setOpen(true);
              }}
              style={{
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
                position: "relative",
                top: -5,
                zIndex: 3,
                marginRight: "1.5rem",
              }}
            >
              Add Item
            </p>
          </Box>
        </Box>
        <Backdrop open={open} className={classes.backdrop}>
          <Paper
            style={{
              position: "absolute",
              top: "7vh",
              maxHeight: "80vh",
              overflowY: "scroll",
              width: "70vw",
              padding: "2rem",
            }}
          >
            <Box display="flex" flexDirection="row-reverse">
              <IconButton
                onClick={() => {
                  setSubCategories(null);
                  setCategories(null);
                  setNameEn("");
                  fetchCategories();
                  setNameAr("");
                  setDescEn("");
                  setDescAr("");
                  setItemValue(null);
                  setValue(null);
                  setBrandValue(null);
                  setDescription(null);
                  setCustomFields(null);
                  setPrice(0);
                  setChecked(false);
                  setFile(null);
                  setDisabled(false);
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
                    <Select
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
                    <Select
                      value={subValue}
                      onChange={(e) => {
                        setSubValue(e.target.value);
                        setCustomFields(null);
                        if (e.target.value !== "a")
                          fetchCustomFields(e.target.value);
                      }}
                    >
                      <MenuItem value={"a"}></MenuItem>
                      {subCategories &&
                        subCategories.map((i, k) => (
                          <MenuItem value={k}>{i["name_en"]}</MenuItem>
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
                    Select Brand :
                  </p>
                  <Select
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

                {item_available === true && (
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
                      Select Item :
                    </p>
                    <FormControl style={{ width: "47%" }}>
                      <Select
                        value={items}
                        multiple
                        input={<Input />}
                        displayEmpty
                        onChange={handleChangeMultiple}
                      >
                        {linkableItems &&
                          linkableItems.map((i, k) => (
                            <MenuItem key={k} value={i["item_id"]}>
                              {i["name"]}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}

                {customFields && customFields.length > 0 && (
                  <FormControlLabel
                    style={{ marginVertical: "2rem" }}
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={() => {
                          setChecked(!checked);
                        }}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Add custom fields"
                  />
                )}

                {checked && (
                  <Box
                    justifyContent="space-between"
                    style={{ margin: "1rem 0" }}
                  >
                    {customFields && customFields.length > 0 && (
                      <p
                        style={{
                          fontSize: "1rem",
                          color: "#282b3c",
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        Custom Fields :
                      </p>
                    )}

                    {customFields &&
                      customFields.map((i, k) => (
                        <Box key={k}>
                          <p
                            style={{
                              fontSize: "1rem",
                              color: "#282b3c",
                              fontWeight: 600,
                            }}
                          >
                            {i.name_en}
                          </p>

                          <Box
                            display="flex"
                            justifyContent="space-between"
                            style={{ margin: "1rem 0" }}
                          >
                            <TextField
                              variant="outlined"
                              label="value_en"
                              required
                              inputRef={register}
                              name={`value_en${k + 1}`}
                              style={{ width: "47%" }}
                            />
                            <TextField
                              variant="outlined"
                              label="value_ar"
                              required
                              inputRef={register}
                              name={`value_ar${k + 1}`}
                              style={{ width: "47%" }}
                            />
                          </Box>
                        </Box>
                      ))}
                  </Box>
                )}
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0" }}
              >
                <TextField
                  variant="outlined"
                  label="name"
                  value={name_en}
                  onChange={(e) => setNameEn(e.target.value)}
                  style={{ width: "47%" }}
                />
                <TextField
                  variant="outlined"
                  label="name_ar"
                  value={name_ar}
                  onChange={(e) => setNameAr(e.target.value)}
                  style={{ width: "47%" }}
                />
              </Box>

              <Box display="flex" justifyContent="space-between">
                <div style={{ width: "47%" }}>
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
                    value={desc_en}
                    onChange={(e) => setDescEn(e.target.value)}
                    // defaultValue={description.desc}
                    style={{ width: "100%", opacity: 0.8 }}
                  />
                </div>
                <div style={{ width: "47%" }}>
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
                    value={desc_ar}
                    onChange={(e) => setDescAr(e.target.value)}
                    // defaultValue={description.desc_ar}
                    variant="outlined"
                    style={{ width: "100%", opacity: 0.8 }}
                  />
                </div>
              </Box>
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
                  <TextField
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    variant="outlined"
                    style={{ width: "47%" }}
                  />
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
                    <label htmlFor="icon-button-file">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          height: "20vh",
                          cursor: "pointer",
                        }}
                      >
                        {file ? (
                          <img
                            style={{
                              height: "20vh",
                              // width: "6rem",
                            }}
                            alt="img"
                            src={file}
                          />
                        ) : (
                          <CameraAlt />
                        )}
                      </Box>
                    </label>
                  </Paper>
                </Box>
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
              {disabled ? (
                <CircularProgress />
              ) : (
                <Fab type="submit" variant="extended" color="primary">
                  Save
                </Fab>
              )}
            </Box>
          </Paper>
        </Backdrop>
      </form>
    </Box>
  );
};

export default AddItem;
