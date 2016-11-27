'use strict'

const Database = use('Database')
const Vehicle = use('App/Model/Vehicle')
const Trip = use('App/Model/Trip')

class ListController {
    * list(req, res) {
        try {
            const entityType = req.param('name');
            const entityFilter = req.param('filter');
            var success = false;

            if (
                (
                    (entityType == "employees" && entityFilter == undefined ||
                        entityType == "vehicles" && entityFilter == undefined)
                )
                ||
                (
                    (entityType == "shipments" && entityFilter == undefined)
                    &&
                    (req.currentUser.username == "Admin" || req.currentUser.is_active)
                )
                ||
                (
                    (entityType == "trips" && entityFilter == undefined)
                    &&
                    (req.currentUser.username == "Admin")
                )
            ) {
                const entities = yield Database.select('*').from(entityType);
                if (entityType == "trips") {
                    for (var i in entities) {
                        var date = new Date(entities[i].start_date * 1000);
                        var year = date.getFullYear();
                        var month = "0" + date.getMonth();
                        var day = "0" + date.getDate();
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var seconds = "0" + date.getSeconds();
                        entities[i].start_date = year + "." + month.substr(-2) + "." + day.substr(-2) + ". " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                        if (entities[i].end_date != null) {
                            date = new Date(entities[i].end_date * 1000);
                            year = date.getFullYear();
                            month = "0" + date.getMonth();
                            day = "0" + date.getDate();
                            hours = date.getHours();
                            minutes = "0" + date.getMinutes();
                            seconds = "0" + date.getSeconds();
                            entities[i].end_date = year + "." + month.substr(-2) + "." + day.substr(-2) + ". " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                        }
                    }
                }
                yield res.sendView('list', {
                    entities,
                    entityType,
                    entityFilter
                });
                success = true;
            }

            else if (
                (
                    (entityType == "sites" && entityFilter == undefined) // EGY-EGY kapcsolat: sites-site_infos
                )
            ) {
                const sites = yield Database.select('*').from(entityType);
                var entities = [];

                for (var i in sites) {
                    const site_info = yield Database.select('*').from('site_infos').where('site_id', sites[i].id);
                    entities[entities.length] = sites[i];
                    entities[entities.length - 1].country = site_info[0].country;
                    entities[entities.length - 1].city = site_info[0].city;
                    entities[entities.length - 1].address = site_info[0].address;
                    entities[entities.length - 1].zip = site_info[0].zip;
                }
                yield res.sendView('list', {
                    entities,
                    entityType,
                    entityFilter
                });
                success = true;
            }

            else if (
                (entityType == "vehicles" && entityFilter == "driven") // EGY-SOK kapcsolat: vehicles-trips
                &&
                (req.currentUser.username == "Admin" || req.currentUser.is_active)
            ) {
                const driven_vehicles = yield Database.select('vehicle').from('trips').where('employee', req.currentUser.username).distinct();
                var license_plates = [];
                for (var i in driven_vehicles) {
                    license_plates[license_plates.length] = driven_vehicles[i].vehicle;
                }

                const entities = yield Database.select('*').from('vehicles').whereIn('license_plate', license_plates);

                yield res.sendView('list', {
                    entities,
                    entityType,
                    entityFilter
                });
                success = true;
            }

            else if (
                (entityType == "vehicles" && entityFilter == "free")
                &&
                (req.currentUser.username == "Admin" || req.currentUser.is_active)
            ) {
                const entities = yield Database.select('*').from(entityType).where('is_available', true);
                yield res.sendView('list', {
                    entities,
                    entityType,
                    entityFilter
                });
                success = true;
            }

            else if (
                (entityType == "trips" && entityFilter == "own")
                &&
                (req.currentUser.username == "Admin" || req.currentUser.is_active)
            ) {
                const entities = yield Database.select('*').from(entityType).where('employee', req.currentUser.username);
                if (entityType == "trips") {
                    for (var i in entities) {
                        var date = new Date(entities[i].start_date * 1000);
                        var year = date.getFullYear();
                        var month = "0" + date.getMonth();
                        var day = "0" + date.getDate();
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var seconds = "0" + date.getSeconds();
                        entities[i].start_date = year + "." + month.substr(-2) + "." + day.substr(-2) + ". " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                        if (entities[i].end_date != null) {
                            date = new Date(entities[i].end_date * 1000);
                            year = date.getFullYear();
                            month = "0" + date.getMonth();
                            day = "0" + date.getDate();
                            hours = date.getHours();
                            minutes = "0" + date.getMinutes();
                            seconds = "0" + date.getSeconds();
                            entities[i].end_date = year + "." + month.substr(-2) + "." + day.substr(-2) + ". " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                        }
                    }
                }
                yield res.sendView('list', {
                    entities,
                    entityType,
                    entityFilter
                });
                success = true;
            }

            if (!success) {
                yield res.sendView('errors.permissionError');
            }

        }
        catch (e) {
            yield res.sendView('errors.unexpectedError');
        }
    }
}

module.exports = ListController
