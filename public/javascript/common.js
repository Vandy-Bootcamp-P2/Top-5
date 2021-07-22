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

//function for clicking the like button, and getting the dynamic response
$(document).on("click", ".likeButton", (event) => {
    var button = $(event.target);
    var postId = getPostIdFromElement(button);
    
    if(postId === undefined) return;

    $.ajax({
        url: `/api/postRoutes/${postId}/likes`,
        type: "PUT",
        success: (postData) => {
            console.log(postData)
        }
    })
})

//post id function to get to the root element
function getPostIdFromElement(element) {
    var isRoot = element.hasClass("post")
    //stating the root element will be set based on the isRoot condition...like the if else statement
    //.closest a jquery method 
    var rootElement = isRoot ? element : element.closest(".post");
    //connects this to the card with the data-id
    var postId = rootElement.data().id

    if(postId === undefined)
    return alert(" Post id undefined ");

    return postId;
}


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
    return `<div class="card" style="width: 18rem;">
    <img src="${postData.postCaption}" class="card-img-top" alt="...">
    <div class="card-body" data-id="${postData_id}">
      <h5 class="card-title">${postData.postCategory}</h5>
        <p class="card-text">${postData.postField1}</p>
        <p class="card-text">${postData.postField2}</p>
        <p class="card-text">${postData.postField3}</p>
        <p class="card-text">${postData.postField4}</p>
        <p class="card-text">${postData.postField5}</p>
        <button class="click" id=".likeButton">
    </div>
  </div>`
}