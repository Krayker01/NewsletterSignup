// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

// request
app.use(express.static("public"));
const request = require("request");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var clientFirstName = req.body.firstName;
  var clientLastName = req.body.lastName;
  var clientEmail = req.body.clientEmail;


  mailchimp.lists.addListMember("0365d9c6fb", {
    email_address: clientEmail,
    status: "subscribed",
    merge_fields: {
      FNAME: clientFirstName,
      LNAME: clientLastName
    }
  });


res.send("Done!");
});

// MailChimp

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "12478164a4911c4869a1c1a1a5113a1e",
  server: "us9",
});

const event = {
  name: "Newsletter"
};

const footerContactInfo = {
  company: "Vladyslav Yurkevych",
  city: "London",
  country: "UK"
};

const campaignDefaults = {
  from_name: "Gettin' Together",
  from_email: "vlad.yrkevich@gmail.com",
  subject: "General newsletter",
  language: "EN_US"
};

const run = async function() {
  const response = await mailchimp.lists.getList("0365d9c6fb", {
    name: event.name,
    contact: footerContactInfo,
    permission_reminder: "permission_reminder",
    email_type_option: true,
    campaign_defaults: campaignDefaults
  });
  // console.log(response);
  // console.log(
  //   "Successfully created an audience. The audience id is " + response.id + "."
  // );
};

run();

app.listen(port, function(req, res) {
  console.log("Server is running in port " + port);
})



// API key
// 12478164a4911c4869a1c1a1a5113a1e-us9
// List id
// 0365d9c6fb
