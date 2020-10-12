import React, { useState, useContext, useEffect, useCallback } from "react";
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
  Avatar,
  FormControl,
  CircularProgress,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Clear, CameraAlt } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";
import { GiCancel } from "react-icons/gi";

const EditPackage = ({ open, classes, setOpen }) => {
  const {
    state: { game_details, items, games, package_details },
    fetchItems,
    fetchGameSubCategoryList,
    editPackage,
    fetchPackage,
  } = useContext(DataContext);

  const [file, setFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [value, setValue] = useState(null);
  const [itemValue, setItemValue] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [subCategories, setSubCategories] = useState(null);
  const [subCategoryValue, setSubCategoryValue] = useState(0);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [name_en, setNameEn] = useState(null);
  const [name_ar, setNameAr] = useState(null);
  const [quality, setQuality] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [coverImages, setCoverImages] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [newCoverImages, setNewCoverImages] = useState([]);
  const [deletedCoverImages, setDeletedCoverImages] = useState([]);
  const [newImgFile, setNewImgFile] = useState(null);

  const handleChangedData = useCallback(async () => {
    setDisabled(true);
    // await fetchGamePackages()
    if (package_details) {
      setNameEn(package_details.name_en);
      setNameAr(package_details.name_ar);
      setCoverImages([
        ...package_details.cover_image.map((x) => {
          return { imgFile: x.image_path, id: x.id };
        }),
      ]);
      setSelectedSubCategories(
        package_details.package_items.map((x) => x.sub_category)
      );
      setSelectedItems(package_details.package_items.map((x) => x.item));
      setFile(package_details.image);
    }
    setDisabled(false);
  }, [fetchPackage]);

  useEffect(() => {
    getData();
    handleChangedData();
    console.log("hi");
  }, [package_details]);

  const getData = async () => {
    await fetchItems();
    const data = await fetchGameSubCategoryList();
    setSubCategories(data);
    if (package_details) {
      setNameEn(package_details.name_en);
    }
    console.log(items);
  };

  const onSubmit = async (y) => {
    setDisabled(true);
    await editPackage({
      image: file,
      newImgFile: newImgFile,
      graphic_quality: +quality ? +quality : +package_details.graphic_quality,
      name_en,
      name_ar,
      status: value ? +value : +package_details.status,
      game_id: game_details.game_id,
      package_id: package_details.package_id,
      cover_images: coverImages,
      new_cover_images: newCoverImages,
      deleted_cover_images: deletedCoverImages,
      package_item: selectedSubCategories.map((i, k) => ({
        sub_category_id: +selectedSubCategories[k].split("###")[0],
        item_id: +selectedItems[k].split("###")[0],
      })),
    });
    setDisabled(false);
    setOpen(false);
  };

  const handleImgChange = useCallback(
    (e) => {
      var file1 = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        setNewFile(reader.result);
        setNewImgFile(file1);
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
        setNewCoverImages([
          ...newCoverImages,
          { imgFile: reader.result, file: file1 },
        ]);
      };
      reader.readAsDataURL(file1);
    },
    [newCoverImages]
  );

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Paper
        style={{
          position: "absolute",
          top: "7vh",
          maxHeight: "80vh",
          overflowY: "scroll",
          width: "70vw",
          minHeight: "70vh",
          padding: "2rem",
        }}
      >
        {games && package_details && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="row-reverse">
              <IconButton
                onClick={() => {
                  setNameAr(null);
                  setNameEn(null);
                  reset();
                  setFile(null);
                  setNewFile(null);
                  setImgFile(null);
                  setNewImgFile(null);
                  setSelectedItems(null);
                  setSelectedSubCategories(null);
                  setQuality(null);
                  setDisabled(false);
                  setValue(null);
                  setCoverImages([]);
                  setNewCoverImages([]);
                  setDeletedCoverImages([]);
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
                  value={0}
                  disabled
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                >
                  <MenuItem value={0}>
                    {package_details && package_details.game_name_en}
                  </MenuItem>
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
                Status :
              </p>
              <FormControl style={{ width: "47%" }}>
                <Select
                  defaultValue={package_details.status}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                >
                  {["InActive", "Active"].map((i, k) => (
                    <MenuItem value={k}>{i}</MenuItem>
                  ))}
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
                inputRef={register()}
                name="name"
                defaultValue={package_details.name_en}
                onChange={(e) => setNameEn(e.target.value)}
                style={{ width: "47%" }}
              />
              <TextField
                variant="outlined"
                label="Arabic Name"
                name="name1"
                inputRef={register()}
                defaultValue={package_details.name_ar}
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
                  <label
                    htmlFor={`package-image2${package_details.package_id}`}
                  >
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
                        id={`package-image2${package_details.package_id}`}
                        type="file"
                      />
                      {newFile ? (
                        <img
                          style={{
                            height: "20vh",
                          }}
                          alt="img"
                          src={newFile}
                        />
                      ) : file ? (
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
                        id={`cover-image2${k + 1 + coverImages.length}${
                          package_details.package_id
                        }`}
                        type="file"
                        style={{ display: "none" }}
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => handleCoverImages(e)}
                      />
                    ))
                  ) : (
                    <input
                      id={`cover-image2${coverImages.length + 1}${
                        package_details.package_id
                      }`}
                      type="file"
                      style={{ display: "none" }}
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => handleCoverImages(e)}
                    />
                  )}

                  {coverImages.length > 0 &&
                    coverImages.map((i, k) => (
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
                            setDeletedCoverImages([
                              ...deletedCoverImages,
                              coverImages[k]["id"],
                            ]);
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
                          // src={i.image_path}
                        />
                      </Box>
                    ))}

                  {newCoverImages.length > 0 &&
                    newCoverImages.map((i, k) => (
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
                            const x = [...newCoverImages];
                            x.splice(k, 1);
                            setNewCoverImages(x);
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
                          // src={i.image_path}
                        />
                      </Box>
                    ))}

                  <label
                    htmlFor={`cover-image2${coverImages.length + 1}${
                      package_details.package_id
                    }`}
                  >
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
                  defaultValue={package_details.graphic_quality}
                  //   disabled
                  // value={quality}
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
                        <MenuItem value={`${i.sub_category_id}###${i.name_en}`}>
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
                      if (
                        // true
                        // !selectedItems.includes(e.target.value)
                        selectedItems.length < selectedSubCategories.length
                      )
                        setSelectedItems([...selectedItems, e.target.value]);
                      console.log([...selectedItems, e.target.value]);
                    }}
                  >
                    {items ? (
                      items.map((i, k) => (
                        <MenuItem value={`${i.item_id}###${i.name_en}`}>
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

            {package_details && (
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
                    {package_details &&
                      selectedSubCategories &&
                      selectedSubCategories.map((i, k) => (
                        <TableRow key={k}>
                          <TableCell
                            style={{
                              textAlign: "center",
                              color: "#8095a1",
                              fontWeight: 500,
                            }}
                          >
                            {i && i.split("###")[1]}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              color: "#8095a1",
                              fontWeight: 500,
                            }}
                          >
                            {/* {i.item} */}
                            {selectedItems[k] &&
                              selectedItems[k].split("###")[1]}
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
                              <DeleteOutlineIcon style={{ color: "red" }} />
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
                  Save
                </Fab>
              )}
            </Box>
          </form>
        )}
        {!package_details && (
          <Box
            display="flex"
            style={{ margin: "30vh 0" }}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Backdrop>
  );
};

export default EditPackage;
