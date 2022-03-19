import connectToDatabase from "../../utils/dbConnect";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("watchlist")
    .find({})
    .sort({ metacritic: -1 })
    .toArray();

  res.json(movies);
};