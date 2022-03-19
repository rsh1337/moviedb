import dbConnect from "../../utils/dbConnect";
import History from "../../models/History";
import { fetcher } from '../../utils/api';

export default async function handler(req, res) {
  await dbConnect();
  let history = await History.find({});
  res.status(200).json(history);
}