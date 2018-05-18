$(function() {
    if (isBlogPath())
    {
        $('#nav-blog').addClass('active');
    };

    function isBlogPath() {
        var pathname = window.location.pathname;
        var regex = /^\/blog.*/gi;
        if (regex.test(pathname)) {
            return true;
        } else {
            return false;
        }
    };

    $('.random-post').ready(function() {
        getRandomPost();
    });

    function getRandomPost() {
        var jsonUrl = _getHost() + '/blogposts.json';
        $.getJSON({
            url: jsonUrl,
            success: _onBlogJsonSuccess
        });
    };

    function _onBlogJsonSuccess(data) {
        var randInt = _getRandomInt(0, data.length - 1);
        var post = data[randInt];
        $('#random-post-title').html(post.title);
        $('#random-post-date').html(post.date);
        _getBlogContent(post.url);

        // maybe spin through post titles before proceeding

        // also maybe a button to kick it off manually
    };

    function _getBlogContent(url) {
        $.get(url, function(data) {
            var _html = $(data);
            $('#random-post-content').html(_html.find('.post-content').html());
        });
    }

    function _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function _getHost() {
        return window.location.protocol + '//' + window.location.host;
    }
});