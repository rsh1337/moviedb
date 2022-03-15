import { Badge, Box, Button, Center, CircularProgress, Grid, GridItem, Heading, HStack, Link, Stack, Tag, Text } from "@chakra-ui/react";
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
    <Grid templateColumns="repeat(3, 1fr)" gap={8} py="1rem">
      {data.results.map(({ id, title, release_date, poster_path }) => (
        <GridItem
          maxW="xl"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          key={id}
          align="center"
        >
          <Box minW="300px" pos="relative">
            <Link href={`/movies/${id}`} passHref>
              <Box minW="300px" pos="relative">
                <Image
                  src={IMAGES_API + `${poster_path}`}
                  alt={title}
                  layout="responsive"
                  width="300"
                  height="450"
                  objectFit="contain"
                  unoptimized
                />
              </Box>
              <Box height="50">
                <Button
                  as="a"
                  variant="link"
                  rightIcon={<Badge>{release_date}</Badge>}
                ></Button>
                <Grid>
                  <Button as="a" variant="link">
                    <Text as="span">{title} </Text>
                  </Button>
                </Grid>
              </Box>
            </Link>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}

export default function Home() {
  return (
    <Layout title="MovieDB.gov.ru">
      <PopularMovies />
    </Layout>
  )
}
