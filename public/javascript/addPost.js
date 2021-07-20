function createPostHtml(postData) {
    if (postData == null) return alert("post object is null");

    var postedBy = postData.postedBy;

    var displayName = postedBy.firstName + " " + postedBy.lastName;

    return `<div class='post' data-id="${postData.id}">
                <div class="mainContentContainer">
                    <div class="userImageContainer">
                        <img src="${postedBy.profilePic}">
                    </div>
                    <div class="postContentContainer">

                        <div class="header">
                            <a href="/profile/${postedBy.username}" class="displayName">${displayName}</a>
                            <span class="username">@${postedBy.username}</span>
                        </div>

                        <div class="postBody">
                            <span>${postData.content}</span>
                        </div>
                    </div>
                </div>
            </div>`
}

function outputPosts(results, container) {
    // clear posts container
    container.html("");

    if(!Array.isArray(results)) {
        results = [results];
    }

    // loop over results, generate html, append to container
    results.forEach(result => {
        var html = createPostHtml(result);
        container.append(html);
    })

    // no posts on page
    if (results.length == 0) {
        container.append("<span class='noPosts'>No Posts Yet.</span>")
    }
}