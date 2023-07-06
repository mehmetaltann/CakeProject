const MaterialSchema = require("../models/Material.js");
const ProductSchema = require("../models/Product.js");
const SemiProductSchema = require("../models/SemiProduct.js");
const {
  dbFind,
  dbFindByIdAndDelete,
  dbSave,
  dbFindOne,
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

exports.materialDelete = async (req, res) => {
  const matRes = await dbFindOne(MaterialSchema, {
    _id: req.params.id,
  });
  /*
  const invRes = await dbFindOne(ProductSchema, {
    portfolio: portfolioRes.title,
  });
  const isUse = invRes ? true : false;
  */
  const isUse = false;
  if (!isUse) {
    try {
      await dbFindByIdAndDelete(InvPortfolioSchema, req.params.id);
      res.status(200).json({ message: "Malzeme Silindi" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Malzeme Silinemedi, Server Bağlantı Hatası" });
    }
  } else {
    res
      .status(200)
      .json({ message: "Bu Malzeme Silinemez, Yatırımları Bulunuyor." });
  }
};
