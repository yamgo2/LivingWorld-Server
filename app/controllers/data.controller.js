const Image = require("../models/image.model.js");
const Video = require("../models/video.model.js");
const Library = require("../models/library.model.js");
const User = require("../models/user.model.js");

exports.checkAvailable = (req, res) => {
  res.json({ message: "Available." });
}

exports.createLibrary = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const library = new Library({
    name: req.body.name,
    views: req.body.views,
    imagecount: req.body.imagecount,
    creator: req.body.creator,
    description: req.body.description
  });
  Library.create(library, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the library."
      });
    else res.send({ message: "Library was created successfully!" });
  });
};

exports.deleteLibrary = (req, res) => {
  Library.remove(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found library with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: `Could not delete library with name ${req.params.name}.`
        });
      }
    } else res.send({ message: "Library was deleted successfully!" });
  });
};

exports.getAllLibraries = (req, res) => {
  Library.getAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "No libraries available."
        });
      } else {
        res.status(500).send({
          message: "Error retrieving libraries."
        });
      }
    } else res.send(data);
  });
};

exports.createImage = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create an image
  const image = new Image({
    imageid: req.body.imageid,
    library: req.body.library,
    image: req.body.image
  });
  // Save image in the database
  Image.create(image, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the image."
      });
    else res.send({ message: "Image was created successfully!" });
  });
};

exports.deleteImage = (req, res) => {
  Image.remove(req.params.imageid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found image with id ${req.params.imageid}.`
        });
      } else {
        res.status(500).send({
          message: `Could not delete image with id ${req.params.imageid}.`
        });
      }
    } else res.send({ message: "Image was deleted successfully!" });
  });
};

exports.findImageById = (req, res) => {
  Image.findByImageId(req.params.imageid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found image with id ${req.params.imageid}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving image with id ${req.params.imageid}.`
        });
      }
    } else res.send(data);
  });
};

exports.findImagesByLibrary = (req, res) => {
  Image.findByLibrary(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found images in library ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving images from library ${req.params.name}.`
        });
      }
    } else res.send(data);
  });
};

exports.createVideo = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const video = new Video({
    videoid: req.body.videoid,
    imageid: req.body.imageid,
    title: req.body.title,
    link: req.body.link,
    likes: req.body.likes,
    creator: req.body.creator,
    width: req.body.width,
    height: req.body.height
  });
  Video.create(video, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the video."
      });
    else res.send({ message: "Video was created successfully!" });
  });
};

exports.deleteVideo = (req, res) => {
  Video.remove(req.params.videoid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found video with id ${req.params.videoid}.`
        });
      } else {
        res.status(500).send({
          message: `Could not delete video with id ${req.params.videoid}.`
        });
      }
    } else res.send({ message: "Video was deleted successfully!" });
  });
};

exports.findVideosByImageId = (req, res) => {
  Video.findByImageId(req.params.imageid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found videos in image ${req.params.imageid}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving videos from image ${req.params.imageid}.`
        });
      }
    } else res.send(data);
  });
};

exports.updateVideoLikes = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const action = req.body.action;

  switch (action) {
    case "add":
      Video.addLike(req.params.videoid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            return res.status(404).send({
              message: `Not found video with id ${req.params.videoid}.`
            });
          } else {
            return res.status(500).send({
              message: `Error updating video with id ${req.params.videoid}.`
            });
          }
        }
        return res.send(data);
      });
      break;

    case "remove":
      Video.removeLike(req.params.videoid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            return res.status(404).send({
              message: `Not found video with id ${req.params.videoid}.`
            });
          } else {
            return res.status(500).send({
              message: `Error updating video with id ${req.params.videoid}.`
            });
          }
        }
        return res.send(data);
      });
      break;

    default:
      return res.status(400).send({
        message: "Not a valid action."
      });
  }
};

exports.addLibraryView = (req, res) => {
  Library.addView(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found library with id ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: `Error updating library with id ${req.params.name}.`
        });
      }
    } else res.send(data);
  });
};

exports.createUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const user = new User({
    name: req.body.name,
    password: req.body.password
  });
  User.create(user, (err, data) => {
    if (err) {
      if (err.kind === "already_exists") {
        res.status(409).send({
          message: "Username already exists."
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      }
    }
    else res.send({ message: "User was created successfully!" });
  });
};

exports.loginUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const name = req.body.name;
  const password = req.body.password;

  User.checkPassword(name, password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(401).send({
          message: "Wrong username or password."
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Login data not valid."
        });
      }
    }
    else res.send({ message: "Login successful!" });
  });
};