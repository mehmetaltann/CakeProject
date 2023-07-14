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
  semiProductAdd,
  semiProductQuery,
  semiProductUpdate,
  semiProductDelete,
  addMaterialToSemiProduct,
  deleteMaterialToSemiProduct
} = require("../controllers/semiproducts");
router.get("/tarif-sorgula", semiProductQuery);
router.post("/tarif-ekle", semiProductAdd);
router.put("/tarif-guncelle/:id", semiProductUpdate);
router.delete("/tarif-sil/:id", semiProductDelete);
router.put("/tarif-malzeme-ekle", addMaterialToSemiProduct);
router.put("/tarif-malzeme-sil", deleteMaterialToSemiProduct);

//Products
const {
  productAdd,
  productQuery,
  productUpdate,
  productDelete,
  addMaterialToProduct,
  deleteMaterialToProduct,
  addSemiProductToProduct,
  deleteSemiProductToProduct,
} = require("../controllers/products");
router.get("/urun-sorgula", productQuery);
router.post("/urun-ekle", productAdd);
router.put("/urun-guncelle/:id", productUpdate);
router.delete("/urun-sil/:id", productDelete);
router.put("/urun-malzeme-ekle", addMaterialToProduct);
router.put("/urun-malzeme-sil", deleteMaterialToProduct);
router.put("/urun-tarif-ekle", addSemiProductToProduct);
router.put("/urun-tarif-sil", deleteSemiProductToProduct);

module.exports = router;
