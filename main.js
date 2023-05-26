document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const foodList = document.getElementById("foodList");
  const groceryList = document.getElementById("groceryList");
  const electronicList = document.getElementById("electronicList");
  const skincareList = document.getElementById("skincareList");

  // Function to display product information
  const displayProduct = (product) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.id = `product-${product.id}`;
    listItem.innerHTML = `<strong>Name:</strong> ${product.name}<br><strong>Price:</strong> Rs ${product.amount}<br>`;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-primary btn-sm float-right ml-2";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", async () => {
      try {
        await deleteProduct(product.id);
        listItem.remove();
      } catch (error) {
        console.error(error);
      }
    });
    listItem.appendChild(deleteButton);

    // Add the product to the respective category list
    switch (product.category) {
      case "food":
        foodList.appendChild(listItem);
        break;
      case "grocery":
        groceryList.appendChild(listItem);
        break;
      case "electronics":
        electronicList.appendChild(listItem);
        break;
      case "skincare":
        skincareList.appendChild(listItem);
        break;
      default:
        productList.appendChild(listItem);
    }
  };

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/delete-product/${productId}`);
    } catch (error) {
      throw new Error(error);
    }
  };

  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productCategory = document.getElementById("productCategory").value;

    const productData = {
      name: productName,
      amount: productPrice,
      category: productCategory,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/add-product",
        productData
      );
      const product = response.data;
      displayProduct(product);
      productForm.reset();
    } catch (error) {
      console.error(error);
    }
  });

  // Fetch and display existing products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      const products = response.data;
      products.forEach((product) => {
        displayProduct(product);
      });
    } catch (error) {
      console.error(error);
    }
  };

  fetchProducts();
});
