import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run () {
    console.log("====== BEGIN Seeding Table: Pharmacists ======");

    await Database.table("pharmacists").multiInsert([
      {
        id: "c40278ba-fb7c-498b-9afb-5035c768d0b4",
        employee_id: "f5a31f5c-f8a0-461c-9a65-c0db4092e865",
        license_number: "10.921/III/IP.AP/2020",
      },
      {
        id: "745bdaf7-66cc-4135-b1dd-042a3aa13c17",
        employee_id: "5a2c91fa-8d55-4497-bf34-d051696e2b7e",
        license_number: "12.901/VII/IP.AP/2022",
      },
      {
        id: "5bd42249-0e55-4d12-a515-3458abd043bc",
        employee_id: "759bf6c3-1dae-4e13-8f4e-c595bfb32ec9",
        license_number: "13.102/VII/IP.AP/2021",
      },
    ]);

    console.log("====== FINISH Seeding Table: Pharmacists ======");
  }
}
