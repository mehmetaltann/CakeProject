const CustomerSchema = require("../models/Customer.js");
const OrderSchema = require("../models/Order.js");
const {
  dbFindByIdAndDelete,
  dbSave,
  dbFindByIdAndUpdate,
  dbFindOne,
  dbFindOneAndDelete,
  dbFindAggregate,
} = require("./dbQueries.js");

const cQuery = [
  {
    $lookup: {
      from: "orders",
      localField: "orders._id",
      foreignField: "_id",
      as: "or",
    },
  },
  {
    $addFields: {
      orders: {
        $map: {
          input: "$orders",
          as: "o",
          in: {
            $mergeObjects: [
              "$$o",
              {
                $first: {
                  $filter: {
                    input: "$or",
                    cond: { $eq: ["$$this._id", "$$o._id"] },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  { $sort: { createdAt: -1 } },
  {
    $project: {
      _id: 1,
      name: 1,
      surname: 1,
      phonenumber: 1,
      description: 1,
      orders: {
        $map: {
          input: "$orders",
          as: "o",
          in: {
            id: "$$o._id",
            date: "$$o.date",
            model: "$$o.model",
            type: "$$o.type",
            price: "$$o.price",
            cost: "$$o.cost",
            date: "$$o.date",
            products: "$$o.products",
          },
        },
      },
    },
  },
];

exports.customerQuery = async (req, res) => {
  try {
    const data = await dbFindAggregate(CustomerSchema, cQuery);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Müşteriler Getirilemedi, Server Bağlantı Hatası" });
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
  const findedCustomer = await dbFindOne(CustomerSchema, {
    _id: req.params.id,
  });
  const isHasOrder = findedCustomer.orders.length > 0 ? true : false;

  if (!isHasOrder) {
    try {
      await dbFindByIdAndDelete(CustomerSchema, req.params.id);
      res.status(200).json({ message: "Müşteri Silindi" });
    } catch (error) {
      res.status(500).json({
        message: "Müşteri Silinemedi, Server Bağlantı Hatası",
      });
    }
  } else {
    res.status(200).json({
      message: "Müşteri Silinemedi, Bu müşteri daha önce sipariş vermiş.",
    });
  }
};
