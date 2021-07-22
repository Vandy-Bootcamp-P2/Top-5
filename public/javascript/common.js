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
$("#submitPostButton").click(() => {
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

$("#").click(() => {

})


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
    return `<div>wuut</div>`
}