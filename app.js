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
const totalsList = document.querySelector("#totalsList");
const resultsButton = document.querySelector("#resultsButton");

// create a function to randomly generate array Products and render them on page in designated spot
let renderRandomProducts = function () {
  let duplicates = true;
  while (duplicates) {
    let leftProductIndex = Math.floor(Math.random() * allProducts.length);
    let middleProductIndex = Math.floor(Math.random() * allProducts.length);
    let rightProductIndex = Math.floor(Math.random() * allProducts.length);
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
    renderProductDataList();
    renderProductDataChart();
  }
};

// create a function to render the results data to a list on the page
let renderProductDataList = function () {
  for (let i = 0; i < allProducts.length; i++) {
    let newLi = document.createElement("li");
    newLi.innerText = `${allProducts[i].name} was shown ${allProducts[i].timesShown} times and clicked ${allProducts[i].clicks} times`;
    totalsList.appendChild(newLi);
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
    label: 'Times Selected',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: productClicks,
  },
    {label: 'Times Shown',
    backgroundColor: 'rgb(25, 99, 132)',
    borderColor: 'rgb(25, 99, 132)',
    data: productTimesShown,
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
          text: 'BusMall Product Survey Results'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
  }
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




