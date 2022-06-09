//start
let addBtns = document.querySelectorAll(".addBtn");
let productCount = document.getElementById("productCount");

addBtns.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    event.preventDefault();

    if (localStorage.getItem("basket") == null) {
      localStorage.setItem("basket", JSON.stringify([]));
    }
    let arr = JSON.parse(localStorage.getItem("basket"));
    let prodId = this.parentElement.getAttribute("data-id");
    let existProduct = arr.find((e) => e.id == prodId);

    if (existProduct == undefined) {
      arr.push({
        id: prodId,
        price: this.previousElementSibling.innerText.split(" ")[1],
        imgUrl:
          this.parentElement.parentElement.firstElementChild.getAttribute(
            "src"
          ),
        name: this.parentElement.firstElementChild.innerText,
        count: 1,
      });
    } else {
      existProduct.count++;
    }
    localStorage.setItem("basket", JSON.stringify(arr));
    writeProductCount();
  });
});


function writeProductCount() {
  if (localStorage.getItem("basket") != null) {
    let arr = JSON.parse(localStorage.getItem("basket"));
    let totalCount=0;
    arr.map(product=>{
      totalCount+=product.count;
    })
  productCount.innerText=totalCount;
  }
}
writeProductCount();
