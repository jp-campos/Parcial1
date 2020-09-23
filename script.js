const urlDatos =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const BURGERS = "Burguers";

let carrito = [];
let itemsCarrito = 0;

const $ = (selector) => document.querySelector(selector);

function confirmarOrden() {
  console.log(carrito);
}

function cancelarOrden() {
  carrito = [];
  renderCarrito();
  $("#items_carrito").textContent = "";
  itemsCarrito = 0;
}

function renderCarrito() {
  const titulo = $("#titulo_seccion");
  titulo.textContent = "Order detail";

  $("#main").innerHTML = "";

  const tablaHead = `<table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Qty</th>
                            <th scop="col">Description</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Amount</th>
                        </tr>
                        </thead>
                        <tbody id="tabla_body">

                        </tbody>
                    </table>
                    
                    <div class="d-flex justify-content-between">
                        <p id="total_carrito" class="font-weight-bold"></p>
                        <div class="d-flex mr-5">
                            <button type="button" class="btn boton-cancel" data-toggle="modal" data-target="#exampleModal">Cancel</button>
                            <button onclick="confirmarOrden()"class="btn boton-accept ml-1">Confirm order</button>
                        </div>
                    </div>
        
                    
                    `;

  $("#main").innerHTML = tablaHead;

  let total = 0;
  let stringBody = "";
  carrito.forEach((elem) => {
    let rowHtml = `
                <tr>
                    <td>${elem.item}</td>
                    <td>${elem.quantity}</td>
                    <td>${elem.description}</td>
                    <td>${elem.unitPrice}</td>
                    <td>${elem.unitPrice * elem.quantity}</td>
                </tr>
        `;
    stringBody += rowHtml;

    total += elem.unitPrice * elem.quantity;
  });

  $("#tabla_body").innerHTML = stringBody;
  $("#total_carrito").textContent = "Total: $" + total.toFixed(2);
}

function addToCart(nombreProd, precio) {
  let prod = getProdCarrito(nombreProd);

  if (prod !== null) {
    prod["quantity"] += 1;
  } else {
    let fila = {
      item: carrito.length + 1,
      quantity: 1,
      description: nombreProd,
      unitPrice: precio,
    };

    carrito.push(fila);
  }
  //TODO: Revisar si por items es el total o el otro
  itemsCarrito++;
  $("#items_carrito").textContent = itemsCarrito + " items";
}

function renderProductos(productos) {
  let tipo = productos.name;
  let prods = productos.products;

  const titulo = $("#titulo_seccion");
  titulo.textContent = tipo === "Burguers" ? "Burgers" : tipo;

  $("#main").innerHTML = "";

  const row = document.createElement("div");
  row.setAttribute("class", "row");

  let totalCards = "";
  prods.forEach((elem) => {
    let cardHtml = `<div class="col-3 pr-1 mb-3 d-flex align-items-stretch">
                            <div class="card" style="width:100%">
                                <img src="${elem.image}" class="card-img-top" alt="...">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 class="card-title">${elem.name}</h5>
                                        <p class="card-text">${elem.description}</p>
                                    </div>
                                    <div>
                                        <p class="font-weight-bold">$${elem.price}</p> 
                                        <button onClick="addToCart('${elem.name}',${elem.price})" class="btn btn-dark">Add to Cart</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>`;
    totalCards += cardHtml;
  });

  row.innerHTML = totalCards;

  $("#main").appendChild(row);
}

function renderTipo(tipo) {
  let prods = getProductosPorTipo(tipo);

  renderProductos(prods);
}

function cargaInicial() {
  fetch(urlDatos)
    .then((response) => response.json())
    .then((json) => {
      datos = json;

      let burgers = getProductosPorTipo(BURGERS);

      renderProductos(burgers);
    });
}

function getProductosPorTipo(tipo) {
  for (let elem of datos) {
    if (elem.name === tipo) {
      return elem;
    }
  }
}

function getProdCarrito(nombreProd) {
  for (let elem of carrito) {
    if (elem.description === nombreProd) {
      return elem;
    }
  }
  return null;
}
