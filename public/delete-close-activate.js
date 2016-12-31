$(function () {
    const texts = {
        closeTrip: "Biztosan le szeretné zárni a túrát?",
        inactivateEmployee: "Biztosan inaktiválni szeretné a dolgozót?",
        inactivateVehicle: "Biztosan inaktiválni szeretné a járművet?",
        activateEmployee: "Biztosan aktiválni szeretné a dolgozót?",
        activateVehicle: "Biztosan aktiválni szeretné a járművet?",
        deleteTrip: "Biztosan törölni szeretné a túrát?"
    }
    const methods = {
        closeTrip: "POST",
        inactivateEmployee: "POST",
        inactivateVehicle: "POST",
        activateEmployee: "POST",
        activateVehicle: "POST",
        deleteTrip: "DELETE"
    }
    const headers = {
        'csrf-token': $('[name="_csrf"]').val()
    }
    const url = window.location.href;
    var $form = $('.deleteTrip,.closeTrip,.inactivateEmployee,.inactivateVehicle,.activateEmployee,.activateVehicle');
    var $dialog = $(`
        <div class="modal fade confirm-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
        <div class="modal-body">`
        + "wtfisthis" +
        `</div>
        <div class="modal-footer">
            <button type="button" class="btn btn-success modal-ok" data-dismiss="modal">OK</button>
            <button type="button" class="btn btn-danger modal-cancel" data-dismiss="modal">Mégse</button>
        </div>
        </div>
        </div>
        </div>`);
    var $action = '';
    var $method = '';

    $dialog.find('.modal-ok').on('click', function () {
        $.ajax({
            url: '/ajax' + $action,
            type: $method,
            dataType: 'html',
            headers
        }).done(function (resp) {
            var data = JSON.parse(resp);
            var $messageDiv = $(`<div class="alert alert-info"><strong>` + data.message + `</strong></div>`);
            $('.container').html($messageDiv);
            setTimeout(function () {
                location.assign(url);
            }, 1000);
        })
            .fail(function () {
                alert('Hiba a művelet során!')
            });
    });

    $form.on('submit', function (event) {
        /*console.log("-----------------------------------------------------------------------------");
        console.log(event);
        console.log(event.target.className);
        console.log(event.target.attributes.action.value);
        console.log("#-----------------------------------------------------------------------------");*/
        //console.log(window.location.origin)
        event.preventDefault();
        $method = methods[event.target.className];
        $dialog.find('.modal-body').html(texts[event.target.className]);
        $action = event.target.attributes.action.value;
        $dialog.modal('show');
    });
});