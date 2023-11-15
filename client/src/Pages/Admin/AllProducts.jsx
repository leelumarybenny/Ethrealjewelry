import React from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { baseUrl } from "../../Utils/BaseUrl";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [productss, setProductss] = useState([]);
  const [productsss, setProductsss] = useState([]);
  const [productName, setProductName] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [iamgeUrl, setImage] = useState("");

  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [ctr, setCtr] = useState("");
  let r = `${localStorage.getItem("adminToken")}`;

  const getData = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/products`, {
        headers: {
          Authorization: `Bearer ${r}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setProducts(res.data);
      });
  };

  useEffect(() => {
    getData();
    listAllCategories();
  }, []);

  const handleDelete = (prodid) => {
    axios
      .delete(`${baseUrl}/delete-product?productId=${prodid}`, {
        headers: {
          Authorization: `Bearer ${r}`,
        },
      })
      .then((res) => {
        alert("Product Deleted");
        getData();
      });
  };

  const handleAdd = () => {
    const payload = {
      productName,
      sale_price: Number(salePrice),
      market_price: Number(listPrice),
      category: category,
      specification: description,
      quantity: "50",
      imageUrl: iamgeUrl,
    };
    console.log(payload);
    axios
      .post(`${baseUrl}/add-product`, payload, {
        headers: {
          authorization: `Bearer ${r}`,
        },
      })
      .then((res) => {
        alert("Product added");
        getData();
      });
  };

  const addcategory = () => {
    const cat = prompt("Enter Category");
    axios
      .post(
        `${baseUrl}/products/category`,
        { category: cat },
        {
          headers: {
            Authorization: `Bearer ${r}`,
          },
        }
      )
      .then((res) => {
        // console.log(res)
        alert("Category added");
      })
      .catch((err) => {
        if (err.response.message == null) {
          alert("Something went wrong");
        } else {
          alert(err.response.message);
        }
      });
  };

  const listAllCategories = () => {
    axios
      .get(`${baseUrl}/products/categories`, {
        headers: {
          Authorization: `Bearer ${r}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        if (err.response.message == null) {
          alert("Something went wrong");
        } else {
          alert(err.response.message);
        }
      });
  };

  return (
    <Box>
      <Flex
        mb="30px"
        direction={["column", "column", "row"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="bold" pb={5}>
          All Products : {products.length}
        </Text>
        <Flex gap={5}>
          <Button bg="white" border="1px solid grey" onClick={onOpen}>
            + Add Product
          </Button>
          <Button bg="white" border="1px solid grey" onClick={addcategory}>
            + Add Category
          </Button>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody mt="-8">
            <Flex direction="column" gap="10px" mt="50px">
              <label>Product Name</label>
              <Input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <label>Sale Price</label>
              <Input
                type="text"
                placeholder="Sale Price"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
              <label>List Price</label>
              <Input
                type="text"
                placeholder="List Price"
                value={listPrice}
                onChange={(e) => setListPrice(e.target.value)}
              />
              <label>Image Url</label>
              <Input
                type="text"
                placeholder="Image url"
                value={iamgeUrl}
                onChange={(e) => setImage(e.target.value)}
              />
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
             
              <label>Descripition</label>
              <Input
                type="text"
                placeholder="Descripition"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                onClick={handleAdd}
                mb="25px"
                color="white"
                bg="black"
                _hover={{ bg: "grey" }}
              >
                Add
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* ..................  All Product UI Table Here ........................ */}

      <Table>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th className="productRow2">Name</Th>
            <Th className="productRow">Price</Th>
            <Th className="productRow">Remove</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody id="product_tbody">
          {/* ................... Loading Functionallity Here .................. */}

          {loading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              ml={200}
              mt={50}
            />
          )}
          {products &&
            products.map((ele) => {
              return (
                <Tr key={ele.productId}>
                  <Td width="60px">
                    <Image src={ele.imageUrl} />
                  </Td>
                  <Td width="30%" padding="5px" className="productRow2">
                    <p fontSize={15}>{ele.productName}</p>
                  </Td>
                  <Td width="20px" paddding-right="20px" className="productRow">
                    <p>₹{ele.sale_price}</p>
                  </Td>
                  <Td
                    fontSize="25px"
                    className="productRow"
                    _hover={{ color: "red", cursor: "pointer" }}
                  >
                    <DeleteIcon onClick={() => handleDelete(ele._id)} />
                  </Td>
                  <Td w="20%">
                    <Text>{ele.specification}</Text>
                  </Td>
                </Tr>
              );
            })}
          {productss &&
            productss.map((ele) => {
              return (
                <Tr key={ele.productId}>
                  <Td width="60px">
                    <Image src={ele.imageUrl[0]} />
                  </Td>
                  <Td width="30%" padding="5px" className="productRow2">
                    <p fontSize={15}>{ele.productName}</p>
                  </Td>
                  <Td width="20px" paddding-right="20px" className="productRow">
                    <p>₹{ele.sale_price}</p>
                  </Td>
                  <Td
                    fontSize="25px"
                    className="productRow"
                    _hover={{ color: "red", cursor: "pointer" }}
                  >
                    <DeleteIcon onClick={() => handleDelete(ele.productId)} />
                  </Td>
                  <Td w="20%">
                    <Text>{ele.specification}</Text>
                  </Td>
                </Tr>
              );
            })}
          {productsss &&
            productsss.map((ele) => {
              return (
                <Tr key={ele.productId}>
                  <Td width="60px">
                    <Image src={ele.imageUrl[0]} />
                  </Td>
                  <Td width="30%" padding="5px" className="productRow2">
                    <p fontSize={15}>{ele.productName}</p>
                  </Td>
                  <Td width="20px" paddding-right="20px" className="productRow">
                    <p>₹{ele.sale_price}</p>
                  </Td>
                  <Td
                    fontSize="25px"
                    className="productRow"
                    _hover={{ color: "red", cursor: "pointer" }}
                  >
                    <DeleteIcon onClick={() => handleDelete(ele.productId)} />
                  </Td>
                  <Td w="20%">
                    <Text>{ele.specification}</Text>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AllProducts;





