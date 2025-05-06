const accessKey = '_kDqmnNb-Lv6o5tAqCFhMhrPrMtMEoFA2nOScZAe6PQ';
const searchForm = document.querySelector('#search-form');
const searchBox = document.querySelector('#search-box');
const searchResults = document.querySelector('.search-results');
const showMoreBtn = document.querySelector('#show-more-btn');

let keyword = '';
let page = 1;

async function searchImages() {
    try {
        keyword = searchBox.value;
        if (!keyword.trim()) {
            throw new Error('Please enter a search term');
        }

        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (page === 1) {
            searchResults.innerHTML = "";
        }

        if (data.results.length === 0) {
            throw new Error('No images found for your search');
        }

        const results = data.results;
        results.map((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';
            imageLink.appendChild(image);
            searchResults.appendChild(imageLink);
        });

        showMoreBtn.style.display = 'block';

    } catch (error) {
        searchResults.innerHTML = `<div class="error-message">${error.message}</div>`;
        showMoreBtn.style.display = 'none';
        console.error('Error:', error);
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
});
