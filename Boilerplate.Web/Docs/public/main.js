$(function () {

    hljs.configure({
        languages: ['html', 'css']
    })
    hljs.initHighlighting();

    hljs.initHighlightingOnLoad();

    var ref = $('.kss-menu').find('.kss-menu-list').data('kss-ref');
    $('.kss-menu').find('a').eq(ref).addClass('selected');
});

$('#kss-menu-link').click(function() {
    $(this).toggleClass('active');
    $("#kss-node").toggleClass('kss-active');
});
