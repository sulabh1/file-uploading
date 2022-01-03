const express = require("express");

const ftpConfig = require("./ftpConfig");
const { upload } = require("./multerCon");

const app = express();

app.use(express.json());

app.post(
  "/file",
  upload.single("file"),
  async (req, res, next) => {
    const fileName = req.file.path;
    // console.log(files);

    await ftpConfig(fileName);
    res.status(201).json({
      status: "success",
      data: {
        fileName,
      },
    });
  },
  (err, req, res, next) => {
    res.status(400).json({
      status: "fail",
      err,
      message: err.message,
    });
  }
);

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log(`server is listening ${app.get("port")}`);
});
