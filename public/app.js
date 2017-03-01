// Fill the articles list with json from mongoDB
$.getJSON('/articles', function(data) {
    for (var i = 0; i < data.length; i++) {
        var articleHtml = "<a class='list-group-item article' data-id='" + data[i]._id + "'>" +
            "<h4 class='list-group-item-heading'>" + data[i].title + "</h4>" +
            "<p class='list-group-item-text'>" + data[i].content + "</p></a>";

        $('#articles-list').append(articleHtml);
    }
});

// Click handler for choosing an article
$(document).on('click', '.article', function() {
    $('#chosen-article').empty();

    var id = $(this).data('id');

    $.ajax({
        method: 'GET',
        url: '/articles/' + id
    }).done(function(data) {
        console.log(data)
        $('#chosen-article').append("<h2>" + data.title + "</h2>");
        $('#chosen-article').append("<textarea id='body-input' name='body'></textarea>");
        $('#chosen-article').append("<button class='btn btn-submit' data-id='" + data._id + "' id='new-comment'>Save Comment</button>");
    })
});

// Click handler for adding a new comment
$(document).on('click', '#new-comment', function() {
    var id = $(this).data('id');

    $.ajax({
        method: 'POST',
        url: '/articles/' + id,
        data: {
            body: $('#body-input').val()
        }
    }).done(function(data) {
        console.log(data);
    });
});