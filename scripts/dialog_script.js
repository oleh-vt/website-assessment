/**
 * Created by Olezhka on 11.05.2016.
 */
$(document).ready(function () {
    $('#dialog-new').dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            OK: function () {
                $.ajax({
                    url: 'http://js-assessment-backend.herokuapp.com/users.json',
                    method: 'POST',
                    codeType: 'application/json',
                    data:{
                        last_name: $('#last-name').val(),
                        first_name: $('#first-name').val(),
                        status: $("input[name='status']:checked").val()
                    },
                    success: function (data) {
                        data.url = 'http://js-assessment-backend.herokuapp.com/users/' + data.id + '.json';
                        var row = addTableRow(data);
                        $('#table-body').append(row);
                        $('div.page-navigation-bar').find('span.page-navigation-button:last').trigger('click');
                        $( this ).dialog( "close" );
                    },
                    error: function (data) {
                        console.log('O kurwa!');
                    }
                });
            },
            Cancel: function () {
                $( this ).dialog( "close" );
            }
        }
    });
});


$('#new-record-button').click(function () {
    $("#dialog-new").dialog('open');
});