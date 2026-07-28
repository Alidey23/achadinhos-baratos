const categoryButtons = document.querySelectorAll(".category-btn");
const products = document.querySelectorAll(".product-card");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    products.forEach((product) => {
      const productCategory = product.dataset.category;

      if (category === "all" || productCategory === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});
