module.exports = function (waitersFac) {

    async function show(req, res) {

        try {
            let {
                name
            } = req.params;
            res.render('home', {name});

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
          

            let workDay = await waitersFac.checkDays(day);

            let getWorker = await waitersFac.addShifts(name,day);



            let workerId = await waitersFac.getWaiterId(name);

          

            //let days = await waitersFac.dataCollected(name);

           // /console.log(days);
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

           

            let data = await waitersFac.dataCollected();

           

            let all = await waitersFac.getWaiters();

            let allDay = await waitersFac.getDays();

            let shifts = await waitersFac.getShiftId();
            console.log(shifts);

            let days = await waitersFac.dataCollected();

            
         
            res.render("days", shifts);
         
        } catch (error) {

        }
    };


    return {
        show,
        showAdd,
        admin

    }
}