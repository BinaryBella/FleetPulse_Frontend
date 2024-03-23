import PageHeader from "../components/PageHeader";
import theme from "../config/ThemeConfig.jsx";
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
  MenuItem,
} from "@chakra-ui/react";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function DriverDetails() {
  const breadcrumbs = [
    { label: "Driver", link: "/app/Driver" },
    { label: "Driver Details", link: "/app/DriverDetails" },
    { label: "Add Driver Details", link: "/app/AddDriverDetails" },
  ];

  return (
    <>
      <PageHeader title="Driver Details" breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-2 gap-10 mt-8">
        <Button
          as={Link} // Use Link from react-router-dom instead of a regular button
          to="/app/AddDriver" // Specify the correct route for adding a new driver
          bg={theme.purple}
          _hover={{ bg: theme.onHoverPurple }}
          color="white"
          variant="solid"
          right="0"
          position="absolute"
          mr="20px"
        >
          Add New Driver
        </Button>

        <Table className="custom-table">
          <Thead>
            <Tr>
              <Th>Reg No</Th>
              <Th>License Exp Date</Th>
              <Th>Model</Th>
              <Th>Manufacture</Th>
              <Th>Type</Th>
              <Th>Fuel Type</Th>
              <Th>Color</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>DEF456</Td>
              <Td>2025-06-30</Td>
              <Td>Model S</Td>
              <Td>Tesla</Td>
              <Td>PQR789</Td>
              <Td>Electric</Td>
              <Td>Blue</Td>
              <Td>false</Td>
              <Td>
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
                      <Link to="/app/EditDriver">Edit</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/app/InactiveDriver">Inactive</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </>
  );
}

export default DriverDetails;
