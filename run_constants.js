module.exports = {
  run: {
    server: {
      port: 3000
    },
    /** database complete url */
    db: "mongodb://localhost:27017/test",
    // for local tests
    // sftp: {
    //   host: "127.0.0.1",
    //   port: 21,
    //   username: "test",
    //   password: "test"
    // }
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
