function fetchAndRenderProducts(sortOption) {
    fetch("http://localhost:3000/api/v1/products")
        .then((response) => response.json())
        .then((products) => {
            // Sorting logic based on the selected option
            switch (sortOption) {
                case "2":
                    products.sort((a, b) => b.price - a.price); // High Price → Low Price
                    break;
                case "3":
                    products.sort((a, b) => a.price - b.price); // Low Price → High Price
                    break;
                case "4":
                    // Best Selling sorting logic, assuming a 'sales' property exists on each product object
                    products.sort((a, b) => b.sales - a.sales);
                    break;
                default:
                    // Default sorting logic (option 1)
                    break;
            }

            // Clear the previous products
            const productRow = document.querySelector("#product-row");
            productRow.innerHTML = "";

            // Render the sorted products
            products.forEach((product) => {
                const productDiv = document.createElement("div");
                productDiv.classList.add(
                    "col-sm-6",
                    "col-md-6",
                    "col-lg-4",
                    "col-xl-4",
                    "products-single",
                    "fix"
                );

                productDiv.innerHTML = `
            <div class="box-img-hover">
              <div class="type-lb">
                <p class="sale">Sale</p>
              </div>
              <img src="${product.image}" class="img-fluid" alt="Image">
              <div class="mask-icon">
                <ul>
                  <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                </ul>
                <a class="cart" href="#">Add to Cart</a>
              </div>
            </div>
            <div class="why-text">
              <h4>${product.name}</h4>
              <h5>$${product.price.toFixed(2)}</h5>
            </div>
          `;

                productRow.appendChild(productDiv);
            });
        });
}

fetchAndRenderProducts("1"); // Call the function with the initial value "1" for the default sorting option

document.addEventListener("change", (event) => {
    if (event.target.id === "basic") {
        console.log("Select option changed");
        fetchAndRenderProducts(event.target.value);
    }
});
