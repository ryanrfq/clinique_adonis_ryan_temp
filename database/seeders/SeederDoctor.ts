import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Doctor from 'App/Models/Doctor';

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    console.log("====== BEGIN Seeding Table: Doctor ======");

    await Doctor.createMany([
      {
        id: "f3af78dd-7274-4e1e-b0b3-4790c8626e34",
        employeeId: "9ae0721b-a6f8-47fe-84d9-0fbdbf8f1cbf",
        licenseNumber: "503.446/III/IP.DU/2020",
        specialization: "umum",
        fee: 200000,
      },
      {
        id: "ac4bebaa-7e34-453f-80ab-38d6348d5dc9",
        employeeId: "8e5386b9-d6a6-4584-af60-8304ee6835c5",
        licenseNumber: "512.322/IV/IP.GI/2020",
        specialization: "gigi",
        fee: 250000,
      },
      {
        id: "013f68ea-1de4-4e56-ad67-8187865cef59",
        employeeId: "e3012e0e-e924-4788-85e5-aaa4c7566c71",
        licenseNumber: "443.123/II/IP.GI/2020",
        specialization: "anak",
        fee: 150000,
      },
      {
        id: "c295b8b3-50f1-41e8-94c4-93f2f9e91879",
        employeeId: "48a48bf5-e33d-4383-9e86-48dc18cd564a",
        licenseNumber: "321.435/II/IP.DU/2020",
        specialization: "ortopedi",
        fee: 150000,
      },
      {
        id: "ea206d18-6bbe-48a8-9fbb-0f1ebc76bfda",
        employeeId: "b67ec0df-fc40-435b-8f42-236131d6a4ec",
        licenseNumber: "111.222/III/IP.DU/2019",
        specialization: "umum",
        fee: 160000,
      },
    ]);

    console.log("====== FINISH Seeding Table: Doctor ======");
  }
}
