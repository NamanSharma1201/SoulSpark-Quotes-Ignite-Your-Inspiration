const qouteContainer = document.getElementById('quote-container');
const qouteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
//show loading
function loading(){
    loader.hidden = false;
    qouteContainer.hidden = true;
}

//hide loading
function complete(){
    qouteContainer.hidden = false;
    loader.hidden = true;
}


//show new Quotes
function newQuote(){
    //pick random quote 
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length > 60){
        qouteText.classList.add('long-quote');
    }else{
        qouteText.classList.remove('long-quote');    
    }
    qouteText.textContent = quote.text;
    complete();
}


 

// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        //catch here
    }
    
}  
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listerner
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);
//on load
getQuotes();
// loading();