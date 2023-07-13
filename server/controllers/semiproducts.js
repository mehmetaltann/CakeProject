const SemiProductSchema = require("../models/SemiProduct.js");
const {
  dbFind,
  dbFindByIdAndDelete,
  dbSave,
  dbFindByIdAndUpdate,
} = require("./dbQueries.js");

exports.semiProductQuery = async (req, res) => {
  try {
    const data = await dbFind(SemiProductSchema);
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
  try {
    await dbFindByIdAndDelete(SemiProductSchema, req.params.id);
    res.status(200).json({ message: "Tarif Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarif Silinemedi, Server Bağlantı Hatası" });
  }
};

exports.addMaterialToSemiProduct = async (req, res) => {
  filter = { _id: req.body.spId };
  updateData = {
    mtId: req.body.mtId,
    mtNumber: req.body.mtNumber,
  };
  try {
    await dbFindByIdAndUpdate(SemiProductSchema, filter, {
      $push: { materials: updateData },
    });
    res.status(200).json({ message: "Tarif Güncellendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarif Güncellenemedi, Server Bağlantı Hatası" });
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
    res.status(200).json({ message: "Tarif Güncellendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarif Güncellenemedi, Server Bağlantı Hatası" });
  }
};
