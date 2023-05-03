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
            const productContainer = document.querySelector("#list-view-box");
            productContainer.innerHTML = "";

            // Render the sorted products
            products.forEach((product) => {
                const productRow = document.createElement("div");
                productRow.classList.add("row");

                const productImageDiv = document.createElement("div");
                productImageDiv.classList.add(
                    "col-sm-6",
                    "col-md-6",
                    "col-lg-4",
                    "col-xl-4"
                );

                const productDetailsDiv = document.createElement("div");
                productDetailsDiv.classList.add(
                    "col-sm-6",
                    "col-md-6",
                    "col-lg-8",
                    "col-xl-8"
                );

                productImageDiv.innerHTML = `
          <div class="products-single fix">
            <div class="box-img-hover">
              <div class="type-lb">
                <p class="new">New</p>
              </div>
              <img src="${product.image}" class="img-fluid" alt="Image">
              <div class="mask-icon">
                <ul>
                  <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        `;

                productDetailsDiv.innerHTML = `
          <div class="why-text full-width">
            <h4>${product.name}</h4>
            <h5>$ ${product.price.toFixed(2)}</h5>
            <p>${product.description}</p>
            <a class="btn hvr-hover" href="#">Add to Cart</a>
          </div>
        `;

                productRow.appendChild(productImageDiv);
                productRow.appendChild(productDetailsDiv);
                productContainer.appendChild(productRow);
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
