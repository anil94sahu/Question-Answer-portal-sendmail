const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 3000;
const details = require("./details.json");

const app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");;
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, PATCH')
        return res.send(200).json({});
    }
    next();
});


app.use(bodyParser.json());
// app.use('/.netlify/functions/api');

app.listen(PORT, () => {
    console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
    res.send(
        "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
    );
});

app.post("/sendmail", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
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
        html: user.body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

// main().catch(console.error);