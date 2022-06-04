//BISMILLAH
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const Vonage = require("@vonage/server-sdk");
const port = 7000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// HOME ROUTE
app.get("/", (req, res) => {
    res.render("page1", { title: "Send a message!" });
});
// "SENT" ROUTE
app.post("/justSent", (req, res) => {
    const vonage = new Vonage({
        apiKey: "YOUR VONAGE ACCOUNT APIKEY",
        apiSecret: "YOUR VONAGE ACCOUNT APISECRET",
    });
    /////
    const phoneNumber = req.body.number;
    const textMessage = req.body.text;
    /////
    const from = "uzbekDev98";
    const to = phoneNumber;
    const text = textMessage;
    /////
    const sms = vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]["status"] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(
                    `Message failed with error: ${responseData.messages[0]["error-text"]}`
                );
            }
        }
    });
    res.render("justSent", { data: sms, title: "Sent!" });
});
//SERVER
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});