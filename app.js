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
  new ProductObj("Sweep", "./product-images/assets/sweep.jpg"),
  new ProductObj("Tauntaun", "./product-images/assets/tauntaun.jpg"),
  new ProductObj("Unicorn", "./product-images/assets/unicorn.jpg"),
  new ProductObj("Water Can", "./product-images/assets/water-can.jpg"),
  new ProductObj("Wine Glass", "./product-images/assets/wine-glass.jpg"),
];

// define names for DOM targets
const imageSection = document.querySelector("#imageSection");
const leftImg = document.querySelector("#leftImg");
const leftImgText = document.querySelector("#leftImgText");
const middleImg = document.querySelector("#middleImg");
const middleImgText = document.querySelector("#middleImgText");
const rightImg = document.querySelector("#rightImg");
const rightImgText = document.querySelector("#rightImgText");
const totalsList = document.querySelector("#totalsList");

renderRandomProducts = function () {
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
      leftImg.src = allProducts[leftProductIndex].imgSrc;
      leftImgText.innerText = allProducts[leftProductIndex].name;
      middleImg.src = allProducts[middleProductIndex].imgSrc;
      middleImgText.innerText = allProducts[middleProductIndex].name;
      rightImg.src = allProducts[rightProductIndex].imgSrc;
      rightImgText.innerText = allProducts[rightProductIndex].name;
    }
  }
};
renderRandomProducts();
