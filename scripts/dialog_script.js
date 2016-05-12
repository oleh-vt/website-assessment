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
                        //data.url = 'http://js-assessment-backend.herokuapp.com/users/' + data.id + '.json';
                        var row = addTableRow(data);
                        $('#table-body').append(row);
                        paginate();
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

    $('#dialog-edit').dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            OK: function () {
                $.ajax({
                    url: 'http://js-assessment-backend.herokuapp.com/users/' + $(this).data('row_id') + '.json',
                    method: 'PUT',
                    codeType: 'application/json',
                    data:{
                        last_name: $('#ln').val(),
                        first_name: $('#fn').val()
                    },
                    success: function (data) {

                        var fn = $('#fn').val();
                        var ln = $('#ln').val();

                        var trID = $(this).data('row_id');
                        $(trID).find('td.first-name').html(fn);
                        $(trID).find('td.last-name').html(ln);
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

function editButtonHandler() {
    var firstName = $(this).closest('tr').find('td.first-name').html();
    console.log('fName ' +firstName);
    var lastName = $(this).closest('tr').find('td.last-name').html();
    console.log('lname '+lastName);
    $('#fn').val(firstName);
    $('#ln').val(lastName);
    var trID = $(this).closest('tr').attr('id');
    $('#dialog-edit').data('row_id', trID).dialog('open');
}
