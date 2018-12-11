var request = require('request');
var authorization = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': authorization
    }
  };

  // var obj = {};
  // return cb(obj);

  request(options, function(err, res, body) {
    let obj = JSON.parse(body);
  // let obj = JSON.stringify(body);
  // obj = JSON.parse(obj);
    cb(err, obj);
  });
}

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors('jquery', 'jquery', function(err, result) {
  for (let url in result) {
    console.log(result[url].avatar_url);
  }
  // console.log("Errors: ", err);
  // console.log("Result: ", result);
});