const CustomerSchema = require("../models/Customer.js");
const OrderSchema = require("../models/Order.js");
const {
  dbFindByIdAndDelete,
  dbSave,
  dbFindByIdAndUpdate,
  dbFindOne,
  dbFindAggregate,
} = require("./dbQueries.js");

exports.customerQuery = async (req, res) => {
  try {
    const data = await dbFind(CustomerSchema);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Müşteriler Gitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.customerAdd = async (req, res) => {
  const { name, surname, phonenumber, description } = req.body;
  const customer = CustomerSchema({
    name,
    surname,
    phonenumber,
    description,
  });
  try {
    await dbSave(customer);
    res.status(200).json({ message: "Müşteri Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Müşteri Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.customerUpdate = async (req, res) => {
  updateData = {
    name: req.body.name,
    surname: req.body.surname,
    phonenumber: req.body.phonenumber,
    description: req.body.description,
  };
  try {
    await dbFindByIdAndUpdate(CustomerSchema, req.params.id, updateData);
    res.status(200).json({ message: "Müşteri Bilgileri Güncellendi" });
  } catch (error) {
    res.status(500).json({
      message: "Müşteri Bilgileri Güncellenemedi, Server Bağlantı Hatası",
    });
  }
};

exports.customerDelete = async (req, res) => {
  /*const pRes = await dbFindOne(ProductSchema, {
    "semiproducts.spId": req.params.id,
  }); */

  const pRes = false;

  if (!pRes) {
    try {
      await dbFindByIdAndDelete(CustomerSchema, req.params.id);
      res.status(200).json({ message: "Müşteri Silindi" });
    } catch (error) {
      res.status(500).json({
        message: "Müşteri Bilgileri Silinemedi, Server Bağlantı Hatası",
      });
    }
  } else {
    res.status(200).json({
      message:
        "Müşteri Bilgileri Silinemedi, Bu müşteri daha önce sipariş vermiş.",
    });
  }
};

exports.deleteOrderFromCustomer = async (req, res) => {
  filter = { _id: req.body.customerId };
  updateData = {
    _id: req.body.orderId,
  };
  try {
    await dbFindByIdAndUpdate(CustomerSchema, filter, {
      $pull: { orders: updateData },
    });
    res.status(200).json({ message: "Müşteri Siparişi Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Müşteri Siparişi Silinemedi, Server Bağlantı Hatası" });
  }
};
