let products = [];

const clearFields = () => {
  const idField = document.getElementById("productId");
  idField.value = "";
  const nameField = document.getElementById("productName");
  nameField.value = "";
  const priceField = document.getElementById("productPrice");
  priceField.value = "";
  const quantityField = document.getElementById("productQuantity");
  quantityField.value = "";
};

const updateProduct = (index) => {
  const id = document.querySelector("input[name='productId']").value;
  const name = document.querySelector("input[name='productName']").value;
  const price = document.querySelector("input[name='productPrice']").value;
  const quantity = document.querySelector(
    "input[name='productQuantity']",
  ).value;

  products = products.map((product, idx) => {
    if (idx === index) {
      return { id, name, price, quantity };
    } else {
      return product;
    }
  });

  const saveButton = document.getElementById("addProduct");
  saveButton.value = "Add Product";
  saveButton.onclick = () => addProduct();

  displayProducts();
  clearFields();
};

const editProduct = (idx) => {
  const { id, name, price, quantity } = products[idx];
  const idField = document.getElementById("productId");
  idField.value = id;
  const nameField = document.getElementById("productName");
  nameField.value = name;
  const priceField = document.getElementById("productPrice");
  priceField.value = price;
  const quantityField = document.getElementById("productQuantity");
  quantityField.value = quantity;

  const saveButton = document.getElementById("addProduct");
  saveButton.value = "Save Changes";
  saveButton.onclick = () => updateProduct(idx);

  idField.focus();
};

const displayProducts = () => {
  const tableBody = document.getElementById("list");
  tableBody.innerHTML = "";

  products.map((product, idx) => {
    const { id, name, price, quantity } = product;

    const idCol = document.createElement("td");
    idCol.innerHTML = id;

    const nameCol = document.createElement("td");
    nameCol.innerHTML = name;

    const priceCol = document.createElement("td");
    priceCol.innerHTML = price;

    const quantityCol = document.createElement("td");
    quantityCol.innerHTML = quantity;

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.onclick = () => editProduct(idx);
    editButton.innerHTML = '<i class="fa fa-edit"></i>';

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => deleteProduct(idx);
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';

    const div = document.createElement("div");
    div.classList.add("action-container");
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    const td = document.createElement("td");
    td.appendChild(div);

    const row = document.createElement("tr");
    row.appendChild(idCol);
    row.appendChild(nameCol);
    row.appendChild(priceCol);
    row.appendChild(quantityCol);
    row.appendChild(td);

    tableBody.appendChild(row);
  });
};

const addProduct = () => {
  const id = document.querySelector("input[name='productId']").value;
  const name = document.querySelector("input[name='productName']").value;
  const price = document.querySelector("input[name='productPrice']").value;
  const quantity = document.querySelector(
    "input[name='productQuantity']",
  ).value;

  const newProduct = {
    id,
    name,
    price,
    quantity,
  };
  console.log("new product", newProduct);

  products = [...products, newProduct];

  displayProducts();
  clearFields();
};

const deleteProduct = (id) => {
  products.splice(id, 1);
  displayProducts();
};
