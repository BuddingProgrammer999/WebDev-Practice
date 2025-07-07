const magnifierElement = document.querySelector(".magnifier");
const searchBarElement = document.querySelector(".search-bar-container");
magnifierElement.addEventListener("click", () => {
    searchBarElement.classList.toggle("active");
});
