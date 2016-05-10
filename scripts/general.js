/**
 * Created by Olezhka on 08.05.2016.
 */
$(document).ready(function(){
    $(function () {
        $('nav a').on('click', function (e) {
            e.preventDefault();
            var page = $(this).attr('href');
            $(this).parent().siblings().children().removeClass('selected');
            $(this).addClass('selected');
            (function (pageToLoad) {
                $('#main-content').load(pageToLoad, function () {
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
});