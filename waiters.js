"use strict";
module.exports = function (pool) {

    async function setWaiter(waiterName) {
        const repeatedWaiter = await duplicateCheck(waiterName);
        if (repeatedWaiter) {
            return {
                success: false,
                message: "Name entered already exists. Please enter another name!"
            }
        }

        await pool.query('INSERT into waiters (waiter_name) values ($1)', [waiterName]);
        return {
            success: true,
            message: "Successfully Added Waiter"
        }
    }
    async function duplicateCheck(waiterName) {
        let nameDuplicate = await pool.query('SELECT * FROM waiters WHERE waiter_name=$1', [waiterName]);
        return nameDuplicate.rowCount === 1;
    }

    async function checkDays(ShiftDay)
    {
        if(Array.isArray(ShiftDay) === true)
        {    
            return  ShiftDay;
        }
        else if(Array.isArray(ShiftDay) === false){ 
            let DayList = ShiftDay.split();
            return DayList  
        }
    }

    async function getWorkerId(workerName){
        let waiterName = await pool.query('SELECT id FROM waiters WHERE waiter_name=$1', [workerName]);

        let waiterId = waiterName.rows[0].id;

        return waiterId;
    }

    async function getDayId(checkDays){


       let workDay = checkDays;

       console.log("Day List: ",workDay);

       console.log("Type Of: ",typeof(workDay));



       let dayId = '';

       let days = []
       let workDays = '';

       if((typeof(workDay) === '') || (Array.isArray(workDay) === false)){
              workDays  = workDay.split();

            for (let index = 0; index < workDays.length; index++) {
                const element = workDays[index];
                let workingDayId = await pool.query('SELECT id FROM week_days WHERE week_day=$1',[element]); 
                
                 dayId = workingDayId.rows[0].id;
     
                 days.push(dayId);
            }
            return days;
       }
       else if (Array.isArray(workDay) === true){
        for (let index = 0; index < workDay.length; index++) {
            const element = workDay[index];
            let workingDayId = await pool.query('SELECT id FROM week_days WHERE week_day=$1',[element]); 
            
             dayId = workingDayId.rows[0].id;
 
             days.push(dayId);
        }
        return days;
       }
      
    }

    async function addShifts(name, workDay)
    {
       let workerShift =  await getWorkerId(name);
       console.log("Worker: ", workerShift);
        let dayShift = await getDayId(workDay);
        console.log("Days: ", dayShift);
    }

    async function getWaiters() {
        let allWaiters = await pool.query('SELECT * from waiters');
        return allWaiters.rows;
    }

    async function getDays() {
        let allDays = await pool.query('SELECT * from week_days');
        return allDays.rows;
    }

    return {
        enterWaiterName: setWaiter,
        addShifts,
        getWaiters,
        getDays,
        duplicateCheck,
        checkDays,
        getDayId,
        getWorkerId
    }

}