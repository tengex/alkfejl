$(function () {
    var $divFrom_site = $('#divFrom_site');
    var $divTo_site = $('#divTo_site');
    var $divEmployee = $('#divEmployee');
    var $divVehicle = $('#divVehicle');
    var $divShipment = $('#divShipment');
    var $inputFrom_site = $divFrom_site.find('.form-control');
    var $inputTo_site = '';
    var $inputEmployee = '';
    var $inputVehicle = '';
    var $inputShipment = '';
    var html = '';
    var suggestions = {};

    function generate_select_From_site() {
        var html = `<select class="form-control" id="inputFrom_site" name="from_site">
                        <option value="">Válasszon egy értéket!</option>`;

        for (let i = 0; i < suggestions["From_site"].length; i++) {
            const suggestion = (suggestions["From_site"])[i];
            html += '<option value="' + suggestion + '"';
            if ($divFrom_site.find('.form-control')[0].value == suggestion) {
                html += ' selected';
            }
            html += '>' + suggestion + '</option>';
        }

        html += `</select>`;
        return html;
    }
    function generate_select_To_site() {
        var html = `<select class="form-control" id="inputTo_site" name="to_site">
                        <option value="">Válasszon egy értéket!</option>`;
        for (let i = 0; i < suggestions["To_site"].length; i++) {
            const suggestion = (suggestions["To_site"])[i];
            html += '<option value="' + suggestion + '"';
            if ($divTo_site.find('.form-control')[0].value == suggestion) {
                html += ' selected';
            }
            html += '>' + suggestion + '</option>';
        }

        html += `</select>`;
        return html;
    }
    function generate_select_Employee() {
        var html = `<select class="form-control" id="inputEmployee" name="employee">
                        <option value="" selected>Válasszon egy értéket!</option>`;
        for (let i = 0; i < suggestions["Employee"].length; i++) {
            const suggestion = (suggestions["Employee"])[i];
            html += '<option value="' + suggestion + '"';
            if ($divEmployee.find('.form-control')[0].value == suggestion) {
                html += ' selected';
            }
            html += '>' + suggestion + '</option>';
        }

        html += `</select>`;
        return html;
    }
    function generate_select_Vehicle() {
        var html = `<select class="form-control" id="inputVehicle" name="vehicle">
                        <option value="" selected>Válasszon egy értéket!</option>`;
        for (let i = 0; i < suggestions["Vehicle"].length; i++) {
            const suggestion = (suggestions["Vehicle"])[i];
            html += '<option value="' + suggestion + '"';
            if ($divVehicle.find('.form-control')[0].value == suggestion) {
                html += ' selected';
            }
            html += '>' + suggestion + '</option>';
        }

        html += `</select>`;
        return html;
    }
    function generate_select_Shipment() {
        var html = `<select class="form-control" id="inputShipment" name="shipment">
                        <option value="" selected>Válasszon egy értéket!</option>`;
        for (let i = 0; i < suggestions["Shipment"].length; i++) {
            const suggestion = (suggestions["Shipment"])[i];
            html += '<option value="' + suggestion + '"';
            if ($divShipment.find('.form-control')[0].value == suggestion) {
                html += ' selected';
            }
            html += '>' + suggestion + '</option>';
        }

        html += `</select>`;
        return html;
    }

    $(document).ready(function () {
        $.get('/ajax/suggest/', {
            q: ["From_site", "To_site", "Employee", "Vehicle", "Shipment"]
        }).done(function (result) {
            console.log(result);
            suggestions = result;

            $divFrom_site.html(generate_select_From_site);
            $divTo_site.html(generate_select_To_site);
            $divVehicle.html(generate_select_Vehicle);
            $divShipment.html(generate_select_Shipment);
            if (!$divEmployee.find('.form-control')[0].readOnly) {
                $divEmployee.html(generate_select_Employee);
            }
        });
    });
});
