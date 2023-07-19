const SemiProductSchema = require("../models/SemiProduct.js");
const ProductSchema = require("../models/Product.js");
const {
  dbFindByIdAndDelete,
  dbSave,
  dbFindByIdAndUpdate,
  dbFindOne,
  dbFindAggregate,
} = require("./dbQueries.js");

const spQuery = [
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
    $project: {
      _id: 1,
      name: 1,
      materials: 1,
      description: 1,
      totalCost: { $sum: "$materials.cost" },
    },
  },
];

exports.semiProductQuery = async (req, res) => {
  try {
    const data = await dbFindAggregate(SemiProductSchema, spQuery);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tarifler Getirilemedi, Server Bağlantı Hatası" });
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
    _id: req.body.id,
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

exports.deleteMaterialFromSemiProduct = async (req, res) => {
  filter = { _id: req.body.spId };
  updateData = {
    _id: req.body.mtId,
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
