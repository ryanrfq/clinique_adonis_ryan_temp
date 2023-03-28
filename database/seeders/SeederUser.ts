import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public static environment = ["development", "testing"];

  public async run() {
    console.log("====== BEGIN Seeding Table: Users ======");

    await Database.table("users").multiInsert([
      {
        id: "ce9c4d59-498e-497d-a18f-20356f42696f",
        employee_id: "29722285-69b4-419a-9c06-69fd7cfe41a1",
        password: "$scrypt$n=16384,r=8,p=1$XeOG/04Xpua9+e4Eup8rKA$3FT1b1A1WKytMeSuQZXwJv/b9ksykW6wqb44nM+VgZj4RvfFjZrrSuV9516VIcU7mTx1B4mDJsNfCfAMjueqbw",
        email: "anon@mail.com",
      },
      {
        id: "c3afc5a3-be9d-4f97-bbd2-a82400fd5324",
        employee_id: "181786b6-cf6f-4c6f-9f16-e99c50bb6df8",
        password: "$scrypt$n=16384,r=8,p=1$BUFeiTO90gG7YEtgKoMQHg$gi5pCRItdJ/FFEAYgjoIk9W9N8km6vw4HC9m2l68yyO3ys1myOKAmhmwH7jYzqIzKI8RWmgnU8zeTo+NMqmlVg",
        email: "nahuman@mail.com",
      },
      {
        id: "52a7fbed-742b-4655-8484-2cb6b60aede5",
        employee_id: "ed0970d4-37ee-48e5-ba1f-641ea82b24d6",
        password: "$scrypt$n=16384,r=8,p=1$v1b9zjdB+bw1Rl0cSd904g$Sh5FY10S6SkFLpXh/M0kEo7J30O3QBg0yfqamwOCDZNSN6b78z1CbR7WHkK3XqUxyhbAwAjNZ68Q1lfDlEungg",
        email: "kamaulana@mail.com",
      },
      {
        id: "a2087f2e-49f1-4d55-8bf7-fd4fd8b8979d",
        employee_id: "48a48bf5-e33d-4383-9e86-48dc18cd564a",
        password: "$scrypt$n=16384,r=8,p=1$DLjXxM9yv9XHe7YjaONvaA$F5zUKlEBs/Ms0OB862HATsQ9z3qJ94c9CoyGk4LuPVAabO6mqnu2aUc95V36tLBnd2czj0F8Zc9ZyTt3n7YIzg",
        // password: "RBb6gBgnF",
        email: "galihlazdy@mail.com",
      },
    ]);

    console.log("====== FINISH Seeding Table: Users ======");
  }
}
