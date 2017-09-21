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
        // '<a href="//www.youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v='+videoId+'">'+title+'</a>' +
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
    var src = "//www.convertmp3.io/fetch/?video="+link;
    links.push(src)
    var list_link = '<li class="link-btn" style="list-style: none; display: inline; padding-right: 10px;">' +
        '<iframe style="width:180px;height:50px;border:0;overflow:hidden;" scrolling="no"' +
        'src="//www.convertmp3.io/widget/button/?video='+link+'"&color=96c864></iframe>' +
        // '<span id="close" onclick="this.parentNode.parentNode.removeChild(this.parentNode); return false;" style="color: #B00100">x</span>' +
        '</li>' +
        '';
    // links.push(list_link);
    var download_msg = '(download all selected links' +
            '<small> *some links might be broken*)</small>' +
            '';

    $('#selected').append(list_link);
    if ($('#selected li').size() > 3) {
        $('#dl-btn').show();
    }

    // if ($('#selected li').size() > 3) {
    //     $('#clear-btn').show();
    //     $('#clear-btn').on('click', function () {
    //         $('#selected').empty();
    //     });
    // }

    if ($('#selected li').size() === 4) {
        $('#dl-msg').append(download_msg);
    }
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
