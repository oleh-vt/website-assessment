/**
 * Created by Olezhka on 08.05.2016.
 */
var td;
var tableRows;
var pagesAmount;
var currentPage = 1;

function buildPagination() {
    td = document.getElementById('main-table');
    tableRows = td.getElementsByTagName('tr');
    pagesAmount = Math.ceil(tableRows.length/10);

    var pageNavigationBar = document.createElement('span');
    $(pageNavigationBar).addClass('page-navigation-bar');
    for(var i = 0; i < pagesAmount; i++){
        var a = document.createElement('a');
        $(a).addClass('page-button');
        $(a).attr('data-page', i+'');
        var text = document.createTextNode(""+(i+1));
        a.appendChild(text);
        pageNavigationBar.appendChild(a);
    }

    $(pageNavigationBar).insertAfter(td);
}

function show(page) {
    if(page == currentPage)
        return;
    var startIndex = page - 1;
    var endIndex = page * 10;

    for(var i = currentPage-1; i < currentPage * 10 && i < pagesAmount.length; i++){
        var tmp = tableRows[i];
        $(tmp).hide();
    }
    for(var i = startIndex; i < endIndex  && i < pagesAmount.length; i++){
        var tmp = tableRows[i];
        $(tmp).show();
    }
    currentPage = page;
}