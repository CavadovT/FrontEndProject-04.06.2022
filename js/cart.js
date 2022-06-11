let table = document.getElementById("table");
let totalprice = document.getElementById("totalprice");
let backhome = document.getElementById("home");
let totalfix = document.getElementById("totalfix");
let emptiycart = document.getElementById("empity");
let cardcontainer = document.getElementById("cont");
let pagetotal = document.getElementById("ptotal");
let istrue = document.querySelector(".flattrue");
let isfalse = document.querySelectorAll(".flatfalse");

let SumTotalPrice = 0;

if (parseFloat(pagetotal.innerText) < 0.5) {
  emptiycart.classList.remove("d-none");
  cardcontainer.classList.add("d-none");
} else {
  emptiycart.classList.add("d-none");
  cardcontainer.classList.remove("d-none");
}

if (localStorage.getItem("basket") != null) {
  let arr = JSON.parse(localStorage.getItem("basket"));
  arr.forEach((prod) => {
    if (prod.count == 0) {
    } else {
      let tr = document.createElement("tr");
      let tdImage = document.createElement("td");
      let image = document.createElement("img");
      image.setAttribute("src", prod.imgUrl);
      image.style.width = "100px";
      image.style.height = "80px";

      let tdName = document.createElement("td");
      tdName.innerText = prod.name;

      let tdPrice = document.createElement("td");
      tdPrice.innerText = parseFloat(prod.price);

      let tdQuantity = document.createElement("td");
      let minusBtn = document.createElement("button");
      let plusBtn = document.createElement("button");
      minusBtn.innerText = " - ";
      plusBtn.innerText = " + ";

      minusBtn.classList.add("mrgn");
      minusBtn.setAttribute("id", "m");
      plusBtn.classList.add("mrgn");
      plusBtn.setAttribute("id", "p");
      let spancount = document.createElement("span");
      let spanSubtotal = document.createElement("span");
      spanSubtotal.innerText = (prod.count * prod.price).toFixed(2);
      spancount.innerText = prod.count;

      let tdSubtotal = document.createElement("td");
      let btnremove = document.createElement("button");
      btnremove.innerText = "x";
      btnremove.classList.add("btnrmv");

      tdImage.append(image);

      tdSubtotal.setAttribute("id", "sub");

      tdSubtotal.append(spanSubtotal, btnremove);

      tdQuantity.append(minusBtn, spancount, plusBtn);

      tr.append(tdImage, tdName, tdPrice, tdQuantity, tdSubtotal);

      minusBtn.addEventListener("click", () => {
        prod.count--;
        if (prod.count <= 0) {
          tr.remove();
          SumTotalPrice -= parseFloat(prod.price);
          totalprice.innerText = SumTotalPrice.toFixed(2);
          totalfix.innerText = parseFloat(SumTotalPrice + 5).toFixed(2);
          pagetotal.innerText = SumTotalPrice.toFixed(2);
        } else {
          spancount.innerText = prod.count;
          tdQuantity.append(minusBtn, spancount, plusBtn);
          spanSubtotal.innerText = parseFloat(prod.count * prod.price).toFixed(
            2
          );
          tdSubtotal.append(spanSubtotal, btnremove);
          SumTotalPrice -= parseFloat(prod.price);
          totalprice.innerText = SumTotalPrice.toFixed(2);
          pagetotal.innerText = SumTotalPrice.toFixed(2);
          totalfix.innerText = parseFloat(SumTotalPrice + 5).toFixed(2);
        }

        localStorage.setItem("basket", JSON.stringify(arr));
        writeProductCount();
        if (SumTotalPrice <= 1) {
          cardcontainer.classList.add("d-none");
          emptiycart.classList.remove("d-none");
        }
      });

      plusBtn.addEventListener("click", () => {
        prod.count++;
        spancount.innerText = prod.count;
        tdQuantity.append(minusBtn, spancount, plusBtn);
        spanSubtotal.innerText = parseFloat(prod.count * prod.price).toFixed(2);
        tdSubtotal.append(spanSubtotal, btnremove);

        SumTotalPrice += parseFloat(prod.price);
        totalprice.innerText = SumTotalPrice.toFixed(2);
        pagetotal.innerText = SumTotalPrice.toFixed(2);
        totalfix.innerText = parseFloat(SumTotalPrice + 5).toFixed(2);
        localStorage.setItem("basket", JSON.stringify(arr));
        writeProductCount();
      });

      btnremove.addEventListener("click", () => {
        tr.remove();
        SumTotalPrice -= parseFloat(prod.price * prod.count);
        totalprice.innerText = SumTotalPrice.toFixed(2);
        pagetotal.innerText = SumTotalPrice.toFixed(2);
        totalfix.innerText = parseFloat(SumTotalPrice + 5).toFixed(2);
        prod.count = 0;
        localStorage.setItem("basket", JSON.stringify(arr));
        writeProductCount();
        if (SumTotalPrice <= 1) {
          cardcontainer.classList.add("d-none");
          emptiycart.classList.remove("d-none");
        }
      });

      table.lastElementChild.append(tr);
      SumTotalPrice += parseFloat(prod.count * prod.price);
      totalprice.innerText = SumTotalPrice.toFixed(2);
      pagetotal.innerText = SumTotalPrice.toFixed(2);
      totalfix.innerText = parseFloat(SumTotalPrice + 5).toFixed(2);
      istrue.addEventListener("click", () => {
        totalfix.innerText = parseFloat(SumTotalPrice+5).toFixed(2);
      });
      isfalse.forEach((e) => {
        e.addEventListener("click", () => {
          totalfix.innerText = parseFloat(SumTotalPrice).toFixed(2);
        });
      });
      localStorage.setItem("basket", JSON.stringify(arr));
      writeProductCount;
    }
  });
}
function writeProductCount() {
  if (localStorage.getItem("basket") != null) {
    let arr = JSON.parse(localStorage.getItem("basket"));
    let totalCount = 0;

    arr.map((product) => {
      totalCount += parseInt(product.count);
    });
    productCount.innerText = totalCount;
  }
}
writeProductCount();
