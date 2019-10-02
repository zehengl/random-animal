const save_options = () => {
  let animal = document.getElementById("animal").value;

  chrome.storage.sync.set({ favoriteAnimal: animal }, () => {
    let status = document.getElementById("status");
    status.textContent = "Options saved.";
    status.classList.add("alert");
    status.classList.add("alert-success");
    setTimeout(() => {
      status.textContent = "";
      status.classList.remove("alert-success");
      status.classList.remove("alert");
    }, 750);
  });
};

const restore_options = () => {
  chrome.storage.sync.get({ favoriteAnimal: "dog" }, result => {
    document.getElementById("animal").value = result.favoriteAnimal;
  });
};

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
