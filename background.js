chrome.browserAction.onClicked.addListener(activeTab => {
  chrome.storage.sync.get({ favoriteAnimal: "dog" }, result => {
    let request = {
      dog: { url: "https://random.dog/woof.json", key: "url" },
      cat: { url: "https://aws.random.cat/meow", key: "file" },
      goat: { url: "http://placegoat.com/800/600", key: null }
    };
    let choice = result.favoriteAnimal;

    let animal;

    if (choice === "any") {
      let animals = Object.keys(request);
      let random = animals[(animals.length * Math.random()) << 0];
      animal = request[random];
    } else {
      animal = request[choice];
    }

    if (animal["key"] == null) {
      chrome.tabs.create({ url: animal["url"] });
    } else {
      fetch(animal["url"])
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          chrome.tabs.create({ url: data[animal["key"]] });
        });
    }
  });
});
