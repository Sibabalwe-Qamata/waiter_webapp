"use scrict";

let assert = require("assert");
let regNumFactory = require('../registration_plates');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL || "postgresql://coder:pg123@localhost:5432/reg_numb";

const pool = new Pool({
  connectionString
});

describe("The Registration Numbers WebApp Database Unit Tests", async function() {
  beforeEach(async function() {
    await pool.query("delete from reg_numbers;");
    await pool.query("INSERT INTO reg_numbers (reg_number, town_id) VALUES ('CA 0011', 1)")
  });

  it("It should return the town ID of the town entered (i.e Cape Town, id:1).", async function()
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CA 1485", "CA")
    assert.equal(await reg.validateInput("CA"),1);
  });


  it("It should return the town ID of the town entered (i.e George, id:4 ).", async function()
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CAW 1364")
    assert.equal(await reg.validateInput("CAW"),4);
  });

  it("It should return the town ID of the town entered (i.e Paarl, id: 10).", async function()
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CJ 6958")
    assert.equal(await reg.validateInput("CJ"),10);
  });

  it("It should return a message (i.e Successfully Added Registration Number) about the registration number of the town entered i.e(CJ 5246).", async function() 
  {
    let reg = await regNumFactory(pool);
     let enteredRegPlate = await reg.enterRegPlate("CJ 5246");

    assert.equal(enteredRegPlate.message,"Successfully Added Registration Number");
  });

  it("It should return  an error message (i.e You have entered a duplicate Registration Number. Please enter another Registration Number) for the registration number of the town entered i.e(CA 0011).", async function() 
  {
    let reg = await regNumFactory(pool);
     let enteredRegPlate = await reg.enterRegPlate("CA 0011");
   
    

    assert.equal(enteredRegPlate.message,"You have entered a duplicate Registration Number. Please enter another Registration Number");
  });

  it("It should return an error message (i.e The Registration Number entered is invalid) about the registration number of the town entered i.e(PQ 5246).", async function() 
  {
    let reg = await regNumFactory(pool);
     let enteredRegPlate = await reg.enterRegPlate("PQ 5246");

    assert.equal(enteredRegPlate.message,"The Registration Number entered is invalid.");
  });


  it("It should return all the registration numbers that exist in the database (These Numberplates are displayed in the screen).", async function() 
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CJ 5246");
    await reg.enterRegPlate("CW 5246");

    let getAll = await reg.getPlate();

    getAll.forEach(reg => {
      delete reg.id;
    });
  
    assert.deepEqual( getAll, [ {reg_number: 'CA 0011', town_id: 1 }, {reg_number: 'CJ 5246', town_id: 10 },
    {reg_number: 'CW 5246', town_id: 7 }]);
  });


  it("It should return all the registration numbers as per the selected town that exist in the Database.", async function() 
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CJ 5246");
    await reg.enterRegPlate("CJ 0146");
  
    await reg.dropDown("CJ");
    assert.deepEqual(await reg.filterTown("CJ"),[ { reg_number: 'CJ 5246' }, { reg_number: 'CJ 0146' } ]);
  });



});