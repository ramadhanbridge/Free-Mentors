import express from "express";
import PORT from "./config/port";
import routes from "./routes/routes_index";
import not_found from "./routes/default";
import db_init from "./models/db";
const swagger = require("swagger-ui-express");
const Api_documentation = require("./swagger.json");
const app = express();

db_init.create_tables();

app.use("/api/v2", routes);
app.use("/documentation", swagger.serve, swagger.setup(Api_documentation));
app.use(not_found);

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
export default app;
