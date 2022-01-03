const Client = require("ftp");
const fs = require("fs");

const connectFTP = (config) => {
  return new Promise((resolve, reject) => {
    const client = new Client();
    client.connect(config);
    client.on("ready", (args) => {
      resolve(client);
    });
    client.on("error", (args) => {
      reject(args);
    });
  });
};
const readFile = (file) => {
  return new Promise((resole, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resole(data);
      }
    });
  });
};

const putFile = (client, path, file) => {
  return new Promise((resole, reject) => {
    client.put(file, path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resole(data);
      }
    });
  });
};

module.exports = {
  readFile,
  connectFTP,
  putFile,
};
