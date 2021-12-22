const Client = require("ftp");
const fs = require("fs");

const c = new Client();

const conn = () => {
  c.connect({
    host: "10.13.200.117",
    port: 21,
    user: "sulabh",
    password: "password",
  });
};

const ftpConfig = (file) => {
  const files = file.match(/(docx|doc|pdf|jpeg|png|gif)/);

  if (
    files[1] === "pdf" ||
    files[1] === "docx" ||
    files[1] === "doc" ||
    files[1] === "jpeg" ||
    files[1] === "jpg" ||
    files[1] === "png" ||
    files[1] === "gif"
  ) {
    fileType = files[0];
  } else {
    throw new Error("file format is incorrect");
  }

  conn();
  c.on("ready", () => {
    fs.readFile(file, (err, data) => {
      c.put(data, `${Date.now()}.${fileType}`, (err) => {
        if (!err) {
          console.log("ok");
        } else {
          throw new Error(err.message);
        }
      });
    });
  });
};
module.exports = ftpConfig;
