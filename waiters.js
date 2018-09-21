"use strict";
module.exports = function (pool) {

    async function setWaiter(waiterName) {

      let list =  await pool.query('INSERT into waiters (waiter_name) values ($1)', [waiterName]);
        return {
            success : true,
            message : "Successfully Added Registration Number"
        }
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
        getDays
        
    }

}