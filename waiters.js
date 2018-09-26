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
    }

    async function getDayId(checkDays){
       let workDay = checkDays;
       for (let index = 0; index < workDay.length; index++) {
           const element = workDay[index];
           let workingDayId = await pool.query('SELECT id FROM week_days WHERE week_day=$1',[element]); 
           
           let dayId = workingDayId.rows[0].id;
       }
    }

    async function addShifts(name, workDay)
    {

    
        
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
        getWaiters,
        getDays,
        duplicateCheck,
        checkDays

    }

}