const sql = require("./db.js");

// constructor
const Image = function (image) {
  this.imageid = image.imageid;
  this.library = image.library;
  this.image = image.image;
};


Image.create = (newImage, result) => {
  sql.query('INSERT INTO images SET ?', newImage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    const library = newImage.library;

    sql.query('UPDATE libraries SET imagecount = imagecount + 1 WHERE name = ?', [library], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("created image: ", { newImage });
      result(null, { newImage });
    });
  });
};

Image.remove = (imageid, result) => {
  sql.query('SELECT library FROM images WHERE imageid = ?', [imageid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.length == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    const library = res[0].library;

    sql.query('UPDATE libraries SET imagecount = imagecount - 1 WHERE name = ?', [library], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      sql.query('DELETE FROM images WHERE imageid = ?', [imageid], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("deleted image with id: ", imageid);
        result(null, res);
      });
    });
  });
};

Image.findByLibrary = (library, result) => {
  sql.query('SELECT imageid FROM images WHERE library = ?', [library], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log("found images: ", res);
      result(null, res);
    }
  });
};

Image.findByImageId = (imageid, result) => {
  sql.query('SELECT * FROM images WHERE imageid = ?', [imageid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found image with id: ", imageid);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

module.exports = Image;