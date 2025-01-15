const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 7000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected succussfully");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting database: ${error}`);
  });
