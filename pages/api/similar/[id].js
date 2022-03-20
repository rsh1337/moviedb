import { fetcher } from '../../../utils/api';

const getSimilarUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`;
  
export default async function handler(req, res) {
  const similar = await fetcher(getSimilarUrl(req.query.id));

  res.status(200).json(similar);
}