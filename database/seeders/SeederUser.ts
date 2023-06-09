import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from "App/Models/User";

export default class extends BaseSeeder {
  public static environment = ["development", "testing"];

  public async run() {
    console.log("====== BEGIN Seeding Table: Users ======");

    await User.createMany([
      {
        id: "9ae0721b-a6f8-47fe-84d9-0fbdbf8f1cbf",
        // name: "Novianti Handayani",
        // username: "raulhandy",
        email: "raulhandy@mail.com",
        password: "passpass",
        // nik: "3326160101810021",
        role: "employee",
        // joinDate: DateTime.fromISO("2021-02-10"),//T17:00:00.000Z",
        // phoneNumber: "083637553299",
        // address: "Elias Pike, Ruteng Riau 39292",
        // specialization: "umum",
        // gender: "F",
      },
      {
        id: "f5a31f5c-f8a0-461c-9a65-c0db4092e865",
        // name: "Sidiq Pandu",
        // username: "sidiqpandu",
        email: "sidiqpandu@mail.com",
        password: "cWkSMYZaE",
        // nik: "3326164107570382",
        role: "employee",
        // joinDate: DateTime.fromISO("2021-03-04"),//T17:00:00.000Z",
        // phoneNumber: "08877395144",
        // address: "Jl Putri Hijau 18 GH, Sumatera Utara",
        // specialization: "none",
        //   // gender: "M",
      },
      {
        id: "8e5386b9-d6a6-4584-af60-8304ee6835c5",
        // name: "Dwi Lestari",
        // username: "d2ilestari",
        email: "d2ilestari@mail.com",
        password: "4wmsKt952",
        // nik: "3326164511690002",
        role: "employee",
        // joinDate: DateTime.fromISO("2021-12-03"),//T17:00:00.000Z",
        // phoneNumber: "08754115435",
        // address: "JL. Dr. H. Moch. Hatta No.169,Tasikmalaya",
        // specialization: "gigi",
        //   // gender: "F",
      },
      {
        id: "f65ddbae-78f9-491b-8f16-e569ab8c4b58",
        // name: "Doddy Rachman",
        // username: "doddyrachman",
        email: "drachman@mail.com",
        password: "Y82Uspk67",
        // nik: "3326161509700004",
        role: "employee",
        // joinDate: DateTime.fromISO("2021-07-06"),//T17:00:00.000Z",
        // phoneNumber: "08996884448",
        // address: "Jl Sunan Muria 7 RT 007/015, Dki Jakarta",
        // specialization: "none",
        //   // gender: "M",
      },
      {
        id: "ed0970d4-37ee-48e5-ba1f-641ea82b24d6",
        // name: "Karsa Maulana",
        // username: "kamaulana",
        email: "kamaulana@mail.com",
        password: "B2RxQZV44",
        // nik: "3326161808790021",
        role: "employee",
        // joinDate: DateTime.fromISO("2022-09-19"),//T17:00:00.000Z",
        // phoneNumber: "08921732939",
        // address: "Jl Jend A Yani 100, Jawa Tengah",
        // specialization: "none",
        // gender: "M",
      },
      {
        id: "48a48bf5-e33d-4383-9e86-48dc18cd564a",
        // name: "Galih Lazuardi",
        // username: "galihlazdy",
        email: "galihlazdy@mail.com",
        password: "RBb6gBgnF",
        // nik: "3326164405880041",
        role: "employee",
        // joinDate: DateTime.fromISO("2021-06-25"),//T17:00:00.000Z",
        // phoneNumber: "08840596882",
        // address: "Jl Prof HM Yamin SH A-3 Kompl Nusantara Bldg, Sumatera Barat",
        // specialization: "ortopedi",
        //   // gender: "M",
      },
      {
        id: "759bf6c3-1dae-4e13-8f4e-c595bfb32ec9",
        // name: "Rachel Matondang",
        // username: "rachelrach",
        email: "rachelrach@mail.com",
        password: "QXTacC6nc",
        // nik: "3326160107550301",
        role: "employee",
        // joinDate: DateTime.fromISO("2022-05-13"),//T17:00:00.000Z",
        // phoneNumber: "0876901309331",
        // address: "Jl Wonosari Km 10, Jawa Tengah",
        // specialization: "none",
        //   // gender: "F",
      },
      {
        id: "181786b6-cf6f-4c6f-9f16-e99c50bb6df8",
        // name: "Nahum Wuruwu",
        // username: "nahuman",
        email: "nahuman@mail.com",
        password: "jfaGXcjM5",
        // nik: "3326164107570383",
        role: "employee",
        // joinDate: DateTime.fromISO("2021-08-18"),//T17:00:00.000Z",
        // phoneNumber: "088257425333",
        // address: "JL Veteran No. 7&7A, Surabaya",
        // specialization: "none",
        //   // gender: "M",
      },
      {
        id: "b67ec0df-fc40-435b-8f42-236131d6a4ec",
        // name: "Victor Simatupang",
        // username: "victorsim",
        email: "victorsim@mail.com",
        password: "NTrXxts9r",
        // nik: "3326164511690001",
        role: "employee",
        // joinDate: DateTime.fromISO("2022-01-13"),//T17:00:00.000Z",
        // phoneNumber: "0824060536",
        // address: "Jl Rungkut Industri IV 12 Kawasan SIER, Jawa Timur",
        // specialization: "umum",
        // gender: "M",
      },
      {
        id: "90298207-ffc3-47bb-acc8-1453887f4855",
        // name: "Nadia Rahayu",
        // username: "nadiiahayu",
        email: "nadiaahayu@mail.com",
        password: "mpqNSt6ZB",
        // nik: "3326161509700001",
        role: "employee",
        // joinDate: DateTime.fromISO("2021-03-14"),//T17:00:00.000Z",
        // phoneNumber: "0859586882",
        // address: "Jl Nusa Indah I Gg Karyawan 2-A 35118",
        // specialization: "none",
        //   // gender: "F",
      },
      {
        id: "e3012e0e-e924-4788-85e5-aaa4c7566c71",
        // name: "gordon",
        // username: "gfree",
        email: "gordonfreeman@blackmesa.org",
        password: "wheresmyhelmet",
        // nik: "3509901117770001",
        role: "employee",
        // joinDate: DateTime.fromISO("2023-03-09"),//T17:00:00.000Z",
        // phoneNumber: "08111111111",
        // address: "California, USA",
        // specialization: "anak",
        //   // gender: "M",
      },
      {
        id: "5a2c91fa-8d55-4497-bf34-d051696e2b7e",
        // name: "Maya Mardhiyah",
        // username: "madiahmay",
        email: "maymayaa@mail.com",
        password: "YqQfyEUkz",
        // nik: "3326161812790001",
        role: "employee",
        // joinDate: DateTime.fromISO("2023-01-13"),//T17:00:00.000Z",
        // phoneNumber: "08151651487",
        // address: "Jl Veteran 26, Sumatera Selatan",
        // specialization: "none",
        //   // gender: "F",
      },
      {
        id: "29722285-69b4-419a-9c06-69fd7cfe41a1",
        // name: "Anon1",
        // username: "anonymousse",
        email: "anon@mail.com",
        password: "supermn",
        // nik: "3509201201340001",
        role: "employee",
        isVerified: true
        // joinDate: DateTime.fromISO("2023-01-18"),//T17:00:00.000Z",
        // phoneNumber: "0812345678",
        // address: "internet",
        // specialization: "none",
        //   // gender: "M",
      },
      {
        id: "50a572d5-547c-460b-aabb-48afd6c54160",
        // registBy: "181786b6-cf6f-4c6f-9f16-e99c50bb6df8",
        // status: "lajang",
        // gender: "M",
        // address: "Kompl Green Garden Bl I 3/17-20, Dki Jakarta",
        // phone: "08250059002",
        // birthday: DateTime.fromISO("2001-08-31"),
        email: "tirtosusman@mail.com",
        // name: "Tirto Susman",
        // username: "tirtosusman",
        password: "VJf9J6Vx9x",
        role: "patient",
        // registerDate: DateTime.fromISO("2022-05-02T01:12:59"),
        // nik: "3326165406640002",
        isVerified: false,
      },
      {
        id: "d483d11b-aa39-4655-abe3-ef9d58cbd2a1",
        // registBy: "b67ec0df-fc40-435b-8f42-236131d6a4ec",
        // status: "menikah",
        // gender: "M",
        // address: "Jl Perak Tmr 222, Jawa Timur",
        // phone: "08570099362",
        // birthday: DateTime.fromISO("2000-03-01"),
        email: "irwansugiarto@mail.com",
        // name: "Irwan Sugiarto",
        // username: "irwansugiarto",
        password: "Lay489DQmU",
        // registerDate: DateTime.fromISO("2021-05-15T06:04:32"),
        // nik: "3326163112390062",
        role: "patient",
        isVerified: false,
      },
      {
        id: "2adb35de-3a21-4971-b670-209702b0f386",
        // registBy: "90298207-ffc3-47bb-acc8-1453887f4855",
        // status: "lajang",
        // gender: "F",
        // address: "Jl Nako 10, Jawa Barat",
        // phone: "0876400284940",
        // birthday: DateTime.fromISO("1989-07-26"),
        email: "erikwilliams@mail.com",
        // name: "Erik Williams",
        // username: "erikwilliams",
        password: "Bpf5es2F32",
        // registerDate: DateTime.fromISO("2021-09-21T03:43:12"),
        // nik: "3326162802090001",
        role: "patient",
        isVerified: true,
      },
      {
        id: "ee958cd3-bb2b-4520-83ea-5810840dcb10",
        // registBy: "181786b6-cf6f-4c6f-9f16-e99c50bb6df8",
        // status: "menikah",
        // gender: "F",
        // address: "Jl Kwitang Tmr 30 RT 005/010, Dki Jakarta",
        // phone: "086471723381",
        // birthday: DateTime.fromISO("1993-03-29"),
        email: "mutiapuspita@mail.com",
        // name: "Mutia Puspita",
        // username: "mutiapuspita",
        password: "tpqWYtscFr",
        // registerDate: DateTime.fromISO("2023-01-26T02:59:12"),
        // nik: "3326161107740001",
        role: "patient",
        isVerified: false,
      },
      {
        id: "ad8ef60a-3038-43ac-bea6-bf978285582d",
        // registBy: "b67ec0df-fc40-435b-8f42-236131d6a4ec",
        // status: "lajang",
        // gender: "M",
        // address: "Jl Glodok Baru 6-7, Dki Jakarta",
        // phone: "08971128581",
        // birthday: DateTime.fromISO("2001-06-13"),
        email: "tinazulaika@mail.com",
        // name: "Tina Zulaika",
        // username: "tinazulaika",
        password: "Dsd95s5NLf",
        // registerDate: DateTime.fromISO("2023-02-17T01:45:01"),
        // nik: "3326162801070001",
        role: "patient",
        isVerified: false,
      },
      {
        id: "7a7080eb-6ef0-45ef-b7a5-db632ab144f5",
        // registBy: "90298207-ffc3-47bb-acc8-1453887f4855",
        // status: "menikah",
        // gender: "M",
        // address: "Jl Dr Saharjo 111, Dki Jakarta",
        // phone: "0853089167",
        // birthday: DateTime.fromISO("2001-08-19"),
        email: "irzarahardian@mail.com",
        // name: "Irza Rahardian",
        // username: "irzarahardian",
        password: "satudua",
        // registerDate: DateTime.fromISO("2022-03-05T02:10:11"),
        // nik: "3326160101810021",
        role: "patient",
        isVerified: true,
      },
      {
        id: "28b728c6-af99-435f-9d85-bda5e23c8796",
        // registBy: "181786b6-cf6f-4c6f-9f16-e99c50bb6df8",
        // status: "lajang",
        // gender: "F",
        // address: "Jl Seturani Perum Pemda Seturan Indah 15, Jawa Tengah",
        // phone: "0893681467",
        // birthday: DateTime.fromISO("2002-07-04"),
        email: "pritawidyaningtyas@mail.com",
        // name: "Prita Widyaningtyas",
        // username: "pritawidyaningtyas",
        password: "GWLPwJ64vc",
        // registerDate: DateTime.fromISO("2022-09-27T01:09:10"),
        // nik: "3326161812790001",
        role: "patient",
        isVerified: false,
      },
      {
        id: "caa4ba37-d990-447f-828a-05b19baca4d2",
        // registBy: "b67ec0df-fc40-435b-8f42-236131d6a4ec",
        // status: "menikah",
        // gender: "F",
        // address: "Jl Way Rarem 25 35213",
        // phone: "082802716913",
        // birthday: DateTime.fromISO("2001-01-18"),
        email: "edoalfredo@mail.com",
        // name: "Edo Alfredo",
        // username: "edoalfredo",
        password: "Ev9XLVAQr2",
        // registerDate: DateTime.fromISO("2022-12-31T03:11:12"),
        // nik: "3326164405880041",
        role: "patient",
        isVerified: false,
      },
      {
        id: "1e451059-d069-46a7-a5f7-648fc12bd80e",
        // registBy: "90298207-ffc3-47bb-acc8-1453887f4855",
        // status: "lajang",
        // gender: "M",
        // address: "Jl Letjen Haryono MT 112, Sumatera Utara",
        // phone: "087672885941",
        // birthday: DateTime.fromISO("2002-10-29"),
        email: "wildanarrighi@mail.com",
        // name: "Wildan Arrighi",
        // username: "wildanarrighi",
        password: "HbnRkF7JK2",
        // registerDate: DateTime.fromISO("2021-11-29T06:14:15"),
        // nik: "3326160107550301",
        role: "patient",
        isVerified: false,
      },
      {
        id: "c2369749-17ac-4572-bc4e-439cead69f60",
        // registBy: "181786b6-cf6f-4c6f-9f16-e99c50bb6df8",
        // status: "menikah",
        // gender: "F",
        // address: "Jl Air Bersih 144, Sumatera Utara",
        // phone: "0894263227",
        // birthday: DateTime.fromISO("2001-08-01"),
        email: "tammyzulfa@mail.com",
        // name: "Tammy Zulfa",
        // username: "tammyzulfa",
        password: "JE7EEw7H2S",
        // registerDate: DateTime.fromISO("2021-05-25T06:20:54"),
        // nik: "3326164107570382",
        role: "patient",
        isVerified: false,
      },
    ])

    // users.forEach(async (user, index) => {
    //   if (index % 2 === 0) await user.merge({ isVerified: true }).save()
    // })

    console.log("====== FINISH Seeding Table: Users ======");
  }
}