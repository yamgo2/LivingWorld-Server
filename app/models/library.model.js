const sql = require("./db.js");

// constructor
const Library = function (library) {
  this.name = library.name;
  this.views = library.views;
  this.imagecount = library.imagecount;
  this.creator = library.creator;
  this.description = library.description;
};

Library.create = (newLibrary, result) => {
  sql.query('INSERT INTO libraries SET ?', newLibrary, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created library: ", { newLibrary });
    result(null, { newLibrary });
  });
};

Library.remove = (name, result) => {
  sql.query('DELETE FROM libraries WHERE name = ?', [name], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted library with name: ", name);
    result(null, res);
  });
};

Library.getAll = (result) => {
  sql.query('SELECT * FROM libraries', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found libraries: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Library.addView = (name, result) => {
  sql.query(
    'UPDATE libraries SET views = views + 1 WHERE name = ?', [name], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated library: ", { name });
      result(null, { name });
    }
  );
};

module.exports = Library;