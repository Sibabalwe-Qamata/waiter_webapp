"use strict";
module.exports = function (pool) {

    async function verifyInput(getRegNum) {
        let town_locator = getRegNum.slice(0, 3).toUpperCase().trim();
        let checkReg = await pool.query('SELECT id FROM towns WHERE location_indicator=$1', [town_locator]);
        return checkReg.rows[0].id;
    }


    async function setRegPlate(regValue) {

        let town_id = regValue.slice(0,3).toUpperCase().trim();
       
        const invalidRegNumberFormat = (regValue == "");
        if(invalidRegNumberFormat){
            return {
                success: false,
                message: "Incorrect Registration Number Format"
            }
        }

        const repeatedReg = await duplicateCheck(regValue);
        if(repeatedReg) {
            return {
                success: false,
                message: "You have entered a duplicate Registration Number. Please enter another Registration Number"
            }
            
        }


        const isValid = await isValidLocation(regValue);
        if(!isValid)
        {
            return {
                success: false,
                message:  "The Registration Number entered is invalid."
            }
            
        }


        let formatedPlate = regValue.toUpperCase();
        let location_id = await verifyInput(town_id);
        //Need to add validation checks!!!
        await pool.query('INSERT into reg_numbers  (reg_number, town_id) values ($1, $2)', [formatedPlate, location_id]);
        return {
            success : true,
            message : "Successfully Added Registration Number"
        }
    }




    async function getRegPlates() {
       
        let allRegs = await pool.query('SELECT * from reg_numbers');
        return allRegs.rows;
    }

    async function resetDB() {
        let clearDB = await pool.query("DELETE from reg_numbers");
        return clearDB;
    }

    async function filterRegPlate(TownChoice) {
        if(TownChoice !== "All")
        {
            let locationTagFound = await pool.query('SELECT id FROM towns where location_indicator  = $1', [TownChoice]);
            //First get the Registration number and the location_indicator from the reg_numbers table.
            let Filter = await pool.query('SELECT reg_number FROM reg_numbers WHERE town_id=$1',[locationTagFound.rows[0].id]);
           return Filter.rows;
              
        }
        else{
            return await getRegPlates();
        }
    
    }

    async function dropMenu(TownChoice) 
    {    

        let townPicked = await pool.query('SELECT * FROM towns');
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

    async function duplicateCheck(reg) {
        let FilterDuplicate = await pool.query('SELECT * FROM reg_numbers WHERE reg_number=$1',[reg]);
        return FilterDuplicate.rowCount === 1;
    }

    async function isValidLocation (regNumber) {
        
        let town_locator = regNumber.slice(0,3).toUpperCase().trim();
        let Duplicate = await pool.query('SELECT * FROM towns WHERE location_indicator=$1', [town_locator]);
        return Duplicate.rowCount === 1;
    }

    return {
        enterRegPlate: setRegPlate,
        validateInput: verifyInput,
        getPlate: getRegPlates,

        resetDataBase: resetDB,

        filterTown: filterRegPlate,
        dropDown : dropMenu,
        duplicateCheck,
        isValidLocation

    }

}