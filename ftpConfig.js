const Client = require("ftp");
const { connectFTP, readFile, putFile } = require("./utils");

const c = new Client();

const supportedFileFormats = [
  "pdf",
  "jpg",
  "jpeg",
  "png",
  "doc",
  "docx",
  "gif",
];

const ftpConfig = async (filePath) => {
  if (!filePath) {
    throw new Error("file not found");
  }
  const result = filePath.match(/(docx|doc|pdf|jpeg|png|gif|jpg)/);

  if (supportedFileFormats.includes(result[0])) {
    fileType = result[0];
  } else {
    throw new Error("file format is not supported");
  }
  try {
    const client = await connectFTP({
      host: "10.13.200.117",
      port: 21,
      user: "sulabh",
      password: "password",
    });
    const existingFile = await readFile(filePath);
    await putFile(client, `${Date.now()}.${fileType}`, existingFile);

    client.end();
  } catch (error) {
    throw error;
  }
};
module.exports = ftpConfig;
