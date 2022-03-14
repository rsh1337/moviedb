import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  VStack,
  Grid,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function SearchBar(){
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState('');

  useEffect(() => {
    setText(terms || '');
  }, [terms]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        variant="outline"
        focusBorderColor="Lime"
        placeholder="Search"
        _placeholder={{ color: "inherit", opacity: 1 }}
        w="20rem"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="green.400">
      <Container>
        <Stack
            as="nav"
            direction={["column", , "row"]}
            justify="space-between"
            wrap="wrap"
            py="1rem"
        >
          <HStack justify="space-between">
            <MenuItem href="/" mr={8}>
              <Heading size="lg">MoviesDB</Heading>
            </MenuItem>

            <Box display={['block', , 'none']} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Spacer />

          <Box display={[isOpen ? 'block' : 'none', , 'block']}>
          <SearchBar />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack align="stretch" w="full" spacing={8}>
          <Header />
          <Box as='main' h="full">
              {children}
              </Box>
        </VStack>
      </Grid>
    </>
  );
}