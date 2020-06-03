const serverless = require('serverless-http')
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
// app.use('/.netlify/functions/api');

app.listen(3000, () => {
    console.log("The server started on port 3000 !!!!!!");
});

app.get("/.netlify/functions/api", (req, res) => {
    res.send(
        "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
    );
});

app.post("/.netlify/functions/api/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
        console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
        res.send(info);
    });
});

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: details.email,
            pass: details.password
        }
    });

    let mailOptions = {
        from: 'anil94sahu@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: `Re: ${user.question}`, // Subject line
        html: `
          <p><strong>Hare Krishna ${user.name} pr</strong></p>
            <br>
            <p>
                Thank you for asking question.
            </p>
            <p>
                Below is the answer of your question
            </p>
            <br>
            <p>
                <b>Question :</b> ${user.question}
            </p>
            <p>
                <b>Answer : </b> ${user.answer}
            </p>
            <p>
                <b>Link for audio : </b> ${user.recordAnswer}
            </p>
            <p>
                <b>Link for Attachment : </b> ${user.recordAnswer}
            </p>

            <br>
            <p>
                <b>
                    Your Servant  
                </b>
            </p>
            <p>
                <strong>
                    Pune voice team
                </strong>
          </p>
          `
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

// main().catch(console.error);
module.exports.handler = serverless(app)