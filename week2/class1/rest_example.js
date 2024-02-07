const calculateTotalCost = (id, name, ...costs) => {
    
    let totalCost = 0.0;

    costs.forEach((amount) => (totalCost += amount));

    return {
        productId: id,
        productName: name,
        totalCost: totalCost
    }

}


let mfgCost = 100;
let shipping = 12.99;
let taxes = 5.43;
let insurance = 3.22;

let productInfo = calculateTotalCost(1, "Razer Book", mfgCost, shipping, taxes, insurance);

let fmtCost = productInfo.totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
});

console.log(`${productInfo.productId} - ${productInfo.productName} costs ${fmtCost}`);
