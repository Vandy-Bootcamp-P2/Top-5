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
    //creating the top 5 list and inserting it into the html
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
//function for clicking the like button, and getting the dynamic response
// document.addEventListener("DOMContentLoaded", function () {
//     fetch(`http://localhost3001`)
//         .then(response => response.json())
//         .then((postData) => {
//             addLikes(postData)
//         })
// })
// function addLikes(postData) {
//     const likesCounter = document.querySelector('.likes')
//     likesCounter.innerText - `${postData.likes} likes`
//     const likeButton = document.querySelector('.likeButton')
//     likeButton.innerText = incrementLikes(postData)
// }
// function incrementLikes(postData) {
//     //new variable for likes set to 0
//     let likes = 0
//     //insert a new end point if we end up taking the post to a new page!!--
//     //also might not be post.id, just plugging in for now till you guys have front end done, some changes may need to happen to line up everything!
//     fetch(`http://localhost3001/${postData.id}`)
//         .then(response => response.json())
//         .then((postData) => {
//             likes = postData.likes
//         })
//     //incrementing the likes for every time someone likes the post 
//     let newLikes = likes + 1
//     fetch(`http://localhost3001/`, {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         },
//         body: JSON.stringify({
//             "likes": newLikes
//         })
//     })
//     let likesText = `${newLikes} likes`
//     return likesText
// }
// $(document).on("click", ".likeButton", (event) => {
//     var button = $(event.target);
//     var postId = getPostIdFromElement(button);
//     if(postId === undefined) return;
//     $.ajax({
//         url: `/api/postRoutes/${postId}/likes`,
//         type: "PUT",
//         success: (postData) => {
//             console.log(postData)
//         }
//     })
// })
//post id function to get to the root element
// function getPostIdFromElement(element) {
//     var isRoot = element.hasClass("post")
//     //stating the root element will be set based on the isRoot condition...like the if else statement
//     //.closest a jquery method 
//     var rootElement = isRoot ? element : element.closest(".post");
//     //connects this to the card with the data-id
//     var postId = rootElement.data().id
//     if(postId === undefined)
//     return alert(" Post id undefined ");
//     return postId;
// }
//function to detect if there in input within the post
function getPostFieldAny(event) {
    $(".list-group").keyup(() => {
        var postFieldAny = $(event.target);
        var value = postFieldAny.val().trim();
        return value;
    })
};
//will print the post to the screen
function createPostHtml(postData) {
    return `
    <div class="postFormContainer full-width">
        <div class="textareaContainer">
            <div class="card">
                <div class="card-body">
                    <p rows="1">${postData.title}</p>
                </div>    
                <div class="d-flex flex-column align-items-center">            
                <p> @${userLoggedIn.username}</p>
                <img src=${"/images/profilePic.png"} alt="Profile Picture", style="width:100px;height:100px;border-radius:50%;">
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
function createLeaderboardCategory(result) {
    
    return ` 
                <p>${result.field1}</p>
                <p>${result.field2}</p>
                <p>${result.field3}</p>
                <p>${result.field4}</p>
                <p>${result.field5}</p>
    `
}