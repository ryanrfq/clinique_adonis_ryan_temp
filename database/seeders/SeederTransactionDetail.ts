import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run () {
    console.log("====== BEGIN Seeding Table: transaction_details ======");

    await Database.table("transaction_details").multiInsert([
      {
        id: "21e3c57d-0422-4b7e-a4ba-a820f46cb586",
        transaction_id: "8b8ba516-0a27-40f4-ab1a-31e61262e8d2",
        item: "checkup fee",
        cost: 200000,
      },
      {
        id: "58ccc67f-f610-4b71-b81c-c0bb21698b4c",
        transaction_id: "8b8ba516-0a27-40f4-ab1a-31e61262e8d2",
        item: "prescription",
        cost: 80000,
      },
      {
        id: "d556e909-3fee-4a2f-a028-2270e89a99ae",
        transaction_id: "daddc68c-1843-411e-9d25-5e4258c92d8b",
        item: "checkup fee",
        cost: 200000,
      },
      {
        id: "d6b700e9-5b4a-45a5-902d-d2254908ba21",
        transaction_id: "daddc68c-1843-411e-9d25-5e4258c92d8b",
        item: "prescription",
        cost: 70000,
      },
      {
        id: "ea77953f-a3bc-4977-8f1c-72baf23308c7",
        transaction_id: "1917b1da-867f-4ee3-a202-ff2b5965d8f4",
        item: "checkup fee",
        cost: 250000,
      },
    ]);

    console.log("====== FINISH Seeding Table: transaction_details ======");
  }
}
