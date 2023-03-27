const sql = require("./db.js");

// constructor
const Video = function (video) {
  this.videoid = video.videoid;
  this.imageid = video.imageid;
  this.title = video.title;
  this.link = video.link;
  this.likes = video.likes;
  this.creator = video.creator;
  this.width = video.width;
  this.height = video.height;
};

Video.create = (newVideo, result) => {
  sql.query('INSERT INTO videos SET ?', newVideo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created video: ", { newVideo });
    result(null, { newVideo });
  });
};

Video.remove = (videoid, result) => {
  sql.query('DELETE FROM videos WHERE videoid = ?', [videoid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted video with id: ", videoid);
    result(null, res);
  });
};

Video.findByImageId = (imageid, result) => {
  sql.query('SELECT * FROM videos WHERE imageid = ?', [imageid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log("found videos: ", res);
      result(null, res);
    }
  });
};

Video.addLike = (videoid, result) => {
  sql.query(
    'UPDATE videos SET likes = likes + 1 WHERE videoid = ?', [videoid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated video: ", { videoid: videoid });
      result(null, { videoid: videoid });
    }
  );
};

Video.removeLike = (videoid, result) => {
  sql.query(
    'UPDATE videos SET likes = likes - 1 WHERE videoid = ?', [videoid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated video: ", { videoid: videoid });
      result(null, { videoid: videoid });
    }
  );
};

module.exports = Video;