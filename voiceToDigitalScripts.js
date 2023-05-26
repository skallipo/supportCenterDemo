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
(function () {
  let pagePath = window.location.pathname;

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const policyType = urlParams.get("policyType");
  const serviceType = urlParams.get("serviceType");
  /*let obj = {};
      obj.messaging = {};
      obj.messaging.customAttributes = {};
      obj.messaging.customAttributes.name = urlParams.get('name');
      obj.messaging.customAttributes.policyType = urlParams.get('policyType');
      obj.messaging.customAttributes.serviceType = urlParams.get('serviceType');
      console.log(obj);
      sendCommand("Database.set", obj);*/
  Genesys("subscribe", "Messenger.ready", function () {
    Genesys("command", "Messenger.open");
  });
  Genesys("subscribe", "Journey.ready", function () {
    console.log("**Journey.ready.");
    identify();
  });
  Genesys("subscribe", "MessagingService.ready", function () {
    console.log("**MessagingService.ready");
    Genesys(
      "command",
      "MessagingService.startConversation",
      {},
      function () {
        console.log("**Conversation Started");
        /*Genesys("command", "MessagingService.sendMessage", {message: policyType + " " + serviceType});*/
        /*fulfilled callback*/
      },
      function () {
        console.log("**Conversation failed to start");
        /*rejected callback*/
      }
    );
  });

  Genesys("subscribe", "MessagingService.started", function ({ data }) {
    console.log("**MessagingService.started");
  });

  Genesys("subscribe", "Conversations.ready", function () {
    console.log("**Conversation.ready");
  });
  Genesys("subscribe", "Conversations.opened", function () {
    console.log("**Conversations.opened");
    Genesys("command", "MessagingService.sendMessage", {
      message: policyType + " " + serviceType,
    });
  });
})();

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
