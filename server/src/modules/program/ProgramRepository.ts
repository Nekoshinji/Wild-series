import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  sysnopsis: string;
  poster: string;
  country: string;
  year: string;
};

class PromgramRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of categories
    return rows as Program[];
  }
}

export default new PromgramRepository();
