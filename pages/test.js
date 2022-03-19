import dbConnect from "../utils/dbConnect";
import History from "../models/History";

export default function Home({ history }) {
  return (
    <div className="container">
      <div>
        {history.map((movie, index) => {
          return (
            <div className="card" key={index}>
              <h2>{movie.id}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  let history = await History.find({});
  history = JSON.parse(JSON.stringify(history));

  return {
    props: { history },
  };
}