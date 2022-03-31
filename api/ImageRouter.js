const express = require("express");
const ImageRouter = express.Router();
const cloudinary = require("cloudinary").v2;
// const bodyParser = require('body-parser');
require('dotenv').config()
const auth = require("../middleware/auth");
const Actors = require("../models/Actors");
// ImageRouter.use(bodyParser.json());
//   ImageRouter.use(bodyParser.urlencoded({ extended: true }));

cloudinary.config({ 
    cloud_name: 'akienesto', 
    api_key: '886219619985597', 
    api_secret: 'IHKXKEtgFmQwH6gqFec9IWo64UE' 
  });

ImageRouter.post("/image-upload", auth, (request, response) => {
    const data = { image: request.body.image }

    cloudinary.uploader.upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });

    }).catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
});


module.exports = ImageRouter;

