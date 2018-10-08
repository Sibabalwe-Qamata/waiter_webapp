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

            

            //let daysCo = await waitersFac.getShift(name);

           // /console.log(daysCo);
            res.redirect('/waiters/' + name)
        
           
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
          
            //console.log(shifts);

            let days = await waitersFac.dataCollected();

            let checkDay0 = shifts.filter( day => {
                return day.week_day ==="Sunday";
            })

            let checkDay1 = shifts.filter( day => {
                return day.week_day ==="Monday";
            })

            let checkDay2 = shifts.filter( day => {
                return day.week_day ==="Tuesday";
            })
            
            let checkDay3 = shifts.filter( day => {
                return day.week_day ==="Wednesday";
            })

            let checkDay4 = shifts.filter( day => {
                return day.week_day ==="Thursday";
            })
            let checkDay5 = shifts.filter( day => {
                return day.week_day ==="Friday";
            })
            let checkDay6 = shifts.filter( day => {
                return day.week_day ==="Saturday";
            })

            const daysCombined = [checkDay0, checkDay1];
            //console.log("Filterd According to day: Monday + Sunday ",daysCombined)
            // console.log("Filterd According to day: Tuesday ",checkDay2)
            // console.log("Filterd According to day: Wedsan ",checkDay3)
           
         
            res.render("days", {checkDay0,checkDay1, checkDay2,checkDay3, checkDay4,checkDay5, checkDay6});
         
        } catch (error) {

        }
    };

    async function clearDB() {
        try {
            let clear = await waitersFac.deleteShifts();
            res.redirect("days");
        } catch (error) {
            
        }
    }

    return {
        show,
        showAdd,
        admin, 
        clearDB

    }
}