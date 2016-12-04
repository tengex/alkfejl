'use strict'

const Database = use('Database')
const Vehicle = use('App/Model/Vehicle')
const Trip = use('App/Model/Trip')

class IndexController {
    * showIndexPage(req, res) {
        try {
            var success = false;
            if (req.currentUser) {

                //Unclosed Trips***************************************************
                var whereCriteria = {};
                if (req.currentUser.username == 'Admin') {
                    whereCriteria = { 'end_date': null };
                } else if (req.currentUser.is_active) {
                    whereCriteria = { 'employee': req.currentUser.username, 'end_date': null }
                }

                const unclosedTrips = yield Database.select('*').from('trips').where(whereCriteria);

                for (var i in unclosedTrips) {
                    var date = new Date(unclosedTrips[i].start_date * 1000);
                    unclosedTrips[i].start_date = timestampToDate(date);

                    if (unclosedTrips[i].end_date != null) {
                        date = new Date(unclosedTrips[i].end_date * 1000);
                        unclosedTrips[i].end_date = timestampToDate(date);
                    }
                }

                //Vehicles Trips***************************************************
                var vehiclesTrips = [];
                const vehiclesList = yield Database.select('license_plate').from('vehicles');

                for (var i in vehiclesList) {
                    const tripList = yield Database.select(['id', 'from_site', 'to_site', 'shipment', 'start_date', 'end_date']).from('trips').where('vehicle', vehiclesList[i].license_plate);

                    for (var j in tripList) {
                        var date = new Date(tripList[j].start_date * 1000);
                        tripList[j].start_date = timestampToDate(date);

                        if (tripList[j].end_date != null) {
                            date = new Date(tripList[j].end_date * 1000);
                            tripList[j].end_date = timestampToDate(date);
                        }
                    }

                    vehiclesTrips[vehiclesTrips.length] = { license_plate: vehiclesList[i].license_plate, tripList };
                }

                //Employees Vehicles***********************************************
                var employeesVehicles = [];
                const employeesList = yield Database.select(['username', 'fullname']).from('employees');

                for (var i in employeesList) {
                    const tripList = yield Database.select('vehicle').from('trips').where('employee', employeesList[i].username).distinct();
                    var vehicleList = [];

                    for (var j in tripList) {
                        const vehicleInfo = yield Database.select('*').from('vehicles').where('license_plate', tripList[j].vehicle);
                        vehicleList[vehicleList.length] = vehicleInfo[0];
                    }

                    employeesVehicles[employeesVehicles.length] = { username: employeesList[i].username, fullname: employeesList[i].fullname, vehicleList }
                }

                yield res.sendView('index', {
                    unclosedTrips,
                    vehiclesTrips,
                    employeesVehicles
                });
                success = true;

                if (!success) {
                    yield res.sendView('errors.permissionError');
                } else {
                    return;
                }
            }
            else {
                yield res.sendView('index');
            }

        }
        catch (e) {
            yield res.sendView('errors.unexpectedError');
        }
    }
}

function timestampToDate(date) {
    var year = date.getFullYear();
    var month = "0" + date.getMonth();
    var day = "0" + date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return (year + "." + month.substr(-2) + "." + day.substr(-2) + ". " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
}

module.exports = IndexController
