import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Transaction from 'App/Models/Transaction';

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    console.log("====== BEGIN Seeding Table: transactions ======");

    await Transaction.createMany([
      {
        id: "8b8ba516-0a27-40f4-ab1a-31e61262e8d2",
        clinicQueueId: "79738ab6-6d3b-4d2b-a665-5a3fa6aae35c",
        medicalRecordId: "02016034-ba76-4dc8-bd02-e6e34c74caf3",
        totalCost: 280000,
        status: "paid",
      },
      {
        id: "daddc68c-1843-411e-9d25-5e4258c92d8b",
        clinicQueueId: "ffd946fe-719a-45b9-a2da-b61ea8d34e41",
        medicalRecordId: "36a49805-26a1-4578-aca1-d10bd7c0f173",
        totalCost: 270000,
        status: "paid",
      },
      {
        id: "1917b1da-867f-4ee3-a202-ff2b5965d8f4",
        clinicQueueId: "5be35dbf-1693-44d5-8766-bb61a04ac2e1",
        medicalRecordId: "b0684b06-b0d2-4c44-bce8-34420356759a",
        totalCost: 250000,
        status: "unpaid",
      },
    ]);

    console.log("====== FINISH Seeding Table: transactions ======");
  }
}
