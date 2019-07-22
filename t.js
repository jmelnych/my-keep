let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("GET", "https://api.jsonbin.io/s/5d35ec98f93f26310c8cc024", true);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader("secret-key", "$2a$10$PJrxIlhfQFRtnEGMNKuFhu9VpH4x.372coJM4hHelbUC5K2tiipVC");

req.send();
