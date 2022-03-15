import { Grid } from "@chakra-ui/react";

const Movie = ({ index, overview, poster_path, id, title, release_date }) => {
  const IMAGES_API = "https://image.tmdb.org/t/p/w300/";

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={8} py="1rem" key={index}>
      <GridItem
        maxW="xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        key={id}
        align="center"
      >
        <Box minW="300px" pos="relative">
          <Box minW="300px" pos="relative">
            <Image
              src={IMAGES_API + poster_path}
              alt={title}
              layout="responsive"
              width="300"
              height="450"
              objectFit="contain"
              unoptimized
            />
          </Box>
          <Link href={`/movies/${id}`} passHref>
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
    </Grid>
  );
};

export default Movie;
