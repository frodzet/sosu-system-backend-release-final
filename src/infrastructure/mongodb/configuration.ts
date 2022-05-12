require('dotenv').config();

export class Configuration {
  static userName: string = process.env.MONGODB_USER_NAME;
  static password: string = process.env.MONGODB_USER_PASSWORD;
  static dbName: string = process.env.MONGODB_DB_NAME;
  static urlKEY = `mongodb+srv://${this.userName}:${this.password}@sosu-db.qc7k5.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;
}
