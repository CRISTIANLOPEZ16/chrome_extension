document.addEventListener('DOMContentLoaded', function() {
    console.log(navigator.clipboard);
    if (navigator.clipboard) {
        navigator.clipboard.readText().then(function(data) {
            console.log("Your string: ", data);
          });
      } else {
        chrome.notifications.create("notification-id", {
            type: "basic",
            title: "Notification Title",
            message: "Notification message",
            iconUrl: "icon.png"
          }, function() {
            console.log("Notification created");
          });
          
      }
  });
  