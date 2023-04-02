import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RegistrationQueue from 'App/Models/RegistrationQueue';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    console.log("====== BEGIN Seeding Table: registration_queues ======");

    await RegistrationQueue.createMany([
      {
        id: "bb31c9a1-326b-4618-8ac7-a3afd1c9d37b",
        clinicId: "88bcf42d-9878-444d-b334-0dc1a7025714",
        queueNumber: 1,
        time: DateTime.fromISO("2022-05-02T01:19:24"),
        status: "new",
      },
      {
        id: "94267b6f-2448-4367-8fb5-edbd3105b366",
        clinicId: "88bcf42d-9878-444d-b334-0dc1a7025714",
        queueNumber: 1,
        time: DateTime.fromISO("2023-01-31T01:08:21"),
        status: "registered",
      },
      {
        id: "8f56ade8-e13a-4b20-870b-f400042d85f3",
        clinicId: "111f8e21-131c-4de7-aca3-9b4978a3dae1",
        queueNumber: 1,
        time: DateTime.fromISO("2022-07-11T10:08:07"),
        status: "registered",
      },
      {
        id: "ae10230a-050f-4843-9e2f-1f9debb91b88",
        clinicId: "111f8e21-131c-4de7-aca3-9b4978a3dae1",
        queueNumber: 1,
        time: DateTime.fromISO("2022-03-05T02:20:11"),
        status: "new",
      },
      {
        id: "6e09e0cd-0447-4f6a-b913-50b52bad9e2b",
        clinicId: "0bd2b0bd-b954-4401-952b-20486dd9ee3d",
        queueNumber: 1,
        time: DateTime.fromISO("2022-05-30T06:01:11"),
        status: "bail",
      },
    ]);

    console.log("====== FINISH Seeding Table: registration_queues ======");
  }
}
