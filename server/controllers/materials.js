const MaterialSchema = require("../models/Material.js");
const ProductSchema = require("../models/Product.js");
const SemiProductSchema = require("../models/SemiProduct.js");
const {
  dbFind,
  dbFindByIdAndDelete,
  dbSave,
  dbFindOne,
  dbFindByIdAndUpdate,
} = require("./dbQueries.js");

exports.materialQuery = async (req, res) => {
  try {
    const data = await dbFind(MaterialSchema);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Malzemeler Gitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.materialAdd = async (req, res) => {
  const { name, type, unit, amount, price, description, brand, date } =
    req.body;
  const material = MaterialSchema({
    name,
    type,
    unit,
    amount,
    price,
    description,
    brand,
    date,
  });
  try {
    await dbSave(material);
    res.status(200).json({ message: "Malzeme Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Malzeme Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.materialUpdate = async (req, res) => {
  updateData = {
    name: req.body.name,
    price: req.body.price,
    brand: req.body.brand,
    date: req.body.date,
  };
  try {
    await dbFindByIdAndUpdate(MaterialSchema, req.params.id, updateData);
    res.status(200).json({ message: "Malzeme Güncellendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Malzeme Güncellenemedi, Server Bağlantı Hatası" });
  }
};

exports.materialDelete = async (req, res) => {
  const spRes = await dbFindOne(SemiProductSchema, {
    "materials.mtId": req.params.id,
  });

  const pRes = await dbFindOne(ProductSchema, {
    "materials.mtId": req.params.id,
  });

  if (!spRes) {
    if (!pRes) {
      try {
        await dbFindByIdAndDelete(MaterialSchema, req.params.id);
        res.status(200).json({ message: "Malzeme Silindi" });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Malzeme Silinemedi, Server Bağlantı Hatası" });
      }
    } else {
      res.status(200).json({
        message: "Malzeme Silinemedi, Bu malzeme bir üründe kullanılmaktadır.",
      });
    }
  } else {
    res.status(200).json({
      message: "Malzeme Silinemedi, Bu malzeme bir tarifte kullanılmaktadır.",
    });
  }
};
