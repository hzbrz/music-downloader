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
            q: q,
            type: 'video',
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
        '<h5><a href="https://www.youtube.com/watch?v='+videoId+'" onclick="getLinks(event)">'+title+'</a></h5>' +
        '<small>By <span class="cTitle" style="color: rgba(171,21,0,0.98);">'+channelTitle+'' +
        '</span> on '+videoDate+'</small>' +
        '</div>' +
        '</li>' +
        '';

    return output;
}

function getLinks(event) {
    event.preventDefault();
    var link = $(event.target).attr("href");
    var list_link = '<li style="list-style: none; display: inline; padding-right: 10px;">' +
            '<iframe style="width:230px;height:60px;border:0;overflow:hidden;" scrolling="no" src="//www.youtubeinmp3.com/widget/button/?video='+link+'"&color=96c864></iframe>' +
            '</li>' +
            '';
    // if ($('#selected li').size() > 3) {
    //     $('#selected').empty();
    //     $('#selected').append(list_link);
    // }else {
    // }
    $('#selected').append(list_link);
}
