//like button function
async function likeClickHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/posts/likes', {
        method: 'PUT',
        boy: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.like-btn').addEventListener('click', likeClickHandler);