import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 4000,
  dbUser: process.env.DB_USER || "carlos",
  dbPassword: process.env.DB_PASSWORD || "carlos",
  dbServer: process.env.DB_SERVER || "localhost",
  dbDatabase: process.env.DB_DATABASE || "SportGYM",
};

export const PAYPAL_API_CLIENT = "AeOX3LTg_2aOey2JAkmaCXnq8Dlgb62O0ugbBJ0pCxSOGRYj7l735jEdwnKDdiscr8Si3PvllbtN28sK";
export const PAYPAL_API_SECRET = "EE86KLsR4SvytkNIrVSstK-vBC60Yl4f7BdUAyBpINIbZNM9Z3DC6o9caDugnVDxjiZ8QhwiuV3oiIWe";
export const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // url sandbox or live for your app

// Server
export const HOST =
  process.env.NODE_ENV === "production"
    ? process.env.HOST
    : "http://localhost:" + 4000;


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