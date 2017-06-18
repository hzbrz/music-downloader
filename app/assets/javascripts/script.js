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

var title;
// Build Output
function  getOutput(item) {
    var videoId = item.id.videoId;
    title = item.snippet.title;
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

var links = [];
function getLinks(event) {
    event.preventDefault();
    var link = $(event.target).attr("href");
    var src = "//www.youtubeinmp3.com/fetch/?video=" + link;
    links.push(src)
    var list_link = '<li class="link-btn" style="list-style: none; display: inline; padding-right: 10px;">' +
        '<iframe style="width:230px;height:60px;border:0;overflow:hidden;" scrolling="no" src="//www.youtubeinmp3.com/widget/button/?video='+link+'"&color=96c864></iframe>' +
        '</li>' +
        '';
    // links.push(list_link);
    // if ($('#selected li').size() > 3) {
    //     $('#selected').empty();
    //     $('#selected').append(list_link);
    // }else {
    // }
    $('#selected').append(list_link);
}

function downloadAll(urls) {
    var link = document.createElement('a');

    link.setAttribute('download', title);
    link.style.display = 'none';

    document.body.appendChild(link);

    for (var i = 0; i < urls.length; i++) {
        link.setAttribute('href', urls[i]);
        console.log(link)
        link.click();
    }

    document.body.removeChild(link);
}
