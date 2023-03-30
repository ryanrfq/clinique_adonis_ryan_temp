import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    console.log("====== BEGIN Seeding Table: Clinics ======");

    await Database.table("clinics").multiInsert([
      {
        id: "88bcf42d-9878-444d-b334-0dc1a7025714",
        doctor_id: "f3af78dd-7274-4e1e-b0b3-4790c8626e34",
        name: "umum",
        room: "A01",
        daily_quota: 150,
      },
      {
        id: "111f8e21-131c-4de7-aca3-9b4978a3dae1",
        doctor_id: "ac4bebaa-7e34-453f-80ab-38d6348d5dc9",
        name: "gigi",
        room: "B01",
        daily_quota: 2,
      },
      {
        id: "0bd2b0bd-b954-4401-952b-20486dd9ee3d",
        doctor_id: "c295b8b3-50f1-41e8-94c4-93f2f9e91879",
        name: "ortopedi",
        room: "A02",
        daily_quota: 100,
      },
      {
        id: "d133d47a-0f28-4ad5-af12-3ad42f68019a",
        doctor_id: "013f68ea-1de4-4e56-ad67-8187865cef59",
        name: "anak",
        room: "A03",
        daily_quota: 100,
      },
    ]);

    console.log("====== FINISH Seeding Table: Clinics ======");
  }
}
