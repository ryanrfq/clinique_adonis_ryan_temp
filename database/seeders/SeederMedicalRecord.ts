import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MedicalRecord from 'App/Models/MedicalRecord';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    console.log("====== BEGIN Seeding Table: medical_records ======");

    await MedicalRecord.createMany([
      {
        id: "02016034-ba76-4dc8-bd02-e6e34c74caf3",
        doctorId: "f3af78dd-7274-4e1e-b0b3-4790c8626e34",
        patientId: "406f341e-2002-41b0-8f13-ba6da1184144",
        complaint: "batuk berdahak, sesak napas",
        diagnosis: "radang tenggorokan",
        time: DateTime.fromISO("2022-05-02T01:39:24"),
        treatment:
          "pemberian resep obat, anjuran untuk menghindari konsumsi makanan jenis pedas selama 4 hari",
        weight: 65,
        bloodPressure: "122/74",
        notes: "tidak ada",
        prescription: "paracetamol, antibiotik",
      },
      {
        id: "36a49805-26a1-4578-aca1-d10bd7c0f173",
        doctorId: "f3af78dd-7274-4e1e-b0b3-4790c8626e34",
        patientId: "c40543a3-6047-47d8-b5b0-144414164fb5",
        complaint: "demam, pilek",
        diagnosis: "gejala flu dan kelelahan akibat kurang istirahat",
        time: DateTime.fromISO("2023-01-31T01:28:21"),
        treatment: "pemberian resep obat, anjuran untuk memperbanyak istirahat",
        weight: 80,
        bloodPressure: "130/82",
        notes: "pasien perlu kontrol dalam waktu satu minggu",
        prescription: "paracetamol, antibiotik, multivitamin",
      },
      {
        id: "b0684b06-b0d2-4c44-bce8-34420356759a",
        doctorId: "ac4bebaa-7e34-453f-80ab-38d6348d5dc9",
        patientId: "a9529361-d1c9-433d-a5f0-abac76226903",
        complaint: "kontrol kawat gigi",
        diagnosis: "gigi bergeser ke posisi yang semestinya",
        time: DateTime.fromISO("2022-07-11T10:28:07"),
        treatment: "penyesuaian posisi kawat gigi",
        weight: 74,
        bloodPressure: "120/80",
        notes: "tidak ada",
        prescription: "tidak ada",
      },
    ]);

    console.log("====== FINISH Seeding Table: medical_records ======");
  }
}
