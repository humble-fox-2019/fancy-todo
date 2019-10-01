const sendIncompletedTodo = require("./helpers/incompletedTodo")
const CronJob = require("cron").CronJob

new CronJob(' 0 8 * * 1', function () {

    sendIncompletedTodo()

}, null, true, 'Asia/Jakarta');
