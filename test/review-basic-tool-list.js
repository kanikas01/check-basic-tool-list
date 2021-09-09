const assert = require("assert");

describe("Check tool list", () => {
  it("Open basic tool list links", () => {
    // Go to basic tool list page and check page title
    browser.url("basic-tool-list/");
    const title = browser.getTitle();
    assert.strictEqual(title, "Basic Tool List");
    getBasicToolListItems();

    // Wait for user to close all windows to end session
    browser.waitUntil(() => browser.getWindowHandles().length === 0, {
      timeout: 1000000,
      timeoutMsg: "You're going to have to be faster than that.",
    });
  });
});

// Find all tool links and open them in new tabs
function getBasicToolListItems() {
  const productLinks = $$(
    "//a[@class='amzn-native-product-title'] | //img[starts-with(@class,'fl-photo-img')]//parent::a"
  );
  console.log('Number of product links: ' + productLinks.length);
  for (const link of productLinks) {
    let productUrl = link.getAttribute("href");
    if (productUrl !== "#") {
      browser.execute((url) => {
        window.open(url);
      }, productUrl);
    }
  }
}
