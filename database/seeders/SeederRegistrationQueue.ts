import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run () {
    console.log("====== BEGIN Seeding Table: registration_queues ======");

    await Database.table("registration_queues").multiInsert([
      {
        id: "bb31c9a1-326b-4618-8ac7-a3afd1c9d37b",
        clinic_id: "88bcf42d-9878-444d-b334-0dc1a7025714",
        time: "2022-05-02T01:19:24.000Z",
        status: "new",
      },
      {
        id: "94267b6f-2448-4367-8fb5-edbd3105b366",
        clinic_id: "88bcf42d-9878-444d-b334-0dc1a7025714",
        time: "2023-01-31T01:08:21.000Z",
        status: "registered",
      },
      {
        id: "8f56ade8-e13a-4b20-870b-f400042d85f3",
        clinic_id: "111f8e21-131c-4de7-aca3-9b4978a3dae1",
        time: "2022-07-11T10:08:07.000Z",
        status: "registered",
      },
      {
        id: "ae10230a-050f-4843-9e2f-1f9debb91b88",
        clinic_id: "111f8e21-131c-4de7-aca3-9b4978a3dae1",
        time: "2022-03-05T02:20:11.000Z",
        status: "new",
      },
      {
        id: "6e09e0cd-0447-4f6a-b913-50b52bad9e2b",
        clinic_id: "0bd2b0bd-b954-4401-952b-20486dd9ee3d",
        time: "2022-05-30T06:01:11.000Z",
        status: "bail",
      },
    ]);

    console.log("====== FINISH Seeding Table: registration_queues ======");
  }
}
