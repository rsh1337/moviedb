import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Heading,
  Button,
  Container,
  HStack,
  Stack,
  VStack,
  Grid,
  Input
} from '@chakra-ui/react';

const MenuItem = ({ href, children, ...props }) => (
    <Link href={href} passHref>
      <Button as="a" variant="link" {...props}>
        {children}
      </Button>
    </Link>
);

function Header(){
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
              <MenuItem href="/">
                <Heading size="lg">MovieDB</Heading>
              </MenuItem>
            </HStack>
            <Stack >
                <Input 
                variant='outline' 
                focusBorderColor='Lime' 
                placeholder='Search' 
                _placeholder={{color: 'inherit', opacity: 1}}
                w="20rem"
                />

            </Stack>
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
