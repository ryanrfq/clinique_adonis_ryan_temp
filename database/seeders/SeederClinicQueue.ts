import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    console.log("====== BEGIN Seeding Table: clinic_queues ======");

    await Database.table("clinic_queues").multiInsert([
      {
        id: "79738ab6-6d3b-4d2b-a665-5a3fa6aae35c",
        registration_id: "bb31c9a1-326b-4618-8ac7-a3afd1c9d37b",
        clinic_id: "88bcf42d-9878-444d-b334-0dc1a7025714",
        patient_id: "406f341e-2002-41b0-8f13-ba6da1184144",
        status: "registered",
      },
      {
        id: "ffd946fe-719a-45b9-a2da-b61ea8d34e41",
        registration_id: "94267b6f-2448-4367-8fb5-edbd3105b366",
        clinic_id: "88bcf42d-9878-444d-b334-0dc1a7025714",
        patient_id: "c40543a3-6047-47d8-b5b0-144414164fb5",
        status: "done",
      },
      {
        id: "5be35dbf-1693-44d5-8766-bb61a04ac2e1",
        registration_id: "8f56ade8-e13a-4b20-870b-f400042d85f3",
        clinic_id: "111f8e21-131c-4de7-aca3-9b4978a3dae1",
        patient_id: "a9529361-d1c9-433d-a5f0-abac76226903",
        status: "done",
      },
      {
        id: "14154ad7-eeab-4c49-9168-7003ee4de126",
        registration_id: "ae10230a-050f-4843-9e2f-1f9debb91b88",
        clinic_id: "111f8e21-131c-4de7-aca3-9b4978a3dae1",
        patient_id: "5c36ab9a-db1a-4aee-9f41-44bf7c850b35",
        status: "registered",
      },
    ]);

    console.log("====== FINISH Seeding Table: clinic_queues ======");
  }
}
