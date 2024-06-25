chrome.action.onClicked.addListener((tab) => {
  const url = "https://www.amazon.co.jp/gp/most-gifted/books/ref=zg_mg_nav_books_0";
  chrome.tabs.create({"url": url });
});
