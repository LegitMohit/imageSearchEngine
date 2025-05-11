const accessKey = '_kDqmnNb-Lv6o5tAqCFhMhrPrMtMEoFA2nOScZAe6PQ';
const searchForm = document.querySelector('#search-form');
const searchBox = document.querySelector('#search-box');
const searchResults = document.querySelector('.search-results');
const showMoreBtn = document.querySelector('#show-more-btn');

let keyword = '';
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
    if(page===1){
        searchResults.innerHTML=""
    }
    const results = data.results;
    results.map((result)=>{
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        //imageLink.href = result.links.html;
        //imageLink.href = "";
        imageLink.target = '_blank';
        imageLink.appendChild(image);
        searchResults.appendChild(imageLink);
    })
    showMoreBtn.style.display = 'block';     
    // console.log(results);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener('click',()=>{
    page++;
    searchImages();
})
