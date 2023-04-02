import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (
      (!Seeder.default.environment.includes('development') && Application.inDev)
      || (!Seeder.default.environment.includes('testing') && Application.inTest)
      || (!Seeder.default.environment.includes('production') && Application.inProduction)
    ) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../SeederUser'))
    await this.runSeeder(await import('../SeederEmployee'))
    await this.runSeeder(await import('../SeederDoctor'))
    await this.runSeeder(await import('../SeederPharmacist'))
    await this.runSeeder(await import('../SeederClinic'))
    await this.runSeeder(await import('../SeederPatient'))
    await this.runSeeder(await import('../SeederRegistrationQueue'))
    await this.runSeeder(await import('../SeederClinicQueue'))
    await this.runSeeder(await import('../SeederMedicalRecord'))
    await this.runSeeder(await import('../SeederTransaction'))
    await this.runSeeder(await import('../SeederTransactionDetail'))
  }
}