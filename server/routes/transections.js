const router = require("express").Router();

//Materials
const {
  materialQuery,
  materialAdd,
  materialDelete,
  materialUpdate,
} = require("../controllers/materials");
router.post("/malzeme-ekle", materialAdd);
router.delete("/malzeme-sil/:id", materialDelete);
router.get("/malzeme-sorgula", materialQuery);
router.put("/malzeme-guncelle/:id", materialUpdate);

//SemiProductss
const {
  semiProductQuery,
  semiProductAdd,
  semiProductDelete,
  addMaterialToSemiProduct,
} = require("../controllers/semiproducts");
router.post("/tarif-ekle", semiProductAdd);
router.delete("/tarif-sil/:id", semiProductDelete);
router.get("/tarif-sorgula", semiProductQuery);
router.put("/tarif-malzeme-ekle/:id", addMaterialToSemiProduct);

module.exports = router;
