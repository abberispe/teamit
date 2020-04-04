var selected_subreddit = "";
var subreddits_in_row = 3; // For making the formatting of 
var row = 1;               // teams prettier

window.onload = function () {
    var user_teams = JSON.parse(localStorage.getItem("user_teams"));
    if (user_teams == null){
        localStorage.setItem("user_teams", JSON.stringify([]));
        user_teams = [];
    }
    user_teams.forEach(function(team){
        addSubredditHTML(team);
    });
};

function toSubreddit(subreddit){ // Using url-queries to navigate subreddits.
    selected_subreddit = subreddit;
    window.location.assign("subreddit.html?subreddit=" + subreddit);
}

function addSubreddit(){ // Adding a subreddit as a team
    var new_subreddit = prompt("Enter a subreddit name:")
    $.get("https://www.reddit.com/r/" + new_subreddit + "/about.json").then(function(back, status){
      var display_name = back.data.display_name;
      var user_teams = JSON.parse(localStorage.getItem("user_teams"));
      console.log(user_teams)
      user_teams.push(new_subreddit);
      localStorage.setItem("user_teams", JSON.stringify(user_teams));
      addSubredditHTML(display_name);
     }).fail(function(back){
         alert("Could not find subreddit")
    })
}

function addSubredditHTML(display_name){ // Adding the new subreddit to HTML.
    if (subreddits_in_row == 5){
        subreddits_in_row = 1;
        row += 1;
        document.getElementById("row_container").innerHTML += `<div class="stv-grid-row vs-repeat-repeated-element" style="height: 240px;" id="row_${row.toString()}"></div>`
    } else {
        subreddits_in_row += 1;
    }
    var subreddits_container = document.getElementById("row_" + row.toString());
    subreddits_container.innerHTML += `
    <div onclick="toSubreddit('${display_name}')" class="stv-item-container" style="height: 240px; min-width: 251px; max-width: 363px;">
        <div class="stv-item-inner-container" role="gridcell">
        <ng-include src="&#39;components/school-app/teams-grid/teams-grid-team-card.html&#39;">
            <div class="team-card" role="button">
            <div aria-hidden="true">
                <div class="profile-picture-container">
                <profile-picture class="profile-picture-style" >
                    <img class="team-icon" src="./styles/teamicon3" style="object-fit: cover;">
                </profile-picture>
                </div>
                <div class="team-name">
                <h1 class="team-name-text">${display_name}</h1>
                </div>
            </div>
            </div>
        </ng-include>
        </div>
    </div>`
}

function removeSubreddit(){
    var removed_subreddit = prompt("Enter a subreddit name to remove:");
    var user_teams = JSON.parse(localStorage.getItem("user_teams"));
    user_teams = user_teams.filter(function(subreddit) { return subreddit !== removed_subreddit }) // Removing the provided subreddit from localstorage
    localStorage.setItem("user_teams", JSON.stringify(user_teams));destroyinternet (on) (nofinalsforarvid)
    location.reload();
}