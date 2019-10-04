if (!("Notification" in window)) {
  console.log("Your browser does not support notification");
} else {
  Notification.requestPermission(status => {
    console.log("Notification permission status:", status);
  });
}

const options = {
  body: "First notification!",
  icon: "./favicon_io/favicon-32x32.png",
  vibrate: [100, 50, 100],
  data: {
    dateOfArrival: Date.now(),
    primaryKey: 1,
  },
};

if (Notification.permission == "granted") {
  navigator.serviceWorker.getRegistration().then(reg => {
    reg.showNotification("Hello world!", options);
  });
}
