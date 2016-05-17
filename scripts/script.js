//$(document).ready(function () {
function fillTable() {
    $.getJSON('http://js-assessment-backend.herokuapp.com/users.json', function (data) {
        // console.log(data.length);
        var tableBody = $('#table-body');
        for (var i = 0; i < data.length; i++) {
            var row = addTableRow(data[i]);
            $(tableBody).append(row);
        }
        paginate();
    });
}

function addTableRow(entryObj) {
    var id = entryObj.id;
    var textData = [entryObj.first_name, entryObj.last_name, entryObj.created_at];
    var isLocked = entryObj.status === 'locked';

    var tableRow = document.createElement('tr');
    $(tableRow).attr('id', id);

    tableRow = addTextCells(tableRow, textData, isLocked);

    var tableCell = document.createElement('td');
    $(tableCell).addClass('lock-status');
    var checkbox = document.createElement('input');
    $(checkbox).attr('type', 'checkbox');
    if(isLocked)
        $(checkbox).attr('checked', 'checked');
    $(checkbox).attr('onchange', 'changeStatus(this)');

    tableCell.appendChild(checkbox);
    tableRow.appendChild(tableCell);

    var button = document.createElement('button');
    var text = document.createTextNode('Edit');
    button.appendChild(text);

    $(button).bind('click', editButtonHandler);
    
    $(button).addClass('edit-button').hide();

    tableCell = document.createElement('td');
    tableCell.appendChild(button);
    tableRow.appendChild(tableCell);

    return tableRow;
}

function addTextCells(row, textData, isLocked){
    var classes = ['first-name', 'last-name', 'created-at'];
    for(var i = 0; i < textData.length; i++) {
        var tableCell = document.createElement('td');
        $(tableCell).addClass(classes[i]);
        if (isLocked)
            $(tableCell).addClass('strike-through');
        var text = document.createTextNode(textData[i]);
        tableCell.appendChild(text);
        row.appendChild(tableCell);
    }
    return row;
}

function changeStatus(context){
    var ancestor = $(context).closest('tr');
    var urlAddress = 'http://js-assessment-backend.herokuapp.com/users/' + $(ancestor).attr('id') + '.json';//$(ancestor).attr('id');
    var lockStatus = context.checked ? 'locked' : 'active';
    $.ajax({
        url: urlAddress,
        method: 'PUT',
        contentType: 'application/x-www-form-urlencoded',
        data: "user[status]=" + lockStatus,
        success: function () {
            var kids = $(ancestor).children();

            for(var i = 0; i < (kids.length-1); i++){
                var tmp = kids[i];
                context.checked ? $(tmp).addClass('strike-through') : $(tmp).removeClass('strike-through');
            }
        },
        error: function (data) {
            alert('Error :(');
            console.log('O kurwa!');
            context.checked ? $(context).prop('checked', false) : $(context).prop('checked', false);
        }
    });
}