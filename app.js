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
  new ProductObj("Pet Sweep", "./product-images/assets/pet-sweep.jpg"),
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
const totalsTable = document.querySelector("#totalsTable");
const resultsButton = document.querySelector("#resultsButton");
const dataButton = document.createElement('button');

// create a function to randomly generate array Products that dont duplicate or repeat
let chooseRandomProducts = function () {
  // shuffle the array of product objects to randomize their position in the array
  shuffle(allProducts);

  // create a new empty array to hold chosen products
  let chosenProducts = [];

  for (let i = 0; i < allProducts.length; i++) {

    // set a variable to represent each object in each iteration of the index
    let chosenProduct = allProducts[i];

    if(chosenProduct != leftProduct && chosenProduct != middleProduct && chosenProduct != rightProduct){
      // push the chosen products into the array of chosen products if they don't equal the previously chosen products
      chosenProducts.push(chosenProduct);

      // if 3 items are chosen break the loop
      if (chosenProducts.length === 3){
        break;
      }
    }
  }
// change the products to the products that were allowed into the new array
  leftProduct = chosenProducts[0];
  middleProduct = chosenProducts[1];
  rightProduct = chosenProducts[2];
};

let renderRandomProducts = function(){
  leftImg.src = leftProduct.imgSrc;
  leftImgText.innerText = leftProduct.name;
  middleImg.src = middleProduct.imgSrc;
  middleImgText.innerText = middleProduct.name;
  rightImg.src = rightProduct.imgSrc;
  rightImgText.innerText = rightProduct.name;
  leftProduct.timesShown++;
  rightProduct.timesShown++;
  middleProduct.timesShown++;
}


// create a function that handles the event of an product being clicked
let handleProductClick = function (evt) {
  totalClicks++;
  if (totalClicks < maxClicks) {
    if (evt.target == leftProductDiv || evt.target == leftImg || evt.target == leftImgText) {
      leftProduct.clicks++;
    } else if (evt.target == middleProductDiv || evt.target == middleImg || evt.target == middleImgText) {
      middleProduct.clicks++;
    } else if (evt.target == rightProductDiv || evt.target == rightImg || evt.target == rightImgText) {
      rightProduct.clicks++;
    }
    chooseRandomProducts();
    renderRandomProducts();
  } else if (totalClicks == maxClicks) {
    // update local storage every time voting process ends
    updateLocalStorage();
    imageSection.removeEventListener('click', handleProductClick);
    dataButton.innerText = 'Show Survey Results';
    dataButton.addEventListener('click', renderProductDataChart);
    resultsButton.appendChild(dataButton);
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
let renderProductDataChart = function(evt){
  dataButton.removeEventListener('click', renderProductDataTable);
  renderProductDataTable();
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

// fisher yates style shuffle function 
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
// create a function to store data locally
function updateLocalStorage() {
  //console.log("Updating localStorage....");
  const arrayString = JSON.stringify(allProducts);
  // key, value pairs
  localStorage.setItem('Product', arrayString);
} 

// create a function to retrieve the locally stored data
function getLocalStorage() {
  // retrieve data from local storage
  const oldProductData = localStorage.getItem('Product');
  
  // convert the data (array) from a string to something that we can use in JavaScript.
  const productData = JSON.parse(oldProductData);

  // If this is the first time we visit the page, there will not be an array for us to use in localStorage
  if (productData !== null) {
    allProducts = productData;
  }
}
// choose the products to render first
chooseRandomProducts();
// load page with random products
renderRandomProducts();
getLocalStorage();

// create an event listener to handle clicks
imageSection.addEventListener("click", handleProductClick);




