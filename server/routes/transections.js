const router = require("express").Router();

//Materials
const {
  materialQuery,
  materialAdd,
  materialDelete,
  materialUpdate,
} = require("../controllers/materials");
router.post("/malzeme-ekle", materialAdd);
router.get("/malzeme-sorgula", materialQuery);
router.delete("/malzeme-sil/:id", materialDelete);
router.put("/malzeme-guncelle/:id", materialUpdate);

//SemiProducts
const {
  semiProductAdd,
  semiProductQuery,
  semiProductUpdate,
  semiProductDelete,
  addMaterialToSemiProduct,
  deleteMaterialFromSemiProduct,
} = require("../controllers/semiproducts");
router.post("/tarif-ekle", semiProductAdd);
router.get("/tarif-sorgula", semiProductQuery);
router.delete("/tarif-sil/:id", semiProductDelete);
router.put("/tarif-guncelle/:id", semiProductUpdate);
router.put("/tarif-malzeme-ekle", addMaterialToSemiProduct);
router.put("/tarif-malzeme-sil", deleteMaterialFromSemiProduct);

//Products
const {
  productAdd,
  productQuery,
  productUpdate,
  productDelete,
  addMaterialToProduct,
  addSemiProductToProduct,
  deleteMaterialFromProduct,
  deleteSemiProductFromProduct,
} = require("../controllers/products");
router.post("/urun-ekle", productAdd);
router.get("/urun-sorgula", productQuery);
router.delete("/urun-sil/:id", productDelete);
router.put("/urun-guncelle/:id", productUpdate);
router.put("/urun-malzeme-ekle", addMaterialToProduct);
router.put("/urun-tarif-ekle", addSemiProductToProduct);
router.put("/urun-malzeme-sil", deleteMaterialFromProduct);
router.put("/urun-tarif-sil", deleteSemiProductFromProduct);

//Customers
const {
  customerAdd,
  customerQuery,
  customerUpdate,
  customerDelete,
} = require("../controllers/customers");
router.post("/musteri-ekle", customerAdd);
router.get("/musteri-sorgula", customerQuery);
router.delete("/musteri-sil/:id", customerDelete);
router.put("/musteri-guncelle/:id", customerUpdate);

//Orders
const {
  orderAdd,
  orderQuery,
  orderDelete,
  addProductToOrder,
  deleteProductFromOrder,
} = require("../controllers/orders");
router.post("/siparis-ekle", orderAdd);
router.get("/siparis-sorgula", orderQuery);
router.delete("/siparis-sil/:id", orderDelete);
router.put("/siparis-urun-ekle", addProductToOrder);
router.put("/siparis-urun-sil", deleteProductFromOrder);

module.exports = router;
