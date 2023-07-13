const SemiProductSchema = require("../models/SemiProduct.js");
const ProductSchema = require("../models/Product.js");
const {
  dbFind,
  dbFindByIdAndDelete,
  dbSave,
  dbFindByIdAndUpdate,
  dbFindOne,
} = require("./dbQueries.js");

exports.semiProductQuery = async (req, res) => {
  try {
    const data = await dbFind(SemiProductSchema);
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarifler Gitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.semiProductAdd = async (req, res) => {
  const { name, description } = req.body;
  const semiproduct = SemiProductSchema({
    name,
    description,
  });
  try {
    await dbSave(semiproduct);
    res.status(200).json({ message: "Tarif Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarif Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.semiProductUpdate = async (req, res) => {
  updateData = {
    name: req.body.name,
    description: req.body.description,
  };
  try {
    await dbFindByIdAndUpdate(SemiProductSchema, req.params.id, updateData);
    res.status(200).json({ message: "Tarif Güncellendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarif Güncellenemedi, Server Bağlantı Hatası" });
  }
};

exports.semiProductDelete = async (req, res) => {
  const pRes = await dbFindOne(ProductSchema, {
    "semiproducts.spId": req.params.id,
  });

  if (!pRes) {
    try {
      await dbFindByIdAndDelete(SemiProductSchema, req.params.id);
      res.status(200).json({ message: "Tarif Silindi" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Tarif Silinemedi, Server Bağlantı Hatası" });
    }
  } else {
    res.status(200).json({
      message: "Tarif Silinemedi, Bu tarif bir üründe kullanılmaktadır.",
    });
  }
};

exports.addMaterialToSemiProduct = async (req, res) => {
  filter = { _id: req.body.objId };
  updateData = {
    mtId: req.body.id,
    mtNumber: req.body.number,
  };
  try {
    await dbFindByIdAndUpdate(SemiProductSchema, filter, {
      $push: { materials: updateData },
    });
    res.status(200).json({ message: "Tarif Malzemesi Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarif Malzemesi Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.deleteMaterialToSemiProduct = async (req, res) => {
  filter = { _id: req.body.spId };
  updateData = {
    mtId: req.body.mtId,
  };
  try {
    await dbFindByIdAndUpdate(SemiProductSchema, filter, {
      $pull: { materials: updateData },
    });
    res.status(200).json({ message: "Tarif Malzemesi Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarif Malzemesi Silinemedi, Server Bağlantı Hatası" });
  }
};
