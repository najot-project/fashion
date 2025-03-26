
import app from "./app.js";
import connectDB, { APP_PORT } from "./config/app.config.js";


await connectDB();

app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
})

