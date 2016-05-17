/**
 * Created by Olezhka on 08.05.2016.
 */
$(function () {
    $('nav a').on('click', function (e) {
        e.preventDefault();
        var page = $(this).attr('href');
        $(this).parent().siblings().children().removeClass('selected');
        $(this).addClass('selected');
        (function (pageToLoad) {
            $('#main-content').load(pageToLoad, function () {
                $('#table-body').empty();
                after(pageToLoad);
            });
        })(page);

    });
});
function after(page) {
    if(page == 'users.html'){
        fillTable();
    }
}

$(document).on('mouseenter', 'table#main-table tr', function(){
    $(this).find('button').show();
}).on('mouseleave', 'table#main-table tr', function(){
    $(this).find('button').hide();
});
