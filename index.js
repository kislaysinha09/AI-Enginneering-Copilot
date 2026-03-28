require('dotenv').config();
const express = require('express');
const app = express();

const openAiRoutes = require("./src/routes/openAiRoutes.js");
const documentRoutes = require("./src/routes/documentRoutes.js");

app.use(express.json());
app.use("/api", openAiRoutes);
app.use("/api/documents", documentRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})