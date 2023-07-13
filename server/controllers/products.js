const ProductSchema = require("../models/Product.js");
const {
  dbFind,
  dbFindByIdAndDelete,
  dbSave,
  dbFindByIdAndUpdate,
} = require("./dbQueries.js");

exports.productQuery = async (req, res) => {
  try {
    const data = await dbFind(ProductSchema);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ürünler Gitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.productAdd = async (req, res) => {
  const { name, size, description } = req.body;
  const product = ProductSchema({
    name,
    size,
    description,
  });
  try {
    await dbSave(product);
    res.status(200).json({ message: "Ürün Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ürün Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.productUpdate = async (req, res) => {
  updateData = {
    name: req.body.name,
    size: req.body.size,
    description: req.body.description,
  };
  try {
    await dbFindByIdAndUpdate(ProductSchema, req.params.id, updateData);
    res.status(200).json({ message: "Ürün Güncellendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ürün Güncellenemedi, Server Bağlantı Hatası" });
  }
};
exports.productDelete = async (req, res) => {
  try {
    await dbFindByIdAndDelete(ProductSchema, req.params.id);
    res.status(200).json({ message: "Ürün Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarif Silinemedi, Server Bağlantı Hatası" });
  }
};

exports.addMaterialToProduct = async (req, res) => {
  filter = { _id: req.body.objId };
  updateData = {
    mtId: req.body.id,
    mtNumber: req.body.number,
  };
  try {
    await dbFindByIdAndUpdate(ProductSchema, filter, {
      $push: { materials: updateData },
    });
    res.status(200).json({ message: "Ürün Malzemesi Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ürün Malzemesi Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.deleteMaterialToProduct = async (req, res) => {
  filter = { _id: req.body.pId };
  updateData = {
    mtId: req.body.mtId,
  };
  try {
    await dbFindByIdAndUpdate(ProductSchema, filter, {
      $pull: { materials: updateData },
    });
    res.status(200).json({ message: "Ürün Malzemesi Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ürün Malzemesi Silinemedi, Server Bağlantı Hatası" });
  }
};

exports.addSemiProductToProduct = async (req, res) => {
  filter = { _id: req.body.objId };
  updateData = {
    spId: req.body.id,
    spNumber: req.body.number,
  };
  try {
    await dbFindByIdAndUpdate(ProductSchema, filter, {
      $push: { semiproducts: updateData },
    });
    res.status(200).json({ message: "Ürün İçin Tarif Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ürün İçin Tarif Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.deleteSemiProductToProduct = async (req, res) => {
  filter = { _id: req.body.pId };
  updateData = {
    spId: req.body.spId,
  };
  try {
    await dbFindByIdAndUpdate(ProductSchema, filter, {
      $pull: { semiproducts: updateData },
    });
    res.status(200).json({ message: "Ürün İçin Tarif Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ürün İçin Tarif Silinemedi, Server Bağlantı Hatası" });
  }
};
