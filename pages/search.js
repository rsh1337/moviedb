import { Button } from "@chakra-ui/button";
import {
  Container,
  Text,
  VStack,
  Link,
  Badge,
  Box,
  Grid,
  GridItem,
  Stack,
  HStack,
  Heading,
} from "@chakra-ui/layout";
import { CircularProgress, Progress  } from "@chakra-ui/progress";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../components/layout";
import { Center } from "@chakra-ui/layout";
import Head from "next/head";
import { buildImageUrl } from '../utils/api';
import { Tag } from "@chakra-ui/tag";

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/{id}?`);

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
    <Stack direction={['column', 'row']} spacing={4}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <Image
          src={buildImageUrl(data.poster_path, 'w300')}
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
            <Tag colorScheme="purple" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="purple" variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        <Box>{data.overview}</Box>
      </Stack>
    </Stack>
  );
};

function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={8} py="1rem">
      {data.results.map(({ id, title, release_date }) => (
        <GridItem
          maxW="xl"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          key={id}
          align="center"
        >
          <Box minW="300px" pos="relative">
          <MovieContent />
            <Link href={`/movies/${id}`} passHref>
              <Box height="50">
                <Button
                  as="a"
                  variant="link"
                  rightIcon={<Badge>{release_date}</Badge>}
                ></Button>
                <Grid>
                <Button as="a"
                  variant="link">
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

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
