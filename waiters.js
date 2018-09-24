"use strict";
module.exports = function (pool) {

    async function setWaiter(waiterName) {

      let list =  await pool.query('INSERT into waiters (waiter_name) values ($1)', [waiterName]);
        return {
            success : true,
            message : "Successfully Added Waiter"
        }
    }

    async function selectedDay(TownChoice) 
    {    

        let dayPicked = await pool.query('SELECT * FROM week_days');
       if(TownChoice != undefined || TownChoice !=''){
        for(var k=0; k < townPicked.rows.length ; k++)
        {
            
            if(townPicked.rows[k].location_indicator === TownChoice){
                townPicked.rows[k].checked = true;
            }
            
        }
       }    
        return townPicked.rows;
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