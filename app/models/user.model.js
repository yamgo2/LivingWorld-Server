const sql = require("./db.js");

// constructor
const User = function (user) {
  this.name = user.name;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query('SELECT * FROM users WHERE name = ?', newUser.name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      result({ kind: "already_exists" }, null);
      return;
    }

    sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user with name: ", { name: newUser.name });
      result(null, { newUser });
    });
  });
};

User.checkPassword = (name, password, result) => {
  sql.query('SELECT * FROM users WHERE name = ? AND password = ?', [name, password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    if (res.length == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    else {
      console.log("password accepted for name: ", name);
      result(null, res);
    }
  });
};

module.exports = User;