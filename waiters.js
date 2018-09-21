"use strict";
module.exports = function (pool) {

    async function setWaiter(waiterName) {

      let list =  await pool.query('INSERT into waiters (waiter_name) values ($1)', [waiterName]);
        return {
            success : true,
            message : "Successfully Added Registration Number",
            waiterList : list
        }
    }

    return {
        enterWaiterName: setWaiter,
        
    }

}