const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Veritabanına Bağlanıldı");
  } catch (error) {
    console.log("Veritabanı Bağlantısı Başarısız");
  }
};

module.exports = { db };