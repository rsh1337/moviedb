import { fetcher } from '../../../utils/api';

const getRecommendationsUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`;
  
export default async function handler(req, res) {
  const recommendations = await fetcher(getRecommendationsUrl(req.query.id));

  res.status(200).json(recommendations);
}