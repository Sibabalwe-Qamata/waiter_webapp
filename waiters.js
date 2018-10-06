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
            return DayList; 
        }
    }

    async function getWorkerId(workerName)
    {
        let waiterName = await pool.query('SELECT id FROM waiters WHERE waiter_name=$1', [workerName]);

        if(waiterName.rows[0].id === 0){
            await pool.query('');

        }

        let waiterId = waiterName.rows[0].id;

        return waiterId;
    }

    async function getDayId(checkDays){
       let workDay = checkDays
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
        let dayShift = await getDayId(workDay);

        
        for (let index = 0; index < dayShift.length; index++) {
            const element = dayShift[index];
            await pool.query('INSERT into shifts (waiter_id, week_day_id) values ($1,$2)', [workerShift, element]); 
        }
    }

    async function getShift(waiterName)
    {
      let addedShifts = await pool.query(` SELECT DISTINCT waiter_name, day_name from shifts join waiters on waiters.id = shifts.waiter_id join weekdays on weekdays.id = shifts.weekday_id WHERE waiters.waiter_name = '${waiterName}'`)
      
      return addedShifts.rows;
    }

    async function dataCollected() 
    {
        let data = await pool.query("SELECT week_days.id, week_days.week_day from week_days join shifts ON shifts.week_day_id = week_days.id WHERE waiter_id = shifts.waiter_id");
        return data;
    }

    async function dayMenu() 
    {    
        let dayPicked = await pool.query('SELECT * FROM week_days');
      
        for(var k=0; k < dayPicked.rows.length ; k++){  dayPicked.rows[k].checked = true; }
        return dayPicked.rows;
    }    
       
    

    async function getShiftId() {
        let allShifts = await pool.query('SELECT * from week_days join shifts on shifts.week_day_id=week_days.id join waiters on waiters.id = shifts.waiter_id');
        
        let convertShift = allShifts.rows;

        convertShift.forEach(waiter => {
            delete waiter.id, waiter.waiter_id, waiter.week_day_id;
          });

        return convertShift;
    }

    async function getWaiterId() {
        let allShiftsWaiter = await pool.query('SELECT  waiter_id FROM shifts');
        return allShiftsWaiter.rows;
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
        getWorkerId,


        getShiftId,
        getWaiterId,
        dataCollected,
        dayMenu,
        getShift
    }

}