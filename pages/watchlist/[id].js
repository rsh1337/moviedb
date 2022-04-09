import { Badge, Box, Center, Container, Heading, HStack, Stack, Text, Link} from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { Tag } from "@chakra-ui/tag";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/layout";
import { buildImageUrl, fetcher } from '../../utils/api';
import HistoryButton from '../../components/HistoryButton';
import WatchlistButton from "../../components/WatchlistButton";

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <Stack direction={["column", "row"]} spacing={4}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <HistoryButton />
        </HStack>
        <HStack pos="absolute" zIndex={1} top={2} left={2}>
          <WatchlistButton />
        </HStack>
        <Image
          src={buildImageUrl(data.poster_path, "w300")}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          unoptimized
        />
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}</Heading>
          <Box>
            <Tag colorScheme="green" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="green" variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        <Box>{data.overview}</Box>
      </Stack>
    </Stack>
  );
};

function SimilarMovies(){
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/similar/${id}`);
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
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          borderRadius: "15px",
        },
        "&::-webkit-scrollbar-thumb:horizontal": {
          background: "#4CBB78",
          borderRadius: "15px",
        },
      }}
    >
      <HStack spacing={10}>
        {data.results.map(({ id, title, release_date, poster_path }) => (
          <Box key={id}
            minW="200px"
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

            <Box p="3">
              <Box display="flex" alignItems="baseline">
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

export default function Movie() {
  return (
    <Layout>
      <Container mb={20}>
        <MovieContent />
      </Container>
      <Container mb={10}>
        <Text fontSize="3xl">Similar Movies</Text>
        <SimilarMovies />
      </Container>
    </Layout>
  );
}
