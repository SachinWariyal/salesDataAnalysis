const salesData = require('./data.json');

//function to extract month from the date
function getMonth(dateString) {
  return dateString.slice(0, 7); // "YYYY-MM" format
}

// Total sales of the store
let totalSales = 0;
for (const entry of salesData) {
  totalSales += parseFloat(entry["Total Price"]);
}
console.log(`Total Sales of the Store: ${totalSales}`);

// Month-wise sales totals
const monthWiseSales = {};
for (const entry of salesData) {
  const month = getMonth(entry["Date"]);
  if (!monthWiseSales[month]) {
    monthWiseSales[month] = 0;
  }
  monthWiseSales[month] += parseFloat(entry["Total Price"]);
}
console.log("Month-wise Sales Totals:", monthWiseSales);

// Most popular item in each month
const monthWisePopularItem = {};
for (const entry of salesData) {
  const month = getMonth(entry["Date"]);
  if (!monthWisePopularItem[month]) {
    monthWisePopularItem[month] = {};
  }
  if (!monthWisePopularItem[month][entry["SKU"]]) {
    monthWisePopularItem[month][entry["SKU"]] = 0;
  }
  monthWisePopularItem[month][entry["SKU"]] += parseInt(entry["Quantity"], 10);
}

for (const month in monthWisePopularItem) {
  let maxQuantity = 0;
  let popularItem = '';
  for (const item in monthWisePopularItem[month]) {
    if (monthWisePopularItem[month][item] > maxQuantity) {
      maxQuantity = monthWisePopularItem[month][item];
      popularItem = item;
    }
  }
  console.log(`Most popular item in ${month}: ${popularItem} (Quantity: ${maxQuantity})`);
}

// Items generating most revenue in each month
const monthWiseRevenueItem = {};
for (const entry of salesData) {
  const month = getMonth(entry["Date"]);
  if (!monthWiseRevenueItem[month]) {
    monthWiseRevenueItem[month] = {};
  }
  if (!monthWiseRevenueItem[month][entry["SKU"]]) {
    monthWiseRevenueItem[month][entry["SKU"]] = 0;
  }
  monthWiseRevenueItem[month][entry["SKU"]] += parseFloat(entry["Total Price"]);
}

for (const month in monthWiseRevenueItem) {
  let maxRevenue = 0;
  let revenueItem = '';
  for (const item in monthWiseRevenueItem[month]) {
    if (monthWiseRevenueItem[month][item] > maxRevenue) {
      maxRevenue = monthWiseRevenueItem[month][item];
      revenueItem = item;
    }
  }
  console.log(`Item generating most revenue in ${month}: ${revenueItem} (Revenue: ${maxRevenue})`);
}

// Min, Max, and Average quantity sold for the most popular item each month
for (const month in monthWisePopularItem) {
  let minOrders = Infinity;
  let maxOrders = 0;
  let totalOrders = 0;
  let totalEntries = 0;

  for (const item in monthWisePopularItem[month]) {
    const quantity = parseInt(monthWisePopularItem[month][item], 10);
    if (quantity < minOrders) minOrders = quantity;
    if (quantity > maxOrders) maxOrders = quantity;
    totalOrders += quantity;
    totalEntries++;
  }

  const avgOrders = totalOrders / totalEntries;

  console.log(
    `For the most popular item in ${month}, Min: ${minOrders}, Max: ${maxOrders}, Avg: ${avgOrders.toFixed(2)}`
  );
}
