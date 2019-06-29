module.exports = {
  run: {
    server: {
      port: 3000
    },
    /** database complete url */
    db: "mongodb://localhost:27017/test",
    sftp: {
      host: "192.168.1.218",
      port: 22,
      username: "pi",
      password: "raspberry"
    }
  },
  mode : {
    dev: true
  }
};
