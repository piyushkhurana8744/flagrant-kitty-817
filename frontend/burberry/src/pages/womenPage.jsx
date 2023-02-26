import { Box, Button, Grid, Heading, HStack, Select, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Product from '../components/product'

const WomenPage = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [sort, setSort] = useState("")

    const getProducts = async () => {
        const { data } = await axios.get(`http://localhost:8080/products?category=Women&price=${sort}`);
        setProducts(data)
    }
    const changeCategory = (category) => {
        navigate(`/${category}`)
    }

    useEffect(() => {
        getProducts()
    }, [sort])

    return (
        <Box pb="50px">
            <Heading fontSize="16px">Women’S OUTERWEAR</Heading>
            <Text fontSize="14px" m="auto" maxW={["70%", "50%", "30%"]}>Embrace adventures into the unknown with the Burberry women’s outerwear collection – from heritage trench coats to puffer jackets in seasonal Night Check</Text>

            <Box mt="50px" mb="40px" borderTop="1px solid #e4e4e4" borderBottom="1px solid #e4e4e4">
                <HStack justifyContent="flex-start" fontWeight="500" textTransform="uppercase" fontSize="14px" spacing="30px" px="20px" py="10px">
                    <Select border="none" value={sort} onChange={(e) => setSort(e.target.value)} maxW="100px" placeholder='Sort'>
                        <option value='asc'>Low to High</option>
                        <option value='desc'>High to Low</option>
                    </Select>
                    <Select onChange={(e) => changeCategory(e.target.value)} border="none" maxW="150px" placeholder='Category'>
                        <option value='womens'>Womens</option>
                        <option value='mens'>Mens</option>
                        <option value='kids'>Kids</option>
                    </Select>
                </HStack>
            </Box>
            <Text fontSize="12px">{products.length} results</Text>
            <Text fontWeight="500">Discover Heritage Trench Coats</Text>
            <Grid mt="50px" mb="50px" gap="2px" gridTemplateColumns="repeat(4,1fr)">
                {
                    products.map((item) => {
                        return <Product key={item._id} {...item} />
                    })
                }
            </Grid>
            <Button textTransform="uppercase" cursor="pointer" bg="transparent" padding="12px 40px">View 11 More</Button>
        </Box>
    )
}

export default WomenPage