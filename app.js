const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// Connection string/URI goes here

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = new mongoose.model("Post", postSchema);

const atlantis = new Post({
  title: "Atlantis",
  content: "The loneliest, loveliest place on Earth, or so we believe. We have been diligently searching for it for many years. If you have any information, let us know! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu felis bibendum ut. Dui ut ornare lectus sit amet est placerat. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Sit amet consectetur adipiscing elit pellentesque. Auctor augue mauris augue neque gravida in fermentum et. Proin sed libero enim sed faucibus turpis. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Vel risus commodo viverra maecenas. Aenean pharetra magna ac placerat vestibulum. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Amet porttitor eget dolor morbi non arcu risus. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Auctor eu augue ut lectus arcu bibendum at. Massa placerat duis ultricies lacus sed. Augue mauris augue neque gravida in fermentum et sollicitudin."
});

const clue = new Post({
  title: "A clue?",
  content: "Recently, someone found a bottle with a note inside. The message was written in an ancient language...Could it be an SOS from a resident of Atlantis? If you have experience translating ancient languages, please contact us! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At urna condimentum mattis pellentesque id nibh. Pharetra magna ac placerat vestibulum lectus mauris. Ornare suspendisse sed nisi lacus sed viverra tellus. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Suspendisse ultrices gravida dictum fusce ut. Vehicula ipsum a arcu cursus vitae. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Tristique senectus et netus et. Tortor vitae purus faucibus ornare suspendisse sed. Arcu vitae elementum curabitur vitae nunc. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Nunc scelerisque viverra mauris in aliquam sem. Elementum eu facilisis sed odio morbi quis commodo odio aenean. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Sit amet purus gravida quis blandit turpis."
});

const searchingForTeamMembers = new Post({
  title: "Interested in joining the team?",
  content: "We are currently searching for more scholars/explorers to join our team in the search for Atlantis. If you are interested, please contact us so we can arrange an interview. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Laoreet sit amet cursus sit amet dictum sit. Malesuada bibendum arcu vitae elementum curabitur. Sagittis eu volutpat odio facilisis mauris. Urna et pharetra pharetra massa massa ultricies mi. Id neque aliquam vestibulum morbi blandit cursus risus. Tortor at risus viverra adipiscing. Quis hendrerit dolor magna eget. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque. Id leo in vitae turpis. Aliquam ultrices sagittis orci a scelerisque purus. Maecenas volutpat blandit aliquam etiam erat. Purus non enim praesent elementum. Auctor eu augue ut lectus arcu bibendum at."
});

const defaultPosts = [atlantis, clue, searchingForTeamMembers];

// Post.insertMany(defaultPosts, function(err) {
//   if(err){
//     console.log(err);
//   }
//   else {
//     console.log("Default posts inserted successfully.");
//   }
// });

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    if(!err){
      res.render("index", {posts: posts});
    }
    else {
      console.log(err);
    }
  });
});

app.get("/posts/:id", function(req,res){
  const postID = req.params.id;

  Post.findOne({_id: postID}, function(err, post){
    if(!err){
      res.render("post", {post: post});
    }
    else {
      console.log(err);
    }
  });
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
  console.log("Serving is running");
});
