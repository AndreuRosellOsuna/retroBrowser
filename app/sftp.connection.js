// use this file instead sftp-client.js file
var Client = require("ssh2-sftp-client");
var consts = require("../run_constants").run.sftp;


module.exports = function(callback, resolve, reject) {
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
      callback.call(null, resolve);
    })
    .catch(err => {
      console.log(err, "Connexion error to retropie");
      reject();
    });

  return sftp;
}