// use this file instead sftp-client.js file
var Client = require("ssh2-sftp-client");
var consts = require("../run_constants").run.sftp;

let sftp = new Client();
sftp
  .connect({
    host: consts.host,
    port: consts.port,
    username: consts.username,
    password: consts.password
  })
  .then(data => {
    console.log("Connected to retropie");
  })
  .catch(err => {
    console.log(err, "Connexion error to retropie");
  });

module.exports = sftp;
