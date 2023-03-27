module.exports = app => {
    const data = require("../controllers/data.controller.js");

    var router = require("express").Router();

    // Create a new image
    router.post("/images", data.createImage);

    // Create a new video
    router.post("/videos", data.createVideo);

    // Create a new library
    router.post("/libraries", data.createLibrary);

    // Create a new User
    router.post("/users", data.createUser);

    // Login as an existing user
    router.post("/users/login", data.loginUser);

    // Delete a image with imageid
    router.delete("/images/:imageid", data.deleteImage);

    // Delete a video with videoid
    router.delete("/videos/:videoid", data.deleteVideo);

    // Delete a library with specific name (TODO)
    router.delete("/libraries/:name", data.deleteLibrary);

    // Check server availability
    router.get("/", data.checkAvailable);

    // Retrieve libraries
    router.get("/libraries", data.getAllLibraries);

    // Retrieve image with imageId
    router.get("/images/:imageid", data.findImageById);

    // Retrieve image IDs in library
    router.get("/libraries/:name/imageids", data.findImagesByLibrary);

    // Retrieve videos with imageId
    router.get("/images/:imageid/videos", data.findVideosByImageId);

    // Add or remove a like from a video
    router.put("/videos/:videoid/likes", data.updateVideoLikes);

    // Add a view to a library
    router.put("/libraries/:name/views", data.addLibraryView);

    app.use('/api/data', router);
};