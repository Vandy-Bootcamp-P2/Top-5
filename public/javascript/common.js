// enable submit button when use enters text
$(".list-group").keyup(() => {
    var postFieldAny = $(event.target);
    var value = postFieldAny.val().trim();

    var submitButton = $("#submitPostButton");
    if (value == "") {
        submitButton.prop("disabled", true);
        return;
    }
    submitButton.prop('disabled', false);
});

// send text in textfields to postRoutes when user clicks submit
$("#submitPostButton").click((event) => {
    var button = $(event.target);

    var postFieldAny = getPostFieldAny();
    var postCategory = $("#postCategory")
    var postCaption = $("#postCaption");
    var postField1 = $("#postField1")
    var postField2 = $("#postField2")
    var postField3 = $("#postField3")
    var postField4 = $("#postField4")
    var postField5 = $("#postField5")

    var data = {
        title: postCategory.val(),
        caption: postCaption.val(),
        field1: postField1.val(),
        field2: postField2.val(),
        field3: postField3.val(),
        field4: postField4.val(),
        field5: postField5.val(),
        fieldAny: postFieldAny
    }

    $.post("/api/postRoutes", data, postData => {
        var html = createPostHtml(postData);
        $(".postsContainer").prepend(html);
        postCategory.val("");
        postCaption.val("");
        postField1.val("");
        postField2.val("");
        postField3.val("");
        postField4.val("");
        postField5.val("");
        button.prop("disabled", true);
    })
})

function getPostFieldAny(event) {
    $(".list-group").keyup(() => {
        var postFieldAny = $(event.target);
        var value = postFieldAny.val().trim();
        return value;
    })
};

function createPostHtml(postData) {
     
    return `
    <div class="postFormContainer">
    <div class="textareaContainer">
        <div class="card">
            <div class="card-body">
                <p rows="1">${postData.title}</p>
            </div>
            <div class="d-flex justify-content-around">
                <img src=${userLoggedIn.profilePic} alt="Profile Picture">
                <p> @${userLoggedIn.username}</p>
            </div>
            <div class="card-body">
                <p id="postCaption" rows="1">${postData.caption}</p>
                <div class="md-form">
                    <p id="postField1" rows="1">1: ${postData.field1}</p>
                    <p id="postField2" rows="1">2: ${postData.field2}</p>
                    <p id="postField3" rows="1">3: ${postData.field3}</p>
                    <p id="postField4" rows="1">4: ${postData.field4}</p>
                    <p id="postField5" rows="1">5: ${postData.field5}</p>
                </div>
            </div>
            <div class="card-footer">
                <a class="card-link" href="https://www.youtube.com/watch?v=PjLw1E7tTuc" target="_blank">Link To Video</a>
            </div>
        </div>
    </div>
</div>

`
}

function createLeaderboard(postData) {

    return ` 
                <a href="http://localhost:3001/leaderboard/${postData.title}">${postData.title}</a>
                <br>
            
    `   
}

function createLeaderboardCategory(postData) {

    return ` 
                <p>${postData.title}</p>
                <br>
            
    `   
}