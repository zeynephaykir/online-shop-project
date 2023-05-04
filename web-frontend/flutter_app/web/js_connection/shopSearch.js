function fetchAndRenderProductsSearch(query) {
    fetch(`http://localhost:3000/api/v1/products/search?q=${query}`)
        .then((response) => response.json())
        .then((products) => {
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
                  <a class="cart" onclick="addToCart(${product})">Add to Cart</a>
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

document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const searchInput = document.getElementById("search-input");
    const query = searchInput.value.trim();

    if (query) {
        fetchAndRenderProductsSearch(query);
    }
});
