import dbConnect from "../../../utils/dbConnect";
import Watchlist from "../../../models/Watchlist";

export default async function handler(req, res) {
  await dbConnect();
  let watchlist = await Watchlist.find({});
  res.status(200).json(watchlist);
}