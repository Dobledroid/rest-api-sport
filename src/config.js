import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 4000,
  dbUser: process.env.DB_USER || "carlos",
  dbPassword: process.env.DB_PASSWORD || "carlos",
  dbServer: process.env.DB_SERVER || "localhost",
  dbDatabase: process.env.DB_DATABASE || "SportGYM",
};

// export default {
//   port: process.env.PORT || 4000,
//   dbUser: process.env.DB_USER || "user1",
//   dbPassword: process.env.DB_PASSWORD || "Yarayerena2018",
//   dbServer: process.env.DB_SERVER || "localhost",
//   dbDatabase: process.env.DB_DATABASE || "SportGYM",
// };

// export default {
//   port: process.env.PORT || 4000,
//   dbUser: process.env.DB_USER || "sqlserver",
//   dbPassword: process.env.DB_PASSWORD || "sqlserver",
//   dbServer: process.env.DB_SERVER || "104.155.155.22",
//   dbDatabase: process.env.DB_DATABASE || "SportGYM",
// };

export const MERCADOPAGO_API_KEY = 'TEST-2722826054068937-022415-a9369346a81cf8254e922cc153009aa9-1699138056'
;