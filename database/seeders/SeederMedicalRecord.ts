import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run () {
    console.log("====== BEGIN Seeding Table: medical_records ======");

    await Database.table("medical_records").multiInsert([
      {
        id: "02016034-ba76-4dc8-bd02-e6e34c74caf3",
        doctor_id: "f3af78dd-7274-4e1e-b0b3-4790c8626e34",
        patient_id: "406f341e-2002-41b0-8f13-ba6da1184144",
        complaint: "batuk berdahak, sesak napas",
        diagnosis: "radang tenggorokan",
        time: "2022-05-02T01:39:24.000Z",
        treatment:
          "pemberian resep obat, anjuran untuk menghindari konsumsi makanan jenis pedas selama 4 hari",
        weight: 65,
        blood_pressure: "122/74",
        notes: "tidak ada",
        prescription: "paracetamol, antibiotik",
      },
      {
        id: "36a49805-26a1-4578-aca1-d10bd7c0f173",
        doctor_id: "f3af78dd-7274-4e1e-b0b3-4790c8626e34",
        patient_id: "c40543a3-6047-47d8-b5b0-144414164fb5",
        complaint: "demam, pilek",
        diagnosis: "gejala flu dan kelelahan akibat kurang istirahat",
        time: "2023-01-31T01:28:21.000Z",
        treatment: "pemberian resep obat, anjuran untuk memperbanyak istirahat",
        weight: 80,
        blood_pressure: "130/82",
        notes: "pasien perlu kontrol dalam waktu satu minggu",
        prescription: "paracetamol, antibiotik, multivitamin",
      },
      {
        id: "b0684b06-b0d2-4c44-bce8-34420356759a",
        doctor_id: "ac4bebaa-7e34-453f-80ab-38d6348d5dc9",
        patient_id: "a9529361-d1c9-433d-a5f0-abac76226903",
        complaint: "kontrol kawat gigi",
        diagnosis: "gigi bergeser ke posisi yang semestinya",
        time: "2022-07-11T10:28:07.000Z",
        treatment: "penyesuaian posisi kawat gigi",
        weight: 74,
        blood_pressure: "120/80",
        notes: "tidak ada",
        prescription: "tidak ada",
      },
    ]);

    console.log("====== FINISH Seeding Table: medical_records ======");
  }
}
