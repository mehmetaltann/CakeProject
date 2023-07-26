const ParameterSchema = require("../models/Parameter");
const {
  dbFind,
  dbFindByIdAndDelete,
  dbSave,
  dbFindOneAndUpdate,
} = require("./dbQueries");

exports.parameterQuery = async (req, res) => {
  try {
    const data = await dbFind(ParameterSchema);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Parametreler Gitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.parameterAdd = async (req, res) => {
  const { variant, content } = req.body;
  const parameter = ParameterSchema({
    variant,
    content,
  });
  try {
    await dbSave(parameter);
    res.status(200).json({ message: "Parametre Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Parametre Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.parameterContentAdd = async (req, res) => {
  const { variant, title, value } = req.body;
  try {
    await dbFindOneAndUpdate(
      ParameterSchema,
      { variant },
      { $push: { content: [{ title, value }] } }
    );
    res.status(200).json({ message: "Parametre İçeriği Eklendi" });
  } catch (error) {
    res.status(500).json({
      message: "Parametre İçeriği Eklenemedi, Server Bağlantı Hatası",
    });
  }
};

exports.parameterContentDelete = async (req, res) => {
  const { variant, title, value } = req.body;

  try {
    await dbFindOneAndUpdate(
      ParameterSchema,
      { variant },
      { $pull: { content: { value } } },
      { safe: true, multi: false }
    );
    res.status(200).json({ message: "Parametre İçeriği Silindi" });
  } catch (error) {
    res.status(500).json({
      message: "Parametre İçeriği Silinemedi, Server Bağlantı Hatası",
    });
  }
};

exports.parameterDelete = async (req, res) => {
  try {
    await dbFindByIdAndDelete(ParameterSchema, req.params.id);
    res.status(200).json({ message: "Parametre Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Parametre Silinemedi, Server Bağlantı Hatası" });
  }
};
