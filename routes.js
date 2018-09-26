module.exports = function (waitersFac) {

    async function show(req, res) {

        try {
            let {
                name
            } = req.params;
            //console.log(name)

            res.render('home', {
                name
            });

        } catch (error) {
            res.redirect("/");
        }
    };

    async function showAdd(req, res, next) {
        try {
            let {
                name
            } = req.params;
            let {
                day
            } = req.body;
            let staffName = await waitersFac.enterWaiterName(name);
            //console.log("Days:", day);

            let workDay = await waitersFac.checkDays(day);

            let getWorker = await waitersFac.addShifts(name,day);
            //console.log(getWorker);
            res.redirect('/waiters/' + name)
            //console.log("From the DB: ", staffName);


            //console.log("WorkDay: ", workDay);

            // if (staffName.message === true) {
            //     req.flash('info', result.message);
            //     res.redirect('/waiters/' + name)

            // } else if (staffName.message === false) {
            //     req.flash('error', result.message);
            //     res.redirect('/waiters/' + name);
            // }

           
        } catch (error) {
            next(error);
        }
    };

    async function admin(req, res) {
        try {

            res.render("days");

            let all = await waitersFac.getWaiters();

            let allDay = await waitersFac.getDays();
            //console.log("Names: ", all);
           // console.log("Days:", allDay);
        } catch (error) {

        }
    };


    return {
        show,
        showAdd,
        admin

    }
}