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
    };
});