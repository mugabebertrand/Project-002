
const accessKey = "YoTwK8RRXJnO9kbz6pwYH6jOHQtdltnz";


const searchForm = document.getElementById("search-form");
const searBox = document.getElementById("search-box"); 
const searchResult = document.getElementById("search-result"); 
const showMoreBtn = document.getElementById("show-more-btn"); 


let keyword = ""; 
let offset = 0;   
const resultsLimit = 25; 


const rating = "g"; 
const lang = "en";  
const bundle = "messaging_non_clips"; 



async function searchGiphy() {

  keyword = searBox.value;

  const url = `https://api.giphy.com/v1/stickers/search?api_key=${accessKey}&q=${keyword}&limit=${resultsLimit}&offset=${offset}&rating=${rating}&lang=${lang}&bundle=${bundle}`;

  try {
   
    const response = await fetch(url);
    const data = await response.json();
    

    // if (offset === 0) {
    //   searchResult.innerHTML = ""; 
    // }

    const gifs = data.data;

    searchResult.innerHTML = ""; 
    
    if (gifs && gifs.length > 0) {
      
      gifs.forEach((gifData) => {
        const gifElement = document.createElement("img");
      
        gifElement.src = gifData.images.fixed_height.url;
        gifElement.alt = gifData.title; 

        const gifLink = document.createElement("a");
        gifLink.href = gifData.url;
        gifLink.target = "_blank"; 

        gifLink.appendChild(gifElement);
        searchResult.appendChild(gifLink); 
      });

      
      if (gifs.length === resultsLimit) {
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
  } catch (error) {
    console.error("Error fetching Giphy stickers:", error);
    searchResult.innerHTML = "<p>An error occurred while fetching stickers. Please try again.</p>";
    showMoreBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); 
  offset = 0; 
  searchGiphy(); 
});

showMoreBtn.addEventListener("click", () => {
  offset += resultsLimit; 
  searchGiphy(); 
});




