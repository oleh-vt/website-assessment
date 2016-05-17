
function paginate() {
    var currentPage = 0;
    var recordsPerPage = 10;
    var table = $('#main-table');

    $('div.page-navigation-bar').remove();
    
    var tableRows = $(table).find('tbody tr');
    
    $(table).bind('repaginate', function(){
        $(table).find('tbody tr').hide().slice(currentPage * recordsPerPage, (currentPage+1) * recordsPerPage).show();
    });

    $(table).trigger('repaginate');

    var rowNumber = tableRows.length;
    var pageNumber = Math.ceil(rowNumber/recordsPerPage);
    var pageNavigationBar = document.createElement('div');
    $(pageNavigationBar).addClass('page-navigation-bar');
    for(var i = 0; i < pageNumber; i++){
        var navButton = document.createElement('span');
        $(navButton).addClass('page-navigation-button');
        navButton.appendChild(document.createTextNode((i+1)+''));
        $(navButton).bind('click', {selected: i}, function(event){
            currentPage = event.data.selected;
            $(table).trigger('repaginate');
            $(this).addClass('page-navigation-button-selected').siblings().removeClass('page-navigation-button-selected');
        });
        pageNavigationBar.appendChild(navButton);
    }

    $(pageNavigationBar).insertAfter(table);

    $(pageNavigationBar).find('span.page-navigation-button:first').addClass('page-navigation-button-selected');
}