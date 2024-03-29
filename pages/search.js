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
} from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../components/layout";
import Image from "next/image";

function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);
  const IMAGES_API = "https://image.tmdb.org/t/p/w300/";

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
