const Car = require("./carModel"); // Assuming you have a Car model
const { uploadImageToCloudinary } = require("../../config/cloudinaryconfig");

const createCarRecord = async (req, res) => {
  const { model, price, phone, city, maxPictures, } = req.body;
  const files = req.files;
  let images = []
  try {
    if (files && files.images && files.images.length > 0) {
      const carUploadPromises = files.images.map((file) =>
        uploadImageToCloudinary(file)
      );
      let carResults = await Promise.all(carUploadPromises);
      images = carResults.map((result) => result.path);
    }
    const newCar = new Car({
      model,
      price,
      phone,
      user: req.user.id,
      city,
      images: images, 
    });

    const data = await newCar.save();

    res.status(200).json({ message: "Car Record Added successfully", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCarRecord,
};
