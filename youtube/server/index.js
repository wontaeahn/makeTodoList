const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser =require('cookie-parser');
const config = require('./config/key');
const mongoose = require('mongoose')

mongoose.connect(config.mongoURI,
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('몽고DB 연결완료'))
 .catch(err => console.log('err'))

app.get('/', (req, res) => res.send('환영합니다.'))


 //서버에서 정보를 분석해서 가져올수있게 함
app.use(bodyParser.urlencoded({ extended: true}));
//json타입 가져올수 있게 함
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));


app.use('/uploads', express.static('uploads'));        

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

    // Set static folder   
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
  
    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }


const port = 5000

app.listen(port, () => console.log(`on port ${port}!`))