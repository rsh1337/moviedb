import { Badge, Box, Center, Container, Heading, HStack, Stack, Text} from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { Tag } from "@chakra-ui/tag";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/layout";
import { buildImageUrl } from '../../utils/api';

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

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}
