/**
 * Created by Olezhka on 17.05.2016.
 */
var newRecDlgInitObj = {
    title: "New record",
    autoOpen: false,
    modal: true,
    buttons: {
        OK: function () {
            var dlg = this;
            $.ajax({
                url: 'http://js-assessment-backend.herokuapp.com/users.json',
                method: 'POST',
                codeType: 'application/x-www-form-urlencoded',
                data:
                'user[first_name]=' + $('#first-name').val() +
                '&user[last_name]=' + $('#last-name').val() +
                '&user[status]=' + $("input[name='status']:checked").val()
                ,
                success: function (data) {
                    var row = addTableRow(data);
                    $('#table-body').append(row);
                    paginate();
                    $('div.page-navigation-bar').find('span.page-navigation-button:last').trigger('click');
                    $(dlg).dialog("close");
                    resetDialogData();
                },
                error: function (data) {
                    handleError(data);
                }
            });
        },
        Cancel: function () {
            resetDialogData();
            $(this).dialog("close");
        }
    },
    close: function(){
        resetDialogData();
    }
};
var editDlgInitObj = {
    title: "Edit",
    autoOpen: false,
    modal: true,
    buttons: {
        OK: function () {
            var dlg = this;
            var trID = $(this).data('row_id');
            $.ajax({
                url: 'http://js-assessment-backend.herokuapp.com/users/' + $(this).data('row_id') + '.json',
                method: 'PUT',
                codeType: 'application/x-www-form-urlencoded',
                data:
                'user[first_name]=' + $('#first-name').val() +
                '&user[last_name]=' + $('#last-name').val()
                ,
                success: function (data) {
                    var fn = $('#first-name').val();
                    var ln = $('#last-name').val();

                    $('#'+trID).find('td.first-name').html(fn);
                    $('#'+trID).find('td.last-name').html(ln);
                    $(dlg).dialog("close");
                    resetDialogData();
                },
                error: function (data) {
                    handleError(data);
                }
            });
        },
        Cancel: function () {
            resetDialogData();
            $(this).dialog("close");
        }
    },
    close: function(){
        resetDialogData();
    }
};