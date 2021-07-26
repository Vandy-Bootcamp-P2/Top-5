var urlParam = window.location.href.split('/').pop();

$(document).ready(() => {
    $.get("/api/leaderboardRoutes/" + urlParam, postData => {
       outputLeaderboardCategory(postData, $(".leaderboardCategoryContainer"))
    })
})

function outputLeaderboardCategory(results, container) {
    let duplicates = findDuplicates(results);
    let duplicateKeys = getSortedKeys(duplicates)
    let duplicateValues = getSortedValues(duplicates)
    
    
    container.html(`<h1>Top ${urlParam}</h1><br><h4>Element : Points</h4><br>`);

    for (let i=0; i < duplicateKeys.length; i++) {
        var html = duplicateKeys[i] + " : " + duplicateValues[i] + "<br>"
        container.append(html);
    }

    if (results.length == 0) {
        container.append("<span class='noPostsYet'>No posts yet</span>")
    }
}

// insert stack overflow array functions

function findDuplicates(arr) {
const counts = [];
arr.forEach(function (element) { 
    counts[element] = (counts[element] || 0) + 1; 
});

return counts;
}


function getSortedKeys(obj) {
    var keys = Object.keys(obj);
    return keys.sort(function(a,b){return obj[b]-obj[a]}); 
}

function getSortedValues(obj) {
    var values = Object.values(obj);
    return values.sort(function(a,b){return b-a});
}
