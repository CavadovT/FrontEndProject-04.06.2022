let table = document.getElementById("table");
let total = document.getElementById("total");
let backhome=document.getElementById("home");

let SumTotalPrice = 0;

if (localStorage.getItem("basket") != null) {
  let arr = JSON.parse(localStorage.getItem("basket"));

  arr.forEach((prod) => {
    if (prod.count != 0) {
      let tr = document.createElement("tr");
      let tdImage = document.createElement("td");
      let image = document.createElement("img");
      image.setAttribute("src", prod.imgUrl);
      image.style.width = "100px";
      image.style.height = "80px";
      tdImage.append(image);

      let tdName = document.createElement("td");
      tdName.innerText = prod.name;

      let tdPrice = document.createElement("td");
      tdPrice.innerText = prod.price;

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

      tdQuantity.append(minusBtn, spancount, plusBtn);

      let tdSubtotal = document.createElement("td");
      let btnremove = document.createElement("button");
      btnremove.innerText = "x";
      btnremove.classList.add("btnrmv");

      tdSubtotal.setAttribute("id", "sub");

      tdSubtotal.append(spanSubtotal, btnremove);

      tr.append(tdImage, tdName, tdPrice, tdQuantity, tdSubtotal);

      minusBtn.addEventListener("click", () => {
        prod.count--;
        if (prod.count <= 0) {
          SumTotalPrice -= parseInt(prod.price);
          total.innerText = SumTotalPrice;
          tr.remove();
        } else {
          spancount.innerText = prod.count;
          tdQuantity.append(minusBtn, spancount, plusBtn);
          spanSubtotal.innerText = prod.count * prod.price;
          tdSubtotal.append(spanSubtotal, btnremove);
          SumTotalPrice -= parseInt(prod.price);
          total.innerText = SumTotalPrice;
        }
        localStorage.setItem("basket", JSON.stringify(arr));
        writeProductCount();
      });

      plusBtn.addEventListener("click", () => {
        prod.count++;
        spancount.innerText = prod.count;
        tdQuantity.append(minusBtn, spancount, plusBtn);
        spanSubtotal.innerText = prod.count * prod.price;
        tdSubtotal.append(spanSubtotal, btnremove);
        SumTotalPrice += parseInt(prod.price);
        total.innerText = SumTotalPrice;
        localStorage.setItem("basket", JSON.stringify(arr));
        writeProductCount();
      });

      let btnRemove = document.querySelectorAll(".btnrmv");
      btnRemove.forEach((b) => {
        b.addEventListener("click", () => {
          this.parentElement.parentElement.remove();
          localStorage.setItem("basket", JSON.stringify(arr));
          writeProductCount();
        });
      });

      table.lastElementChild.append(tr);
      SumTotalPrice += parseInt(prod.count * prod.price);
      total.innerText = SumTotalPrice;
      localStorage.setItem("basket", JSON.stringify(arr));
      writeProductCount;
    } 
   
    
  }
  );
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
