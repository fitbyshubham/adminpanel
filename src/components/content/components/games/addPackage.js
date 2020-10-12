import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Box,
  Fab,
  Backdrop,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Avatar,
  FormControl,
  CircularProgress,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Clear, CameraAlt, DeleteOutlined } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";
import { GiCancel } from "react-icons/gi";

const AddPackage = ({ open, classes, setOpen }) => {
  const [file, setFile] = useState(null);
  const [value, setValue] = useState(null);
  const [itemValue, setItemValue] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [subCategories, setSubCategories] = useState(null);
  const [subCategoryValue, setSubCategoryValue] = useState(0);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const [quality, setQuality] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const { register, handleSubmit } = useForm();
  const [coverImages, setCoverImages] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const {
    state: { games, items },
    fetchItems,
    fetchGameSubCategoryList,
    addPackage,
  } = useContext(DataContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await fetchItems();
    const data = await fetchGameSubCategoryList();
    setSubCategories(data);
    console.log(items);
  };

  const onSubmit = async (y) => {
    setDisabled(true);
    await addPackage({
      image: imgFile,
      status: 1,
      graphic_quality: quality,
      name_en,
      name_ar,
      game_id: value,
      cover_images: coverImages,
      package_item: selectedSubCategories.map((i, k) => ({
        sub_category_id: +selectedSubCategories[k].split(" ")[0],
        item_id: +selectedItems[k].split(" ")[0],
      })),
    });
    setNameEn("");
    setNameAr("");
    setQuality(null);
    setImgFile(null);
    setCoverImages([]);
    setSelectedItems([]);
    setSelectedSubCategories([]);
    setValue(null);
    setFile(null);
    setDisabled(false);
    setOpen(false);
  };

  const handleImgChange = useCallback(
    (e) => {
      var file1 = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        setFile(reader.result);
        setImgFile(file1);
      };
      reader.readAsDataURL(file1);
    },
    [file]
  );

  const handleCoverImages = useCallback(
    (e) => {
      var file1 = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        setCoverImages([
          ...coverImages,
          { imgFile: reader.result, file: file1 },
        ]);
      };
      reader.readAsDataURL(file1);
    },
    [coverImages]
  );

  return (
    <Backdrop open={open} className={classes.backdrop}>
      {games && (
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="row-reverse">
              <IconButton
                onClick={() => {
                  setNameEn("");
                  setNameAr("");
                  setQuality(null);
                  setImgFile(null);
                  setCoverImages([]);
                  setSelectedItems([]);
                  setSelectedSubCategories([]);
                  setValue(null);
                  setFile(null);
                  setDisabled(false);
                  setOpen(false);
                }}
              >
                <Clear />
              </IconButton>
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
                Select Game :
              </p>
              <FormControl style={{ width: "47%" }}>
                <Select
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                >
                  {games ? (
                    games.map((i, k) => (
                      <MenuItem value={i.game_id}>{i.name_en}</MenuItem>
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
              <TextField
                variant="outlined"
                label="English Name"
                value={name_en}
                onChange={(e) => setNameEn(e.target.value)}
                style={{ width: "47%" }}
              />
              <TextField
                variant="outlined"
                label="Arabic Name"
                value={name_ar}
                onChange={(e) => setNameAr(e.target.value)}
                style={{ width: "47%" }}
              />
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
                  Package Image :
                </p>
                <Paper style={{ width: "47%" }}>
                  <label htmlFor="package-image">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        height: "20vh",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => {
                          handleImgChange(e);
                        }}
                        style={{ display: "none" }}
                        id="package-image"
                        type="file"
                      />
                      {file ? (
                        <img
                          style={{
                            height: "20vh",
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
                  Cover Images :
                </p>
                <Box display="flex" flexWrap="wrap" style={{ width: "47%" }}>
                  {coverImages.length > 0 ? (
                    coverImages.map((i, k) => (
                      <input
                        id={`cover-image${k + 1 + coverImages.length}`}
                        type="file"
                        style={{ display: "none" }}
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => handleCoverImages(e)}
                      />
                    ))
                  ) : (
                    <input
                      id={`cover-image${coverImages.length + 1}`}
                      type="file"
                      style={{ display: "none" }}
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => handleCoverImages(e)}
                    />
                  )}

                  {coverImages.map((i, k) => (
                    <Box
                      key={k}
                      style={{
                        position: "relative",
                        height: 100,
                        width: 100,
                        marginRight: 15,
                        marginBottom: 15,
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          const x = [...coverImages];
                          x.splice(k, 1);
                          setCoverImages(x);
                        }}
                        style={{
                          background: "#fff",
                          position: "absolute",
                          right: -10,
                          top: -10,
                          zIndex: 10,
                          padding: 0,
                        }}
                      >
                        <GiCancel />
                      </IconButton>
                      <Avatar
                        style={{
                          height: 100,
                          width: 100,
                        }}
                        variant="rounded"
                        src={i.imgFile}
                      />
                    </Box>
                  ))}

                  <label htmlFor={`cover-image${coverImages.length + 1}`}>
                    <Avatar
                      style={{
                        height: 100,
                        width: 100,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      variant="rounded"
                    >
                      <CameraAlt />
                    </Avatar>
                  </label>
                </Box>
              </Box>
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
                Graphic Quality :
              </p>
              <FormControl style={{ width: "47%" }}>
                <Select
                  value={quality}
                  onChange={(e) => {
                    setQuality(e.target.value);
                  }}
                >
                  {["Low", "Medium", "High"].map((i, k) => (
                    <MenuItem value={k + 1}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              style={{ width: "100%" }}
            >
              <Box
                // display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0", width: "47%" }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    fontWeight: 600,
                  }}
                >
                  SubCategory :
                </p>
                <FormControl style={{ width: "100%" }}>
                  <Select
                    value={subCategoryValue}
                    onChange={(e) => {
                      // setSubCategoryValue(e.target.value);
                      if (
                        // !selectedSubCategories.includes(e.target.value)
                        selectedItems.length === selectedSubCategories.length
                      )
                        setSelectedSubCategories([
                          ...selectedSubCategories,
                          e.target.value,
                        ]);
                    }}
                  >
                    {subCategories ? (
                      subCategories.map((i, k) => (
                        <MenuItem value={`${i.sub_category_id} ${i.name_en}`}>
                          {i.name_en}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={0}></MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>

              <Box
                // display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0", width: "47%" }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    fontWeight: 600,
                  }}
                >
                  Items :
                </p>
                <FormControl style={{ width: "100%" }}>
                  <Select
                    // multiple
                    value={itemValue}
                    onChange={(e) => {
                      // setItemValue(e.target.value);
                      if (selectedItems.length < selectedSubCategories.length)
                        setSelectedItems([...selectedItems, e.target.value]);
                      console.log([...selectedItems, e.target.value]);
                    }}
                  >
                    {items ? (
                      items.map((i, k) => (
                        <MenuItem value={`${i.item_id} ${i.name_en}`}>
                          {i.name_en}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={0}></MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {selectedSubCategories && (
              <TableContainer
                style={{ width: "100%", marginTop: "2rem" }}
                elevation={0}
                components={Paper}
              >
                <Table style={{ width: "100%" }}>
                  <TableHead>
                    <TableRow
                      style={{
                        background: "#f4f4f4",
                        height: "3.4rem",
                      }}
                    >
                      <TableCell
                        style={{
                          fontWeight: "bolder",
                          fontSize: "0.8rem",
                          color: "#282b3c",
                          textAlign: "center",
                        }}
                      >
                        Sub Category
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bolder",
                          fontSize: "0.8rem",
                          color: "#282b3c",
                          textAlign: "center",
                        }}
                      >
                        Item
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bolder",
                          fontSize: "0.8rem",
                          color: "#282b3c",
                          textAlign: "center",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {selectedSubCategories &&
                      selectedSubCategories.map((i, k) => (
                        <TableRow key={k}>
                          <TableCell
                            style={{
                              textAlign: "center",
                              color: "#8095a1",
                              fontWeight: 500,
                            }}
                          >
                            {i && i.split(" ")[1]}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              color: "#8095a1",
                              fontWeight: 500,
                            }}
                          >
                            {selectedItems[k] && selectedItems[k].split(" ")[1]}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              color: "#8095a1",
                              fontWeight: 500,
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (selectedItems.length !== 1) {
                                  const x = [...selectedItems];
                                  const y = [...selectedSubCategories];
                                  x.splice(k, 1);
                                  y.splice(k, 1);
                                  setSelectedItems(x);
                                  setSelectedSubCategories(y);
                                } else {
                                  setSelectedItems([]);
                                  setSelectedSubCategories([]);
                                }
                              }}
                              style={{ padding: 0 }}
                            >
                              <DeleteOutlined style={{ color: "red" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

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
                  Add
                </Fab>
              )}
            </Box>
          </form>
        </Paper>
      )}
    </Backdrop>
  );
};

export default AddPackage;
