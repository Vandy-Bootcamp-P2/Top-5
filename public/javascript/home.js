$(document).ready(() => {
    $.get("/api/postRoutes", postData => {
       outputPosts(postData, $(".postsContainer"))
    })
})

function outputPosts(results, container) {
    container.html("");

    results.forEach(result => {
        var html = createPostHtml(result);
        container.append(html);
    })

    if (results.length == 0) {
        container.append("<span class='noPostsYet'>No posts yet</span>")
    }
}