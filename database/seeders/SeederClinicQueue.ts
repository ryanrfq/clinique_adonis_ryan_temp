import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ClinicQueue from 'App/Models/ClinicQueue';

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    console.log("====== BEGIN Seeding Table: clinic_queues ======");

    await ClinicQueue.createMany([
      {
        id: "79738ab6-6d3b-4d2b-a665-5a3fa6aae35c",
        registrationId: "bb31c9a1-326b-4618-8ac7-a3afd1c9d37b",
        clinicId: "88bcf42d-9878-444d-b334-0dc1a7025714",
        patientId: "406f341e-2002-41b0-8f13-ba6da1184144",
        status: "registered",
      },
      {
        id: "ffd946fe-719a-45b9-a2da-b61ea8d34e41",
        registrationId: "94267b6f-2448-4367-8fb5-edbd3105b366",
        clinicId: "88bcf42d-9878-444d-b334-0dc1a7025714",
        patientId: "c40543a3-6047-47d8-b5b0-144414164fb5",
        status: "done",
      },
      {
        id: "5be35dbf-1693-44d5-8766-bb61a04ac2e1",
        registrationId: "8f56ade8-e13a-4b20-870b-f400042d85f3",
        clinicId: "111f8e21-131c-4de7-aca3-9b4978a3dae1",
        patientId: "a9529361-d1c9-433d-a5f0-abac76226903",
        status: "done",
      },
      {
        id: "14154ad7-eeab-4c49-9168-7003ee4de126",
        registrationId: "ae10230a-050f-4843-9e2f-1f9debb91b88",
        clinicId: "111f8e21-131c-4de7-aca3-9b4978a3dae1",
        patientId: "5c36ab9a-db1a-4aee-9f41-44bf7c850b35",
        status: "registered",
      },
    ]);

    console.log("====== FINISH Seeding Table: clinic_queues ======");
  }
}
