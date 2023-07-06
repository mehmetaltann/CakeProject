const router = require("express").Router();

//Materials
const {
  materialQuery,
  materialAdd,
  materialDelete,
} = require("../controllers/materials");
router.post("/malzeme-ekle", materialAdd);
router.delete("/malzeme-sil/:id", materialDelete);
router.get("/malzeme-sorgula", materialQuery);

module.exports = router;
