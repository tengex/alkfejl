var $inputFrom_site = '';
var $suggestionsInputFrom_site = '';
var $inputTo_site = '';
var $suggestionsInputTo_site = '';
var $inputEmployee = '';
var $suggestionsInputEmployee = '';
var $inputVehicle = '';
var $suggestionsInputVehicle = '';
var $inputShipment = '';
var $suggestionsInputShipment = '';
var suggestions = {};

$(function () {
    var i = 0;
    $inputFrom_site = $('#inputFrom_site');
    $suggestionsInputFrom_site = $('.suggestions-inputFrom_site');
    $inputTo_site = $('#inputTo_site');
    $suggestionsInputTo_site = $('.suggestions-inputTo_site');
    $inputEmployee = $('#inputEmployee');
    $suggestionsInputEmployee = $('.suggestions-inputEmployee');
    $inputVehicle = $('#inputVehicle');
    $suggestionsInputVehicle = $('.suggestions-inputVehicle');
    $inputShipment = $('#inputShipment');
    $suggestionsInputShipment = $('.suggestions-inputShipment');

    $(document).ready(function () {
        $.get('/ajax/suggest/', {
            q: ["From_site", "To_site", "Employee", "Vehicle", "Shipment"]
        }).done(function (result) {
            console.log(result);
            suggestions = result;
        });
    });

    $inputFrom_site.on('focus', function (event) {

        let html = '';
        for (let i = 0; i < suggestions["From_site"].length; i++) {
            html += '<a class="list-group-item" href="javascript:void(0);" onclick="choose(\'' + (suggestions["From_site"])[i] + '\',\'InputFrom_site\');">' + (suggestions["From_site"])[i] + '</a>';
        }
        $suggestionsInputFrom_site.html(html);
        event.preventDefault();
    });

    $inputTo_site.on('focus', function (event) {
        let html = '';
        for (let i = 0; i < suggestions["To_site"].length; i++) {
            html += '<a class="list-group-item" href="javascript:void(0);" onclick="choose(\'' + (suggestions["To_site"])[i] + '\',\'InputTo_site\');">' + (suggestions["To_site"])[i] + '</a>';
        }
        $suggestionsInputTo_site.html(html);
        event.preventDefault();
    });

    $inputEmployee.on('focus', function (event) {
        let html = '';
        for (let i = 0; i < suggestions["Employee"].length; i++) {
            html += '<a class="list-group-item" href="javascript:void(0);" onclick="choose(\'' + (suggestions["Employee"])[i] + '\',\'InputEmployee\');">' + (suggestions["Employee"])[i] + '</a>';
        }
        $suggestionsInputEmployee.html(html);
        event.preventDefault();
    });

    $inputVehicle.on('focus', function (event) {
        let html = '';
        for (let i = 0; i < suggestions["Vehicle"].length; i++) {
            html += '<a class="list-group-item" href="javascript:void(0);" onclick="choose(\'' + (suggestions["Vehicle"])[i] + '\',\'InputVehicle\');">' + (suggestions["Vehicle"])[i] + '</a>';
        }
        $suggestionsInputVehicle.html(html);
        event.preventDefault();
    });

    $inputShipment.on('focus', function (event) {
        let html = '';
        for (let i = 0; i < suggestions["Shipment"].length; i++) {
            html += '<a class="list-group-item" href="javascript:void(0);" onclick="choose(\'' + (suggestions["Shipment"])[i] + '\',\'InputShipment\');">' + (suggestions["Shipment"])[i] + '</a>';
        }
        $suggestionsInputShipment.html(html);
        event.preventDefault();
    });
});

function choose(value, where) {
    if (where == 'InputFrom_site') {
        console.log("InputFrom_site")
        $inputFrom_site.val(value);
        $suggestionsInputFrom_site.html('');
    } else if (where == 'InputTo_site') {
        console.log("InputTo_site")
        $inputTo_site.val(value);
        $suggestionsInputTo_site.html('');
    } else if (where == 'InputEmployee') {
        console.log("InputEmployee")
        $inputEmployee.val(value);
        $suggestionsInputEmployee.html('');
    } else if (where == 'InputVehicle') {
        console.log("InputVehicle")
        $inputVehicle.val(value);
        $suggestionsInputVehicle.html('');
    } else if (where == 'InputShipment') {
        console.log("InputShipment")
        $inputShipment.val(value);
        $suggestionsInputShipment.html('');
    }

}