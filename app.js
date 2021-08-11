// declare variables needed for universal functionality
let maxClicks = 10;
let totalClicks = 0;
let leftProduct = null;
let middleProduct = null;
let rightProduct = null;

// make a class for new product object
class ProductObj {
  clicks = 0;
  timesShown = 0;

  constructor(name, imgSrc) {
    this.name = name;
    this.imgSrc = imgSrc;
  }
}
// make an array to hold product objects
let allProducts = [
  new ProductObj("Bag", "./product-images/assets/bag.jpg"),
  new ProductObj("Banana", "./product-images/assets/banana.jpg"),
  new ProductObj("Bathroom", "./product-images/assets/bathroom.jpg"),
  new ProductObj("Boots", "./product-images/assets/boots.jpg"),
  new ProductObj("Breakfast", "./product-images/assets/breakfast.jpg"),
  new ProductObj("Bubblegum", "./product-images/assets/bubblegum.jpg"),
  new ProductObj("Chair", "./product-images/assets/chair.jpg"),
  new ProductObj("Cthulhu", "./product-images/assets/cthulhu.jpg"),
  new ProductObj("Dog Duck", "./product-images/assets/dog-duck.jpg"),
  new ProductObj("Dragon", "./product-images/assets/dragon.jpg"),
  new ProductObj("Pen", "./product-images/assets/pen.jpg"),
  new ProductObj("Scissors", "./product-images/assets/scissors.jpg"),
  new ProductObj("Shark", "./product-images/assets/shark.jpg"),
  new ProductObj("Sweep", "./product-images/assets/sweep.png"),
  new ProductObj("Tauntaun", "./product-images/assets/tauntaun.jpg"),
  new ProductObj("Unicorn", "./product-images/assets/unicorn.jpg"),
  new ProductObj("Water Can", "./product-images/assets/water-can.jpg"),
  new ProductObj("Wine Glass", "./product-images/assets/wine-glass.jpg"),
];
// make arrays to hold chart data
let productLabels = [];
let productClicks = [];
let productTimesShown = [];
// make array to prevent repeating images in consecutive voting rounds
let productIndeces = [];

// define names for DOM targets
const imageSection = document.querySelector("#imageSection");
const leftProductDiv = document.querySelector('#leftProductDiv');
const middleProductDiv = document.querySelector('#middleProductDiv');
const rightProductDiv = document.querySelector('#rightProductDiv');
const leftImg = document.querySelector("#leftImg");
const leftImgText = document.querySelector("#leftImgText");
const middleImg = document.querySelector("#middleImg");
const middleImgText = document.querySelector("#middleImgText");
const rightImg = document.querySelector("#rightImg");
const rightImgText = document.querySelector("#rightImgText");
const totalsTable = document.querySelector("#totalsTable");
const resultsButton = document.querySelector("#resultsButton");

// create a function to randomly generate array Products and render them on page in designated spot
let renderRandomProducts = function () {
  let duplicates = true;
  let repeats = true;
  while (duplicates && repeats) {
    let leftProductIndex = Math.floor(Math.random() * allProducts.length);
    let middleProductIndex = Math.floor(Math.random() * allProducts.length);
    let rightProductIndex = Math.floor(Math.random() * allProducts.length);
    // check for repeats from indeces array
    if (productIndeces.indexOf(leftProductIndex) < 0 && productIndeces.indexOf(middleProductIndex) < 0 && productIndeces.indexOf(rightProductIndex) < 0){
      repeats = false;
      // clear the array if the checks pass
      productIndeces.pop();
      productIndeces.pop();
      productIndeces.pop();
      if (
      leftProductIndex != rightProductIndex &&
      leftProductIndex != middleProductIndex &&
      middleProductIndex != rightProductIndex
    ) {
      duplicates = false;
      leftProduct = allProducts[leftProductIndex];
      middleProduct = allProducts[middleProductIndex];
      rightProduct = allProducts[rightProductIndex];
      allProducts[leftProductIndex].timesShown++;
      allProducts[middleProductIndex].timesShown++;
      allProducts[rightProductIndex].timesShown++;
      leftImg.src = allProducts[leftProductIndex].imgSrc;
      leftImgText.innerText = allProducts[leftProductIndex].name;
      middleImg.src = allProducts[middleProductIndex].imgSrc;
      middleImgText.innerText = allProducts[middleProductIndex].name;
      rightImg.src = allProducts[rightProductIndex].imgSrc;
      rightImgText.innerText = allProducts[rightProductIndex].name;
      productIndeces.push(leftProductIndex, middleProductIndex, rightProductIndex);
    }
  }
  }
};




// create a function that handles the event of an product being clicked
let handleProductClick = function (evt) {
  if (totalClicks < maxClicks) {
    totalClicks++;
    if (evt.target == leftProductDiv || evt.target == leftImg || evt.target == leftImgText) {
      leftProduct.clicks++;
    } else if (evt.target == middleProductDiv || evt.target == middleImg || evt.target == middleImgText) {
      middleProduct.clicks++;
    } else if (evt.target == rightProductDiv || evt.target == rightImg || evt.target == rightImgText) {
      rightProduct.clicks++;
    }
    renderRandomProducts();
  } else {
    imageSection.removeEventListener('click', handleProductClick)
    renderProductDataTable();
    renderProductDataChart();
  }
};

// create a function to render the results data to a list on the page
let renderProductDataTable = function () {
  let tableHead = totalsTable.createTHead();
  let tHeadRow = tableHead.insertRow();
  let productHead = tHeadRow.insertCell();
  productHead.innerText = 'Products';
  let timesShownHead = tHeadRow.insertCell();
  timesShownHead.innerText = 'Times Shown';
  let clickedHead = tHeadRow.insertCell();
  clickedHead.innerText = 'Times Clicked';
  for (let i = 0; i < allProducts.length; i++) {
    let newRow = totalsTable.insertRow();
    let nameCell = newRow.insertCell();
    nameCell.textContent = allProducts[i].name;
    let timesShownCell = newRow.insertCell();
    timesShownCell.textContent = allProducts[i].timesShown;
    let timesClickedCell = newRow.insertCell();
    timesClickedCell.textContent = allProducts[i].clicks;
  }
};
// create a function to render the chart with collected data
let renderProductDataChart = function(){
  for (let i = 0; i < allProducts.length; i++) {
    productLabels.push(allProducts[i].name);
    productTimesShown.push(allProducts[i].timesShown);
    productClicks.push(allProducts[i].clicks);
  }
// adding a chart with chart js
const labels = productLabels;
const data = {
  labels: labels,
  datasets: [{
    label: 'Times Shown',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: productTimesShown,
  },
    {label: 'Times Selected',
    backgroundColor: 'rgb(25, 99, 132)',
    borderColor: 'rgb(25, 99, 132)',
    data: productClicks,
}
]
};
const config = {
  type: 'bar',
  data,
  options: {
      plugins: {
        title: {
          display: true,
          text: 'BusMall Product Survey Data'
        },
      },
}
}
  let productDataChart = new Chart(
    document.getElementById('productDataChart'),
    config
  );
}

// load page with random products
renderRandomProducts();

// create an event listener to handle clicks
imageSection.addEventListener("click", handleProductClick);




