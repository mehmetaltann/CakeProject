const CustomerSchema = require("../models/Customer.js");
const OrderSchema = require("../models/Order.js");
const ProductSchema = require("../models//Product.js");
const { productNoReqQuery } = require("./products");
const {
  dbFindByIdAndDelete,
  dbSave,
  dbFindByIdAndUpdate,
  dbFindOne,
  dbFindAggregate,
  dbFindById,
  dbFindOneAndDelete,
} = require("./dbQueries.js");

const orQuery = [
  {
    $addFields: {
      products: {
        $map: {
          input: "$products",
          in: {
            productID: { $toObjectId: "$$this._id" },
          },
        },
      },
    },
  },
  {
    $addFields: {
      customerId: { $toObjectId: "$customerId" },
    },
  },
  {
    $lookup: {
      from: "products",
      localField: "products.productID",
      foreignField: "_id",
      as: "pr",
    },
  },
  {
    $addFields: {
      products: {
        $map: {
          input: "$products",
          as: "p",
          in: {
            $mergeObjects: [
              "$$p",
              {
                $first: {
                  $filter: {
                    input: "$pr",
                    cond: { $eq: ["$$this._id", "$$p.productID"] },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "cus",
    },
  },
  { $sort: { date: -1 } },
  {
    $project: {
      _id: 1,
      date: 1,
      model: 1,
      type: 1,
      price: 1,
      cost: 1,
      description: 1,
      customerName: { $first: "$cus.name" },
      customerSurname: { $first: "$cus.surname" },
      customerId: { $first: "$cus._id" },
      products: {
        $map: {
          input: "$products",
          as: "p",
          in: {
            id: "$$p._id",
            name: "$$p.name",
            size: "$$p.size",
            materials: "$$p.materials",
          },
        },
      },
    },
  },
];

exports.orderQuery = async (req, res) => {
  try {
    const data = await dbFindAggregate(OrderSchema, orQuery);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Siparişler Getirilemedi, Server Bağlantı Hatası" });
  }
};

exports.orderAdd = async (req, res) => {
  const { customerId, date, model, type, price, description, cost, products } =
    req.body;
  const order = OrderSchema({
    customerId,
    date,
    model,
    type,
    price,
    cost,
    description,
    products,
  });
  try {
    const findedCustomer = await dbFindById(CustomerSchema, customerId);
    findedCustomer.orders.push({ _id: order._id });
    await dbSave(findedCustomer);
    try {
      await dbSave(order);
      res.status(200).json({ message: "Sipariş Eklendi" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Sipariş Eklenemedi, Server Bağlantı Hatası" });
    }
  } catch (error) {
    res.status(500).json({ message: "Müşteri Bulunamadı" });
  }
};

exports.orderDelete = async (req, res) => {
  filter = { _id: req.body.orCustomerId };
  updateData = {
    _id: req.body.orId,
  };
  try {
    await dbFindByIdAndUpdate(CustomerSchema, filter, {
      $pull: { orders: updateData },
    });
    try {
      await dbFindByIdAndDelete(OrderSchema, req.body.orId);
      res.status(200).json({ message: "Sipariş Silindi" });
    } catch (error) {
      res.status(500).json({
        message: "Sipariş Silinemedi, Server Bağlantı Hatası",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

exports.addProductToOrder = async (req, res) => {
  filter = { _id: req.body.orderId };
  updateData = {
    _id: req.body.productId,
  };
  try {
    await dbFindByIdAndUpdate(OrderSchema, filter, {
      $push: { products: updateData },
    });
    res.status(200).json({ message: "Sipariş Ürünü Eklendi" });
    await dbFindByIdAndUpdate(OrderSchema, filter, {
      $inc: { cost: req.body.productCost },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sipariş Ürünü Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.deleteProductFromOrder = async (req, res) => {
  const productId = req.body.productId;
  filter = { _id: req.body.orderId };
  updateData = {
    _id: productId,
  };
  try {
    const selectedProduct = await productNoReqQuery(productId);
    try {
      await dbFindByIdAndUpdate(OrderSchema, filter, {
        $pull: { products: updateData },
      });
      res.status(200).json({ message: "Sipariş Ürünü Silindi" });
      await dbFindByIdAndUpdate(OrderSchema, filter, {
        $inc: { cost: -selectedProduct.totalCost },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Sipariş Ürünü Silinemedi, Server Bağlantı Hatası" });
    }
  } catch (error) {
    console.error(e);
  }
};
