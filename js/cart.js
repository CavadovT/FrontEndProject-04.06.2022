let table = document.getElementById("table");
let totalprice = document.getElementById("totalprice");
let backhome = document.getElementById("home");
let totalfix = document.getElementById("totalfix");
let emptiycart = document.getElementById("empity");
let cardcontainer = document.getElementById("cont");
let SumTotalPrice = 0;

if (localStorage.getItem("basket") != null) {
  let arr = JSON.parse(localStorage.getItem("basket"));

  arr.forEach((prod) => {
    if (prod.count == 0) {
      // cardcontainer.classList.add("d-none");
      // emptiycart.classList.remove("d-none");
    } else {
      // emptiycart.classList.add("d-none");
      // cardcontainer.classList.remove("d-none");

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
      spanSubtotal.innerText = prod.count * prod.price;
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
        } else {
          spancount.innerText = prod.count;
          tdQuantity.append(minusBtn, spancount, plusBtn);
          spanSubtotal.innerText = parseFloat(prod.count * prod.price).toFixed(2);
          // tdSubtotal.append(spanSubtotal, btnremove);
          SumTotalPrice -= parseFloat(prod.price);
          totalprice.innerText = SumTotalPrice.toFixed(2);
          totalfix.innerText = parseFloat(SumTotalPrice + 5).toFixed(2);
        }

        localStorage.setItem("basket", JSON.stringify(arr));
        writeProductCount();
      });

      plusBtn.addEventListener("click", () => {
        prod.count++;
        spancount.innerText = prod.count;
        tdQuantity.append(minusBtn, spancount, plusBtn);
        spanSubtotal.innerText = parseFloat(prod.count * prod.price).toFixed(2);
        tdSubtotal.append(spanSubtotal, btnremove);

        SumTotalPrice += parseFloat(prod.price);
        totalprice.innerText = SumTotalPrice.toFixed(2);
        totalfix.innerText = parseFloat(SumTotalPrice + 5).toFixed(2);

        localStorage.setItem("basket", JSON.stringify(arr));
        writeProductCount();
      });

      let btnRemove = document.querySelectorAll(".btnrmv");
      console.log(btnRemove);
      // btnRemove.onclick= function(){
      //   alert("salam");
      //   e.parentElement.remove();
      //   localStorage.removeItem(e.parentElement);
      //   SumTotalPrice -= prod.count * prod.price;
      //   prod.count = 0;
      //   totalprice.innerText = parseFloat(SumTotalPrice).toFixed(2);
      //   totalfix.innerText = parseFloat(SumTotalPrice + 5).toFixed(2);
      //   localStorage.setItem("basket", JSON.stringify(arr));
      //   WriteProductCount();
      // };

      table.lastElementChild.append(tr);
      SumTotalPrice += parseFloat(prod.count * prod.price);
      totalprice.innerText = SumTotalPrice.toFixed(2);
      totalfix.innerText = parseFloat(SumTotalPrice + 5).toFixed(2);
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
