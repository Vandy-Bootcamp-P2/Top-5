var urlParam = window.location.href.split('/').pop();

$(document).ready(() => {
    $.get("/api/leaderboardRoutes/" + urlParam, postData => {
       outputLeaderboardCategory(postData, $(".leaderboardCategoryContainer"))
    })
})

function outputLeaderboardCategory(results, container) {
    container.html("");

    results.forEach(result => {
        if (result.title != "")
        var html = createLeaderboardCategory(result);
        container.append(html);
    })

    if (results.length == 0) {
        container.append("<span class='noPostsYet'>No posts yet</span>")
    }
}