import mongoose from "mongoose";
import app from "./app";
const port = 5000

async function main() {
  try {
    // connect to the database
    // await mongoose.connect(config.databaseURL as string);

    // start the server
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
