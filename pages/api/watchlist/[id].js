import { fetcher } from '../../../utils/api';
import Watchlist from '../../../models/Watchlist';
import dbConnect from '../../../utils/dbConnect';

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    const watchlist = await Watchlist.findOne({ id });

    if (watchlist) {
      res.json({ found: true });
    } else {
      res.json({ found: false });
    }
  } else if (method === 'PUT') {
    const movie = await fetcher(getMovieUrl(id));

    const watchlist = new Watchlist({ id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date });
    await watchlist.save();

    res.status(200).json({ found: true });
  } else if (method === 'DELETE') {
    await Watchlist.deleteOne({ id });
    res.status(200).json({ found: false });
  }
  res.status(400).end();
}