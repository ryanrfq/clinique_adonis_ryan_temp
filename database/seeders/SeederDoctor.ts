import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run () {
    console.log("====== BEGIN Seeding Table: Doctor ======");

    await Database.table("doctors").multiInsert([
      {
        id: "f3af78dd-7274-4e1e-b0b3-4790c8626e34",
        employee_id: "9ae0721b-a6f8-47fe-84d9-0fbdbf8f1cbf",
        license_number: "503.446/III/IP.DU/2020",
        specialization: "umum",
        fee: 200000,
      },
      {
        id: "ac4bebaa-7e34-453f-80ab-38d6348d5dc9",
        employee_id: "8e5386b9-d6a6-4584-af60-8304ee6835c5",
        license_number: "512.322/IV/IP.GI/2020",
        specialization: "gigi",
        fee: 250000,
      },
      {
        id: "013f68ea-1de4-4e56-ad67-8187865cef59",
        employee_id: "e3012e0e-e924-4788-85e5-aaa4c7566c71",
        license_number: "443.123/II/IP.DU/2020",
        specialization: "umum",
        fee: 150000,
      },
      {
        id: "c295b8b3-50f1-41e8-94c4-93f2f9e91879",
        employee_id: "48a48bf5-e33d-4383-9e86-48dc18cd564a",
        license_number: "321.435/II/IP.DU/2020",
        specialization: "gigi",
        fee: 150000,
      },
    ]);

    console.log("====== FINISH Seeding Table: Doctor ======");
  }
}
