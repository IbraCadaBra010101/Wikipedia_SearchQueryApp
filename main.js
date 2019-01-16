
function handle_submit(e) {
    e.preventDefault();
    const input_value = document.querySelector('.searchForm-input').value;
    const searchQuery = input_value.trim();
    fetchResults(searchQuery)
}

function fetchResults(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    fetch(endpoint)
                   .then(response => response.json())
                   .then(data => {
                       const results = data.query.search;
                       console.log(results);
                       displayResults(results);
                   })
        .catch(()=>console.log('error'))
}

function displayResults(results) {
    // Store a reference to `.searchResults`
    const searchResults = document.querySelector('.searchResults');
    // Remove all child elements
    searchResults.innerHTML = '';
    // Loop over results array
    results.forEach(result => {
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

        searchResults.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
        );
    });
}


const form = document.querySelector('.searchForm');
form.addEventListener('submit', handle_submit);
