import dbConnect from "../utils/dbConnect";
import History from "../models/History";

export default function Home({ history }) {
  return (
    <div className="container">
      <div>
        {history.map((user, index) => {
          return (
            <div className="card" key={index}>
              <h2>{user.id}</h2>
              <p>{user.title}</p>
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