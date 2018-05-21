$(function() {
    if (isBlogPath())
    {
        $('#nav-blog').addClass('active');
    }

    function isBlogPath() {
        var pathname = window.location.pathname;
        var regex = /^\/blog.*/gi;
        if (regex.test(pathname)) {
            return true;
        } else {
            return false;
        }
    }

    $('.random-post').ready(function() {
        getRandomPost();
    });

    $('#showAnotherRandomPost').on("click", function() {
        getRandomPost();
    });

    function getRandomPost() {
        var jsonUrl = _getHost() + '/blogposts.json';
        $.getJSON({
            url: jsonUrl,
            success: _onBlogJsonSuccess
        });
    }

    function _onBlogJsonSuccess(data) {
        $('#carouselInnerRandomPostTitles').empty();

        var randInt = _getRandomInt(0, data.length - 1);

        var firstDataChunk = data.slice(randInt);
        var lastDataChunk = data.slice(0, randInt);

        var reorderedData = firstDataChunk.concat(lastDataChunk);

        _blogTitleSpinner(reorderedData, randInt);

        var lastPost = reorderedData.pop();

        $('.carousel').carousel({
            interval: 10,
            pause: false,
            wrap: false
        })

        setTimeout(function(){ _getBlogContent(lastPost); }, 35 * data.length);
    }

    function _getTitle(item, index) {
        return item.title;
    }

    function _blogTitleSpinner(data, postNum) {
        var dataLen = data.length - 1;
        var nextPostNum = postNum + 1;

        var titles = data.map(_getTitle);

        $.each(titles, function(index, value) {
            $('#carouselInnerRandomPostTitles').append('<div class="carousel-item custom-carousel-item"><h2 class="random-post-title">' + value + '</h2></div>');
            if (index === 0) {
                $('.carousel-item').addClass('active');
            }
        });
    }

    function _getBlogContent(post) {
        $.get(post.url, function(data) {
            var _html = $(data);
            $('.random-post-date').text('Post Date: ' + post.date);
            $('.random-post-content').html(_html.find('.post-content').html());
        });
    }

    function _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function _getHost() {
        return window.location.protocol + '//' + window.location.host;
    }
});