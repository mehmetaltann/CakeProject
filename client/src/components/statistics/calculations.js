export default function statisticsCalc(data, monthNumber, productData) {
  const productList = data.map((order) => {
    return {
      product: order.products?.map((product) => {
        let matchProductData = productData.find(
          (addr) => addr.id === product.id
        );
        let allMaterialsList = matchProductData.semiproducts?.map(
          (semiProduct) =>
            semiProduct.materials.map((material, i) => ({
              ...material,
              cost: material.cost * semiProduct.spNumber,
              mtNumber: material.mtNumber * semiProduct.spNumber,
            }))
        );
        allMaterialsList.push(matchProductData.materials);
        let filteredAllMaterialsList = [];
        allMaterialsList.map((arr) =>
          arr.map((arr2) => filteredAllMaterialsList.push(arr2))
        );

        const sumCost = filteredAllMaterialsList.reduce(
          (r, { id, mtNumber, unit, name, cost }) => {
            r[id] = r[id] || {
              id: id,
              name,
              unit,
              number: 0,
              cost: 0,
            };
            r[id].number += mtNumber;
            r[id].cost += cost;
            return r;
          },
          {}
        );

        const resultArr = Object.values(sumCost);
        const resultCost = resultArr.reduce((n, { cost }) => n + cost, 0);

        return {
          productId: matchProductData.id,
          productName: matchProductData.name,
          productSize: matchProductData.size,
          productAllMaterials: resultArr,
          productTotalCost: resultCost,
        };
      }),
    };
  });

  let dataList = [];
  productList.map((item) => {
    item.product.map((pr) => {
      dataList.push({
        id: pr.productId,
        name: pr.productName,
        size: pr.productSize,
        cost: pr.productTotalCost,
        materials: pr.productAllMaterials,
      });
    });
    return dataList;
  });

  let allMaterialHere = [];
  dataList.map((item) => {
    item.materials.map((mt) => {
      allMaterialHere.push(mt);
    });
    return allMaterialHere;
  });

  const allMaterialsListReducer = allMaterialHere.reduce(
    (r, { id, name, unit, number, cost }) => {
      r[id] = r[id] || {
        id: id,
        name,
        unit,
        cost: 0,
        number: 0,
      };
      r[id].number += number;
      r[id].cost += cost;
      return r;
    },
    {}
  );

  const cakeTypeCountListReducer = dataList.reduce((r, { id, name, size }) => {
    r[id] = r[id] || {
      id: id,
      name,
      size,
      count: 0,
    };
    r[id].count += 1;
    return r;
  }, {});

  const allUsedMaterials = Object.values(allMaterialsListReducer);
  const cakeTypeCount = Object.values(cakeTypeCountListReducer);
  const totalIncome = data.reduce((n, { price }) => n + price, 0);
  const averageIncome = totalIncome / monthNumber;
  const totalCost = dataList.reduce((n, { cost }) => n + cost, 0);
  const averageCost = totalCost / monthNumber;
  const totalProfit = totalIncome - totalCost;
  const averageProfit = totalProfit / monthNumber;

  return {
    allUsedMaterials,
    cakeTypeCount,
    totalIncome,
    averageIncome,
    totalCost,
    averageCost,
    totalProfit,
    averageProfit,
  };
}
