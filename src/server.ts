import "dotenv/config";
import config from "./config";

import app from "./app";

const port = config.PORT;
// const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
