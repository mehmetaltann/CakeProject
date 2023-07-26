const ProductSchema = require("../models/Product.js");
const OrderSchema = require("../models/Order.js");
const {
  dbFindOne,
  dbFindByIdAndDelete,
  dbSave,
  dbFindByIdAndUpdate,
  dbFindAggregate,
} = require("./dbQueries.js");

const pQuery = [
  {
    $lookup: {
      from: "materials",
      localField: "materials._id",
      foreignField: "_id",
      as: "mat",
    },
  },
  {
    $addFields: {
      materials: {
        $map: {
          input: "$materials",
          as: "m",
          in: {
            $mergeObjects: [
              "$$m",
              {
                $first: {
                  $filter: {
                    input: "$mat",
                    cond: { $eq: ["$$this._id", "$$m._id"] },
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
    $addFields: {
      materials: {
        $map: {
          input: "$materials",
          as: "m",
          in: {
            id: "$$m._id",
            name: "$$m.name",
            unit: "$$m.unit",
            mtNumber: "$$m.mtNumber",
            cost: {
              $multiply: [
                { $divide: ["$$m.price", "$$m.amount"] },
                "$$m.mtNumber",
              ],
            },
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "semiproducts",
      localField: "semiproducts._id",
      foreignField: "_id",
      as: "sp",
    },
  },
  {
    $addFields: {
      semiproducts: {
        $map: {
          input: "$semiproducts",
          as: "s",
          in: {
            $mergeObjects: [
              "$$s",
              {
                $first: {
                  $filter: {
                    input: "$sp",
                    cond: { $eq: ["$$this._id", "$$s._id"] },
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
      from: "materials",
      localField: "semiproducts.materials._id",
      foreignField: "_id",
      as: "mtsp",
    },
  },
  {
    $addFields: {
      semiproducts: {
        $map: {
          input: "$semiproducts",
          as: "s",
          in: {
            spNumber: "$$s.spNumber",
            id: "$$s._id",
            name: "$$s.name",
            description: "$$s.description",
            materials: {
              $map: {
                input: "$$s.materials",
                as: "sm",
                in: {
                  $mergeObjects: [
                    "$$sm",
                    {
                      $first: {
                        $filter: {
                          input: "$mtsp",
                          cond: { $eq: ["$$this._id", "$$sm._id"] },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $addFields: {
      semiproducts: {
        $map: {
          input: "$semiproducts",
          as: "s",
          in: {
            spNumber: "$$s.spNumber",
            id: "$$s.id",
            name: "$$s.name",
            description: "$$s.description",
            materials: {
              $map: {
                input: "$$s.materials",
                as: "sm",
                in: {
                  id: "$$sm._id",
                  name: "$$sm.name",
                  unit: "$$sm.unit",
                  mtNumber: "$$sm.mtNumber",
                  cost: {
                    $multiply: [
                      { $divide: ["$$sm.price", "$$sm.amount"] },
                      "$$sm.mtNumber",
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $addFields: {
      semiproducts: {
        $map: {
          input: "$semiproducts",
          as: "s",
          in: {
            spNumber: "$$s.spNumber",
            id: "$$s.id",
            name: "$$s.name",
            description: "$$s.description",
            materials: "$$s.materials",
            materialcost: {
              $multiply: [{ $sum: "$$s.materials.cost" }, "$$s.spNumber"],
            },
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 1,
      deneme: 1,
      name: 1,
      size: 1,
      spNumber: 1,
      description: 1,
      materials: 1,
      semiproducts: 1,
      totalmaterialscost: { $sum: "$materials.cost" },
      totalsemiproductscost: { $sum: "$semiproducts.materialcost" },
      totalCost: {
        $sum: [
          { $sum: "$materials.cost" },
          { $sum: "$semiproducts.materialcost" },
        ],
      },
    },
  },
];

exports.productQuery = async (req, res) => {
  try {
    const data = await dbFindAggregate(ProductSchema, pQuery);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ürünler Gitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.productNoReqQuery = async (productId) => {
  try {
    const data = await dbFindAggregate(ProductSchema, pQuery);
    const filteredData = data.find((item) => item._id.toString() === productId);
    return filteredData;
  } catch (e) {
    console.error(e);
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
  const oRes = await dbFindOne(OrderSchema, {
    "products._id": req.params.id,
  });

  if (!oRes) {
    try {
      await dbFindByIdAndDelete(ProductSchema, req.params.id);
      res.status(200).json({ message: "Ürün Silindi" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ürün Silinemedi, Server Bağlantı Hatası" });
    }
  } else {
    res.status(200).json({
      message: "Ürün Silinemedi, Bu ürün bir siparişte kullanılmaktadır.",
    });
  }
};

exports.addMaterialToProduct = async (req, res) => {
  filter = { _id: req.body.objId };
  updateData = {
    _id: req.body.id,
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

exports.deleteMaterialFromProduct = async (req, res) => {
  filter = { _id: req.body.pId };
  updateData = {
    _id: req.body.mtId,
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
    _id: req.body.id,
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

exports.deleteSemiProductFromProduct = async (req, res) => {
  filter = { _id: req.body.pId };
  updateData = {
    _id: req.body.spId,
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
