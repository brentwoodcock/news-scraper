// Fill the articles list with json from mongoDB
$.getJSON('/articles', function(data) {
    for (var i = 0; i < data.length; i++) {
        var articleHtml = "<a href='#' class='list-group-item article' data-id='" + data[i]._id + "' data-link='" + data[i].link + "' data-title='" + data[i].title + "' data-content='" + data[i].content + "'>" +
            "<h4 class='list-group-item-heading'>" + data[i].title + "</h4>" +
            "<p class='list-group-item-text'>" + data[i].content + "</p></a>";

        $('#articles-list').append(articleHtml);
    }
});

$(document).on('click', '.article', function() {
    $('#currentArticle').html($(this).data('title') + $(this).data('content') + $(this).data('link'));
})