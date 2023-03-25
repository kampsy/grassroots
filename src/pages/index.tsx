import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import {
  Grid, GridItem, Box, VStack, Container, Button, Flex, Avatar,
  Text, SimpleGrid, ButtonGroup, Skeleton, SkeletonText, TableContainer,
  Table, Thead, Tbody, Tr, Th, Td, Link
} from '@chakra-ui/react'
import { HiHome, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { GetAnime, Media } from '@/graphql-api'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

const Home = () => {
  return (
    <>
      <Head>
        <title>Grassroots Economics Dashboard</title>
        <meta name="description" content="Take home task - Admin Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </main>
    </>
  )
}

export default Home

const Layout = () => {
  return (
    <Grid
      templateAreas={`'nav main'`}
      gridTemplateRows={'auto'}
      gridTemplateColumns={'250px auto'}
      h='100vh'
      w={'100%'}
      gap='0'
      bg='black'
      textColor={'white'}
      fontWeight='bold'
    >
      <GridItem bg={'whiteAlpha.100'} area={'nav'}>
        <Box p={4}>
          <VStack spacing={5}>
            <Box>
              <Flex alignItems={'center'} gap={4}>
                <Avatar src='https://docs.grassecon.org/assets/logo.svg' />
                <Box>
                  <Text className={inter.className} fontWeight='bold' bgClip='text' bgGradient='linear(to-r, green, blue)'>
                    Grassroots Economics
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box w={'100%'}>
              <Button w={'100%'} leftIcon={<HiHome />} colorScheme='blue' variant={'outline'}>
                Home
              </Button>
            </Box>
          </VStack>
        </Box>
      </GridItem>
      <GridItem area={'main'} bg="white" textColor={'black'} overflow='scroll'>
        <Box p={4}>
          <Container maxW={'4xl'}>
            <AnimeTable />
          </Container>
        </Box>
      </GridItem>
    </Grid>
  )
}

const AnimeTableSkeleton = () => {
  return (
    <Box>
      <SimpleGrid bg={'blackAlpha.50'} rounded='md' p={3} columns={2} spacing={2}>
        <Box>
          <SkeletonText noOfLines={21} spacing='4' skeletonHeight='4' endColor='gray.500' />
        </Box>
        <Box >
          <SkeletonText noOfLines={21} spacing='4' skeletonHeight='4' endColor='blue.500' />
        </Box>
      </SimpleGrid>
      <Box py={4}>
        <Flex justifyContent={'end'}>
          <ButtonGroup gap={2}>
            <Skeleton w={'90px'} h='40px' rounded={'md'} />
            <Skeleton w={'90px'} h='40px' rounded={'md'} />
          </ButtonGroup>
        </Flex>
      </Box>
    </Box>
  )
}

const AnimeTable = () => {
  const [page, setPage] = useState(1)
  const { data, error, isLoading } = GetAnime(page);

  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) return <AnimeTableSkeleton />

  const listAnime = data?.media?.map((media: Media) =>
    <Tr key={media?.id}>
      <Td>{media?.title?.native}</Td>
      <Td>
        <Link color={'blue.500'} href={media?.siteUrl}>
          {media?.siteUrl}
        </Link>
      </Td>
    </Tr>
  )

  return (
    <Box>
      <TableContainer bg='blackAlpha.50' p={2} border={1} borderColor='gray' rounded={'md'}>
        <Table size={'sm'} variant='unstyled'>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Link</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listAnime}
          </Tbody>
        </Table>
      </TableContainer>
      <Box py={4}>
        <Flex justifyContent={'end'}>
          <ButtonGroup gap={2}>
            <Button leftIcon={<HiChevronLeft />} colorScheme={page > 1 ? 'green' : 'gray'} variant={'ghost'} onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}>
              Previus
            </Button>
            <Button colorScheme='blue' variant={'ghost'} rightIcon={<HiChevronRight />} onClick={() => {
              setPage(page + 1)
            }}>
              Next
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </Box>
  )
}