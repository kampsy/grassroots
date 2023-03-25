import Head from 'next/head'
import { Inter } from 'next/font/google'
import {
  Grid, GridItem, Box, VStack, Container, Button, Flex, Avatar,
  Text,
} from '@chakra-ui/react'
import { HiHome } from 'react-icons/hi'

const inter = Inter({ subsets: ['latin'] })


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
        <Layout />
      </main>
    </>
  )
}

export default Home

const Layout = () => {

  return (
    <Grid
      templateAreas={`
                  "nav main"`}
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
            hello
          </Container>
        </Box>
      </GridItem>
    </Grid>
  )
}