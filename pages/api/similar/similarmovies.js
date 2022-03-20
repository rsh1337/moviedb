import dbConnect from "../../../utils/dbConnect";
import Watchlist from "../../../models/Watchlist";

export default async function handler(req, res) {
  await dbConnect();
  let similarmovies = await Watchlist.findOne({id});
  res.status(200).json(similarmovies);
}