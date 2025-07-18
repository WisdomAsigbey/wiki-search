const URL = `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=`;

const form = document.querySelector(".form");
const formInput = document.querySelector(".form-input");
const resultDOM = document.querySelector(".results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = formInput.value;
  if (!inputValue) {
    resultDOM.innerHTML = `<div class="error">please enter valid search term</div>`;
    return;
  }
  fetchPages(inputValue);
});

const fetchPages = async (searchValue) => {
  resultDOM.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(`${URL}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      resultDOM.innerHTML = `<div class="error">no matching results, please try again</div>`;
      return;
    }
    renderResults(results);
  } catch (error) {
    resultDOM.innerHTML = `<div class="error">there was an error...</div>`;
  }
};

const renderResults = async (list) => {
  const cardList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `
          <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
             ${snippet}
            </p>
          </a>
        `;
    })
    .join("");
  resultDOM.innerHTML = `<div class="articles">
  ${cardList}
</div>`;
};
