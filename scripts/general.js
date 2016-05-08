/**
 * Created by Olezhka on 08.05.2016.
 */
$('li a').click(function()
{
    $('li').removeClass('active-item');
    $(this).parent().addClass('active-item');
});