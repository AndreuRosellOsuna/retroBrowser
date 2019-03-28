// Don't use this file

let Client = require("ssh2-sftp-client");
var consts = require("../run_constants");
let sftp = new Client();
sftp
  .connect({
    host: consts.run.sftp.host,
    port: consts.run.sftp.port,
    username: consts.run.sftp.username,
    password: consts.run.sftp.password
  })
  .then(() => {
    return sftp.list("/home/pi/RetroPie/roms");
  })
  .then(data => {
    console.log(data, "the data info");
  })
  .catch(err => {
    console.log(err, "catch error");
  });

module.exports = sftp;
