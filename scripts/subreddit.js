var subreddit_name = getUrlVars()["subreddit"]

window.onload = function () {
  $("#spinner").hide();
  setSubreddit(subreddit_name);
};

function setSubreddit(subreddit){
    document.getElementById("column_title").innerHTML = subreddit_name;
    document.getElementById("header_title").innerHTML = subreddit_name;
    addPosts(subreddit);
}

function addPosts(subreddit){
    $.get("https://www.reddit.com/r/" + subreddit + "/hot.json").then(function(back, status){
      var hot_submissions_in_subreddit = back.data.children;
      var submissions_title_list = document.getElementById("submission_title_list");

      for (var i = 0; i < hot_submissions_in_subreddit.length; i++){
        if (!("crosspost_parent" in hot_submissions_in_subreddit[i].data)){ // does not show crossposts
          submissions_title_list.innerHTML += '<li class="animate-channel-item left-rail-item-hover" onclick="getSubmission(\'' + hot_submissions_in_subreddit[i].data.id +'\', \'' + subreddit + '\', true)" id="' + hot_submissions_in_subreddit[i].data.id + '"><a class="channel-anchor"><div class="name-channel-type"><span class="truncate" dir="auto">' + hot_submissions_in_subreddit[i].data.title + '</span></div></a></li>';
        }
      }
    })
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}
