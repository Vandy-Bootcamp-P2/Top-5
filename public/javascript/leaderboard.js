$(document).ready(() => {
    $.get("/api/postRoutes", postData => {
       outputLeaderboard(postData, $(".leaderboardContainer"))
    })
})

function outputLeaderboard(results, container) {
    container.html("");

    results.forEach(result => {
        if (result.title != "")
        var html = createLeaderboard(result.title);
        container.append(html);
    })

    if (results.length == 0) {
        container.append("<span class='noPostsYet'>No posts yet</span>")
    }
}