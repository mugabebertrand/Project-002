const accessKey = "YoTwK8RRXJnO9kbz6pwYH6jOHQtdltnz";

const searchForm = document.getElementById("search-form");
const searBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn"); 

let keyword = "";
let offset = 0; 

async function searchGiphy() {
  keyword = searBox.value; 
  const limit = 25; 
  const rating = "g"; 
  const lang = "en"; 
  const bundle = "messaging_non_clips"; 

  const url = `https://api.giphy.com/v1/stickers/search?api_key=${accessKey}&q=${keyword}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}&bundle=${bundle}`;

  const response = await fetch(url);
  const data = await response.json();

  
  if (offset === 0) {
    searchResult.innerHTML = "";
  }

  
  const results = data.data;

  
  if (results && results.length > 0) {
    results.map((result) => {
      const gif = document.createElement("img");
      
      gif.src = result.images.fixed_height.url; 
      gif.alt = result.title; 

      const gifLink = document.createElement("a");
      gifLink.href = result.url; 
      gifLink.target = "_blank"; 

      gifLink.appendChild(gif);
      searchResult.appendChild(gifLink);
    });

   
    if (results.length === limit) {
      showMoreBtn.style.display = "block";
    } else {
      showMoreBtn.style.display = "none"; 
    }
  } else {
    
    if (offset === 0) { 
      searchResult.innerHTML = "No stickers found for your search. Try a different keyword!";
    }
    showMoreBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); 
  offset = 0; 
  searchGiphy(); 
});

showMoreBtn.addEventListener("click", () => {
  offset += 25; 
  searchGiphy(); 
});




