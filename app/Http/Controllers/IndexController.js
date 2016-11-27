'use strict'

const Database = use('Database')
const Vehicle = use('App/Model/Vehicle')
const Trip = use('App/Model/Trip')

class IndexController {
    * showIndexPage(req, res) {
        //try {
        var success = false;
        var whereCriteria = {};
        if (req.currentUser) {
            if (req.currentUser.username == 'Admin') {
                whereCriteria = { 'end_date': null };
            } else if (req.currentUser.is_active) {
                whereCriteria = { 'employee': req.currentUser.username, 'end_date': null }
            }

            const entities = yield Database.select('*').from('trips').where(whereCriteria);

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
            console.log(entities)
            yield res.sendView('index', {
                entities,
            });
            success = true;


            if (!success) {
                yield res.sendView('errors.permissionError');
            }
        }
        else {
            yield res.sendView('index');
        }

        /*}
        catch (e) {
            yield res.sendView('errors.unexpectedError');
        }*/
    }
}

module.exports = IndexController
