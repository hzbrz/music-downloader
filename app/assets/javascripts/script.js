function search() {
    // clear results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form input
    var q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            maxResults: 50,
            q: q,
            type: 'video',
            videoCategoryId: '10',
            videoDuration: 'medium',
            key: 'AIzaSyA5C0v6bbZJUlDDycVhkpOlP20IqwjlNEs'},
            function (data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function (i, item) {
                    // Get the output
                    var output = getOutput(item);

                    // Display reults
                    $('#results').append(output);

                });

            }
    );
}

// Build Output
function  getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = new Date(item.snippet.publishedAt).toISOString().slice(0, 10);;

    // Build output string
    var output = '<li style="list-style: none; border-bottom: 2px dashed;">' +
        '<div class="list-right" style="padding-bottom: 20px;">' +
        '<h5><a <a href="//www.youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v='+videoId+'" style="text-decoration:none;color:#1B94D6;">'+title+'</a></h5>' +
        '<small>By <span class="cTitle" style="color: rgba(171,21,0,0.98);">'+channelTitle+'' +
        '</span> on '+videoDate+'</small>' +
        '</div>' +
        '</li>' +
        '';

    return output;
}