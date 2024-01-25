import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";

// Import interfaces
import { Tour } from "./interface";

dotenv.config();
const app: Express = express();

// Reading the tours data from the file
const tours: Array<Tour> = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`).toString());

// Handling the get requests
app.get("/api/v1/tours", (req: Request, res: Response) => {
  res.status(200)
    .json({
      status: 'success',
      result: tours.length,
      data: {
        tours
      }
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('App is running');
});
