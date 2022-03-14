import { Button } from "@chakra-ui/button";
import { Container, ListItem, Text, UnorderedList, VStack, Link, Badge } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../components/layout";

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
    <UnorderedList stylePosition="inside">
      {data.results.map(({ id, title, release_date }) => (
        <ListItem key={id}>
          <Link href={`/movies/${id}`} passHref>
            <Button
              as="a"
              variant="link"
              rightIcon={<Badge>{release_date}</Badge>}
            >
              <Text as="span">{title} </Text>
            </Button>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
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
