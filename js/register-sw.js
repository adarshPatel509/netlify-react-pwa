if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../../sw.js", { scope: "/" })
    .then(reg => console.log("Service worker registered", reg))
    .catch(err => console.log("Service worker not registered", err));
} else {
  console.log("Service worker is not supported");
}
