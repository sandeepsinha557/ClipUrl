require('dotenv').config(); 

const express = require("express");
const { connectToMongoDB } = require('./connect')
const path = require('path')
const URL = require('./models/url');
const cookieParser = require('cookie-parser')
const { checkForAuthentication , restrictTo} = require('./middlewares/auth')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRoute')
const userRoute = require('./routes/user')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve('./public')));

const MONGO_URL = process.env.MONGO_URL;

connectToMongoDB(MONGO_URL)
.then (()=> console.log("MongoDB connected"))

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false})) //for form data
app.use(cookieParser())
app.use(checkForAuthentication)

app.use("/url" , urlRoute)
app.use("/" , staticRoute)
app.use("/user", userRoute)

// Server Side Rendering -> 
// Write html on server side -> complicated
// For ease we use EJS
app.get('/test' , async(req , res)=>{
  const allUrls = await URL.find({});
  
  return res.render('home',{
    urls: allUrls,
  })
})

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId : shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL); 
 });

app.listen(PORT , ()=> console.log(`Server started at port : ${PORT}`))