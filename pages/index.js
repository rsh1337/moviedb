import { Badge, Box, Button, Center, CircularProgress, Container, Divider, Grid, GridItem, Heading, HStack, Link, Stack, Tag, Text } from "@chakra-ui/react";
import Head from "next/head";
import useSWR from "swr";
import Layout from "../components/layout"
const fetcher = (...args) => fetch(...args).then((res) => res.json())
import Image from "next/image";

function PopularMovies(){
  const { data, error } = useSWR('/api/movies/popular', fetcher)
  const IMAGES_API = "https://image.tmdb.org/t/p/w300/";

  if (error) return <div>Failed to load</div>
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <Container 
    overflowX="scroll"
    css={{
      '&::-webkit-scrollbar': {
        width: '2px',
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: '5px',
      },
      '&::-webkit-scrollbar-thumb:horizontal': {
        background: '#4CBB78',
        borderRadius: '15px',
      },
    }}>
      <HStack spacing={400}>
        {data.results.map(({ id, title, release_date, poster_path }) => (
          <Box as="h1">test</Box>
        ))}
      </HStack>
    </Container>
  );
}

export default function Home() {
  return (
    <Layout title="MovieDB.gov.ru">
      <PopularMovies />
    </Layout>
  )
}
