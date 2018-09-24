"use scrict";

let assert = require("assert");
let waiterFactory = require('../waiters');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL || "postgresql://coder:pg123@localhost:5432/waiter_db";

const pool = new Pool({
  connectionString
});

describe("The Waiter WebApp Database Unit Tests", async function() {
  beforeEach(async function() {
    await pool.query("delete from waiters;");
  });

  it("It should return the a message that a waiter has been successfully added.", async function()
  {
    let waiter = await waiterFactory(pool);
    await waiter.enterWaiterName("Siba");
    await waiter.enterWaiterName("Qamata");
    let waiterList = await waiter.getWaiters();

    waiterList.forEach( worker => {delete worker.id;});
    assert.deepEqual(waiterList, [ {waiter_name: 'Siba' }, {waiter_name: 'Qamata' } ]);
  });
});