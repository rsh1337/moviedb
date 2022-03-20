import { Badge, Box, Center, CircularProgress, Container, Divider, HStack, Link, Text } from "@chakra-ui/react";
import useSWR from "swr";
import Layout from "../components/layout"
import Image from "next/image";
import { fetcher } from '../utils/api';

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
        "&::-webkit-scrollbar": {
          width: "2px",
        },
        "&::-webkit-scrollbar-track": {
          borderRadius: "5px",
        },
        "&::-webkit-scrollbar-thumb:horizontal": {
          background: "#4CBB78",
          borderRadius: "15px",
        },
      }}
    >
      <HStack spacing={10}>
        {data.results.map(({ id, title, release_date, poster_path }) => (
          <Box
            minW="300px"
            pos="relative"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Link href={`/movies/${id}`} passHref>
            <Image
              src={IMAGES_API + `${poster_path}`}
              alt={title}
              layout="responsive"
              width="300"
              height="450"
              objectFit="contain"
              unoptimized
            />

            <Box p="5">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  Popular
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  Date &bull; {release_date}
                </Box>
              </Box>
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {title}
              </Box>
            </Box>
            </Link>
          </Box>
        ))}
      </HStack>
    </Container>
  );
}

function WatchlistList(){
  const { data, error } = useSWR('/api/watchlist/watchlistmovies', fetcher)
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
        "&::-webkit-scrollbar": {
          width: "2px",
        },
        "&::-webkit-scrollbar-track": {
          borderRadius: "5px",
        },
        "&::-webkit-scrollbar-thumb:horizontal": {
          background: "#4CBB78",
          borderRadius: "15px",
        },
      }}
    >
      <HStack spacing={10}>
        {data.map(({ id, title, release_date, poster_path }) => (
          <Box
            minW="300px"
            pos="relative"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Link href={`/watchlist/${id}`} passHref>
            <Image
              src={IMAGES_API + `${poster_path}`}
              alt={title}
              layout="responsive"
              width="300"
              height="450"
              objectFit="contain"
              unoptimized
            />

            <Box p="5">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="yellow">
                  WatchList
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  Date &bull; {release_date}
                </Box>
              </Box>
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {title}
              </Box>
            </Box>
            </Link>
          </Box>
        ))}
      </HStack>
    </Container>
  );
}

function HistoryList(){
  const { data, error } = useSWR('/api/history/historymovies', fetcher)
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
        "&::-webkit-scrollbar": {
          width: "2px",
        },
        "&::-webkit-scrollbar-track": {
          borderRadius: "5px",
        },
        "&::-webkit-scrollbar-thumb:horizontal": {
          background: "#4CBB78",
          borderRadius: "15px",
        },
      }}
    >
      <HStack spacing={10}>
        {data.map(({ id, title, release_date, poster_path }) => (
          <Box
            minW="300px"
            pos="relative"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Link href={`/movies/${id}`} passHref>
            <Image
              src={IMAGES_API + `${poster_path}`}
              alt={title}
              layout="responsive"
              width="300"
              height="450"
              objectFit="contain"
              unoptimized
            />

            <Box p="5">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="gray">
                  History
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  Date &bull; {release_date}
                </Box>
              </Box>
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {title}
              </Box>
            </Box>
            </Link>
          </Box>
        ))}
      </HStack>
    </Container>
  );
}

export default function Home() {
  return (
    <Layout title="MovieDB.gov.ru">
      <Container mb={10}>
        <Text fontSize="3xl">Popular Movies</Text>
        <Divider />
        <PopularMovies />
        <Divider />
      </Container>
      <Container mb={10}>
      <Text fontSize="3xl">WatchList</Text>
        <Divider />
        <WatchlistList />
        <Divider />
      </Container>
      <Container mb={10}>
      <Text fontSize="3xl">History</Text>
        <Divider />
        <HistoryList />
        <Divider />
      </Container>
    </Layout>
  );
}