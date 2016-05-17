/**
 * Created by Olezhka on 11.05.2016.
 */

$(document).ready(function () {
    $('#dialog').dialog({autoOpen: false});
});


$('#new-record-button').click(function () {
    $('#status-block').show();
    $("#dialog").dialog(newRecDlgInitObj).dialog('open');
});

function editButtonHandler() {
    var firstName = $(this).closest('tr').find('td.first-name').html();
    var lastName = $(this).closest('tr').find('td.last-name').html();

    $('#first-name').val(firstName);
    $('#last-name').val(lastName);
    var trID = $(this).closest('tr').attr('id');

    $('#status-block').hide();
    $('#dialog').dialog(editDlgInitObj).data('row_id', trID).dialog('open');
}

function resetDialogData() {
    $('#first-name').val("");
    $('#last-name').val("");
    $("input[name='status']:first").prop('checked', true);

    $('#first-name-error').contents().remove();
    $('#last-name-error').contents().remove();
    $('#status-error').contents().remove();
}

function handleError(data) {
    var respObj = JSON.parse(data.responseText);
    var errMsg = (typeof respObj['first_name'] != 'undefined') ? respObj['first_name'] : "";
    $('#first-name-error').html(errMsg);

    errMsg = (typeof respObj['last_name'] != 'undefined') ? respObj['last_name'] : "";
    $('#last-name-error').html(errMsg);

    errMsg = (typeof respObj['status'] != 'undefined') ? respObj['status'] : "";
    $('#status-error').html(errMsg);
}
