'use strict'

const Database = use('Database')
const Vehicle = use('App/Model/Vehicle')
const Trip = use('App/Model/Trip')

class ListController {
    * list(req, res) {
        //try {
            const entityTypesArray = ["employees", "vehicles", "sites", "trips", "shipments"];
            const entityType = req.param('name');
            const entityFilter = req.param('filter');

            if (!req.currentUser) {
                switch (entityType) {
                    case "shipments":
                        yield res.sendView('errors.permissionError');
                        break;
                }
            }

            else if (req.currentUser.username != "Admin") {
                switch (entityType) {
                    case "trips":
                        if (entityFilter == undefined) {
                            yield res.sendView('errors.permissionError');
                        }
                        break;
                }
                if (!req.currentUser.is_active) {
                    switch (entityType) {
                        case "trips":
                            if (entityFilter) {
                                yield res.sendView('errors.permissionError');
                            }
                            break;
                        case "shipments":
                            yield res.sendView('errors.permissionError');
                            break;
                        case "vehicles":
                            if (entityFilter == "free") {
                                yield res.sendView('errors.permissionError');
                            }
                            else if (entityFilter == "driven") {
                                yield res.sendView('errors.permissionError');
                            }
                            break;
                    }
                }
            }


            if (req.param('name') == "vehicles" && req.param('filter') == "driven") {
                const vehicles = yield Vehicle
                    .query()
                    .with('trips')
                    .fetch();

                console.log(vehicles.toJSON());
            }

            else if (-1 != entityTypesArray.indexOf(req.param('name'))) {
                const entities = yield Database.select('*').from(req.param('name'));
                yield res.sendView('list', {
                    entities,
                    entityType,
                    entityFilter
                });
            }
        }
        /*catch (e) {
            yield res.sendView('errors.unexpectedError');
        }
    }*/
}

module.exports = ListController
