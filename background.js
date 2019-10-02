chrome.browserAction.onClicked.addListener(activeTab => {
  chrome.storage.sync.get({ favoriteAnimal: "dog" }, result => {
    let request = {
      dog: { url: "https://random.dog/woof.json", key: "url" },
      cat: { url: "https://aws.random.cat/meow", key: "file" }
    };
    let choice = result.favoriteAnimal;

    let url, key;
    if (choice === "any") {
      let animals = Object.keys(request);
      let random = animals[(animals.length * Math.random()) << 0];
      url = request[random]["url"];
      key = request[random]["key"];
    } else {
      url = request[choice]["url"];
      key = request[choice]["key"];
    }

    fetch(url)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        chrome.tabs.create({ url: data[key] });
      });
  });
});
