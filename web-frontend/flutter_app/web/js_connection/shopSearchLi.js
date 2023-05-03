function renderListProduct(product) {
    const productRow = document.createElement("div");
    productRow.classList.add("list-view-box", "row");

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

    return productRow;
}

function fetchAndRenderProductsSearch(query) {
    fetch(`http://localhost:3000/api/v1/products/search?q=${query}`)
        .then((response) => response.json())
        .then((products) => {
            // Clear the previous products
            const productRow = document.querySelector("#list-view-box");
            productRow.innerHTML = "";

            // Render the sorted products
            products.forEach((product) => {
                const productElement = renderListProduct(product);
                productRow.appendChild(productElement);
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
