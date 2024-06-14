import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import theme from "../config/ThemeConfig.jsx";
import axios from "axios";

export default function AddAccidentDetails() {
  const navigate = useNavigate();
  const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
  const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
  const [dialogMessage, setDialogMessage] = useState("");
  const [successDialogMessage, setSuccessDialogMessage] = useState("");

  const breadcrumbs = [
    { label: 'Accident', link: '/' },
    { label: 'Accident Details', link: '/app/AccidentDetails' },
    { label: 'Add Accident Details', link: '/app/AddAccidentDetails' },
  ];

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://localhost:7265/api/Accidents', values);

      if (!response.data.ok) {
        throw new Error(response.data.message || 'Failed to add accident details.');
      }

      setSuccessDialogMessage('Accident details added successfully.');
      onSuccessDialogOpen();
    } catch (error) {
      setDialogMessage(error.message || 'Failed to add accident details.');
      onDialogOpen();
    }
  };

  const handleCancel = () => {
    navigate('/app/AccidentDetails');
  };

  const handleSuccessDialogClose = () => {
    onSuccessDialogClose();
    navigate('/app/AccidentDetails');
  };

  return (
    <>
      <PageHeader title="Add Accident Details" breadcrumbs={breadcrumbs} />
      <Formik
        initialValues={{
          date: "",
          location: "",
          vehicleRegistrationNo: "",
          driversNIC: "",
          helpersNIC: "",
          loss: 0,
          specialNotes: "",
          driverInjured: false,
          helperInjured: false,
          vehicleDamaged: false,
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="grid gap-10 mt-8">
            <Tabs position="relative" variant="unstyled">
              <TabList>
                <Tab>Accident Details</Tab>
                <Tab>Upload Photos</Tab>
              </TabList>
              <TabIndicator mt="-1.5px" height="2px" bg="#5858af" borderRadius="1px" />
              <TabPanels>
                <TabPanel>
                  <div className="grid grid-cols-2 gap-10 mt-8">
                    <Field name="date">
                      {({ field }) => (
                        <div className="flex flex-col gap-3">
                          <p>Date</p>
                          <Input
                            {...field}
                            type="date"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Date"
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="location">
                      {({ field }) => (
                        <div className="flex flex-col gap-3">
                          <p>Location</p>
                          <Input
                            {...field}
                            type="text"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Location"
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="vehicleRegistrationNo">
                      {({ field }) => (
                        <div className="flex flex-col gap-3">
                          <p>Vehicle Registration No</p>
                          <Input
                            {...field}
                            type="text"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Vehicle Registration No"
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="driversNIC">
                      {({ field }) => (
                        <div className="flex flex-col gap-3">
                          <p>Driver's NIC</p>
                          <Input
                            {...field}
                            type="text"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Driver's NIC"
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="helpersNIC">
                      {({ field }) => (
                        <div className="flex flex-col gap-3">
                          <p>Helper's NIC</p>
                          <Input
                            {...field}
                            type="text"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Helper's NIC"
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="loss">
                      {({ field }) => (
                        <div className="flex flex-col gap-3">
                          <p>Loss</p>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            variant="filled"
                            borderRadius="md"
                            width="500px"
                            px={3}
                            py={2}
                            mt={1}
                            placeholder="Loss"
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="specialNotes">
                      {({ field }) => (
                        <div className="flex flex-col gap-3">
                          <p>Special Notes</p>
                          <Textarea
                            {...field}
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Special Notes"
                          />
                        </div>
                      )}
                    </Field>
                    <div className="flex gap-7">
                      <Field name="driverInjured">
                        {({ field }) => (
                          <Checkbox {...field} size="lg" isChecked={field.value}>
                            Driver Injured
                          </Checkbox>
                        )}
                      </Field>
                      <Field name="helperInjured">
                        {({ field }) => (
                          <Checkbox {...field} size="lg" isChecked={field.value}>
                            Helper Injured
                          </Checkbox>
                        )}
                      </Field>
                      <Field name="vehicleDamaged">
                        {({ field }) => (
                          <Checkbox {...field} size="lg" isChecked={field.value}>
                            Vehicle Damaged
                          </Checkbox>
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="flex w-5/6 justify-end gap-10">
                    <Button
                      bg="gray.400"
                      _hover={{ bg: "gray.500" }}
                      color="#ffffff"
                      variant="solid"
                      w="230px"
                      marginTop="10"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg={theme.purple}
                      _hover={{ bg: theme.onHoverPurple }}
                      color="#ffffff"
                      variant="solid"
                      w="230px"
                      marginTop="10"
                      type="submit"
                    >
                      Next
                    </Button>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="flex flex-row items-start space-x-4 w-full">
                    <Box
                      bg="#F3F5FA"
                      p={4}
                      borderRadius="md"
                      width="800px"
                      height="400px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <HStack spacing={7}>
                        <FaImage size={80} color="#393970" />
                        <FaImage size={80} color="#393970" />
                        <FaImage size={80} color="#393970" />
                        <FaImage size={80} color="#393970" />
                        <FaImage size={80} color="#393970" />
                      </HStack>
                      <Link className="mt-7" to="#">
                        Upload Maximum 5 Photos
                      </Link>
                    </Box>
                  </div>
                  <div className="flex w-4/5 justify-end gap-10">
                    <Button
                      bg="gray.400"
                      _hover={{ bg: "gray.500" }}
                      color="#ffffff"
                      variant="solid"
                      w="230px"
                      marginTop="10"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg={theme.purple}
                      _hover={{ bg: theme.onHoverPurple }}
                      color="#ffffff"
                      variant="solid"
                      w="230px"
                      marginTop="10"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Form>
        )}
      </Formik>
      <AlertDialog isOpen={isDialogOpen} onClose={onDialogClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Error</AlertDialogHeader>
            <AlertDialogBody>{dialogMessage}</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDialogClose}>Close</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog isOpen={isSuccessDialogOpen} onClose={handleSuccessDialogClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Success</AlertDialogHeader>
            <AlertDialogBody>{successDialogMessage}</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleSuccessDialogClose}>Close</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
