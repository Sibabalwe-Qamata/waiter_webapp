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

    async function selectedDay(TownChoice) {

        let dayPicked = await pool.query('SELECT * FROM week_days');
        if (TownChoice != undefined || TownChoice != '') {
            for (var k = 0; k < townPicked.rows.length; k++) {

                if (townPicked.rows[k].location_indicator === TownChoice) {
                    townPicked.rows[k].checked = true;
                }

            }
        }
        return townPicked.rows;
    }

    async function duplicateCheck(waiterName) {
        let nameDuplicate = await pool.query('SELECT * FROM waiters WHERE waiter_name=$1', [waiterName]);
        return nameDuplicate.rowCount === 1;
    }

    async function checkDays(ShiftDay)
    {
        if(Array.isArray(ShiftDay) === true)
        {    
            return {
                success: true,
                daysShift: ShiftDay
            }
        }
        else if(Array.isArray(ShiftDay) === false){ 
            let DayList = ShiftDay.split();
            return{
                success : false,
                daysShift: DayList
            }
        }
    }

    async function getName_Day(name, workDay)
    {

        let workingDay = await pool.query('SELECT id FROM week_days WHERE week_day=$1',[workDay]);

        let waiterName = await pool.query('SELECT id FROM waiters WHERE waiter_name=$1', [name]);
        
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