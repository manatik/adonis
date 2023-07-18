declare module '@ioc:Adonis/Lucid/Database' {
  import { KnexPostgis } from 'knex-postgis'

  interface DatabaseContract {
    st(): KnexPostgis
  }

  interface CreateTableBuilder {
    st(): KnexPostgis
  }
}
