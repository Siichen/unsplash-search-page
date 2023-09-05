// Install access key from unsplash.com
const accessKey = "MQrnWikaSPY6fP1k09GReS7dPpu6oJfHCYwwCRL7boY";

// Store html variables
// Four important things to do, create variables, search input, key, show more
// Import all the elements
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

// Store all the the keywords
let inputData = "#";
let page = 1;
// Complete all the declaration

// Create a function to create a DOM structure for search results
function createSearchResult(result) {
    const searchResult = document.createElement("div");
    searchResult.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    searchResult.appendChild(image);
    searchResult.appendChild(imageLink);

    return searchResult;
}

// Add search results to the search results container
function addSearchResults(results) {
    results.forEach((result) => {
        const searchResult = createSearchResult(result);
        searchResults.appendChild(searchResult);
    });
}

// Create function 
async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    addSearchResults(results);

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

// Create event listener 
formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener('click', () => {
    searchImages();
});
