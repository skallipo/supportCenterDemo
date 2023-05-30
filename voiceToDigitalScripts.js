(function (g, e, n, es, ys) {
  g["_genesysJs"] = e;
  g[e] =
    g[e] ||
    function () {
      (g[e].q = g[e].q || []).push(arguments);
    };
  g[e].t = 1 * new Date();
  g[e].c = es;
  ys = document.createElement("script");
  ys.async = 1;
  ys.src = n;
  ys.charset = "utf-8";
  document.head.appendChild(ys);
})(
  window,
  "Genesys",
  "https://apps.mypurecloud.com/genesys-bootstrap/genesys.min.js",
  {
    environment: "use1",
    deploymentId: "fe6716f3-bce8-4188-923a-bb733eee9161",
  }
);

Genesys("subscribe", "Messenger.ready", function () {
  Genesys("command", "Messenger.open");
});

attachData();

function attachData() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const messageText = urlParams.get("messageText");

  if (name == null) {
    name = "";
  }
  if (messageText == null) {
    messageText = "";
  }

  let obj = {};
  obj.messaging = {};
  obj.messaging.customAttributes = {};
  obj.messaging.customAttributes.customerName = name;
  obj.messaging.customAttributes.messageText = messageText;
  console.log("**" + toString(obj));

  Genesys("subscribe", "Messenger.opened", function () {
    Genesys("command", "Database.set", obj);
  });
}

function identify() {
  let obj = { eventName: "identify" };
  obj.customAttributes = {};
  obj.customAttributes.CustomerEmail = "skallipocust@gmail.com";
  obj.traitsMapper = [{ fieldName: "CustomerEmail", traitName: "email" }];
  console.log(obj);
  sendCommand("Journey.record", obj);
}

function sendCommand(name, obj) {
  Genesys("command", name, obj);
}
Genesys("subscribe", "Database.updated", function (e) {
  console.log(e.data); // Updated database object
});
