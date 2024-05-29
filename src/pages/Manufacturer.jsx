import  { useState, useEffect } from "react";
//import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem, InputGroup, InputLeftElement, Input, Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import {IoSearchOutline, IoSettingsSharp} from "react-icons/io5";

export default function Manufacturer() {
  const [manufacturerDetails, setManufacturerDetails] = useState([]);
  const [error, setError] = useState(null);

  // Dummy data for manufacturers
  const dummyManufacturers = [
    { id: 1, name: "Toyota", status: true },
    { id: 2, name: "Honda", status: true },
    { id: 3, name: "Ford", status: false },
    { id: 4, name: "Chevrolet", status: true },
    { id: 5, name: "BMW", status: false },
  ];

  useEffect(() => {
    // Simulate API call with dummy data
    // axios.get('https://localhost:7265/api/Manufacturer')
    // .then((res)=>{
    //    setManufacturerDetails(res.data)
    // })
    // .catch((er)=>{
    //    setError(er.message)
    // })

    // Use dummy data for this example
    setManufacturerDetails(dummyManufacturers);
  }, []);

  const breadcrumbs = [
    { label: "Manufacturer", link: "/" },
    { label: "Manufacturer Type", link: "/app/Manufacturer Type" },
    { label: "Add Manufacturer Type Details", link: "/app/AddManufactureDetails" },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <>
        <PageHeader title="Manufacturer Details" breadcrumbs={breadcrumbs} />

        <Box mb="20px" mt="50px" display="flex" alignItems="center" gap="20px" marginTop="60px" marginBottom="10px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IoSearchOutline />
            </InputLeftElement>
            <Input
                placeholder="Search"
                variant="filled"
                width="250px"
            />
          </InputGroup>
          <Link to="/app/AddManufactureDetails">
            <Button
                bg={theme.purple}
                _hover={{ bg: theme.onHoverPurple }}
                color="white"
                variant="solid"
                w="260px"
                mr="60px"
            >
              Add Vehicle Type
            </Button>
          </Link>
        </Box>
        <Table className="custom-table" mt="20px">
          <Thead>
            <Tr>
              <Th sx={{ textAlign: "center" }}>Manufacturer Name</Th>
              <Th sx={{ textAlign: "center" }}>Status</Th>
              <Th sx={{ textAlign: "center" }}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {manufacturerDetails.map((manufacturer) => (
                <Tr key={manufacturer.id}>
                  <Td sx={{ textAlign: "center" }}>{manufacturer.name}</Td>
                  <Td sx={{ textAlign: "center" }}>{manufacturer.status ? "Active" : "Inactive"}</Td>
                  <Td sx={{ textAlign: "center" }}>
                    <Menu>
                      <MenuButton
                          color={theme.purple}
                          as={IconButton}
                          aria-label="profile-options"
                          fontSize="20px"
                          icon={<IoSettingsSharp />}
                      />
                      <MenuList>
                        <MenuItem>
                          <Link to={'/app/EditManufacturerTypeDetails'}>Edit</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="">Inactive</Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
            ))}
          </Tbody>
        </Table>
      </>
  );
}
