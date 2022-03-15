import Layout from "../components/layout"
import getConfig from "next/config"
import Movie from "../components/Movie"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function Home(initialData) {
  return (
    <Layout title="MovieDB.gov.ru">

    </Layout>
  )
}
