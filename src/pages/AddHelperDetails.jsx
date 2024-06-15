import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
  Button,
  Checkbox,
  Input,
  Select,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import theme from "../config/ThemeConfig.jsx";

export default function AddHelperDetails() {
  const navigate = useNavigate();
  const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
  const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
  const [dialogMessage, setDialogMessage] = useState("");
  const [successDialogMessage, setSuccessDialogMessage] = useState("");

  const breadcrumbs = [
    { label: 'Helper', link: '/' },
    { label: 'Helper Details', link: '/' },
    { label: 'Add Helper Details', link: '/' },
  ];

  const handleSubmit = async (values) => {
    try {
      const status = values.isActive ? true : false;

      const response = await fetch('https://localhost:7265/api/HelperDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          dob: values.dob,
          nic: values.nic,
          emailAddress: values.emailAddress,
          phoneNo: values.phoneNo,
          emergencyContact: values.emergencyContact,
          bloodGroup: values.bloodGroup,
          userName: values.userName,
          password: values.password,
          status: status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add helper.');
      }

      if (data.message && data.message.toLowerCase().includes('exist')) {
        setDialogMessage('Helper already exists');
        onDialogOpen();
      } else {
        setSuccessDialogMessage('Helper added successfully.');
        onSuccessDialogOpen();
      }
    } catch (error) {
      if (error instanceof TypeError) {
        setDialogMessage('Failed to connect to the server.');
      } else {
        setDialogMessage(error.message || 'Failed to add helper.');
      }
      onDialogOpen();
    }
  };

  const handleCancel = () => {
    navigate('/app/HelperDetails');
  };

  const handleSuccessDialogClose = () => {
    onSuccessDialogClose();
    navigate('/app/HelperDetails');
  };

  return (
    <>
      <PageHeader title="Add Helper Details" breadcrumbs={breadcrumbs} />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dob: "",
          nic: "",
          emailAddress: "",
          phoneNo: "",
          emergencyContact: "",
          bloodGroup: "",
          userName: "",
          password: "",
          confirmPassword: "",
          isActive: false,
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="grid grid-cols-2 gap-10 mt-8">
            <div className="flex flex-col gap-3">
              <p>First Name</p>
              <Field name="firstName">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="text"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="First Name"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>Last Name</p>
              <Field name="lastName">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="text"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="Last Name"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>Date of Birth</p>
              <Field name="dob">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="date"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="Date of Birth"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>NIC</p>
              <Field name="nic">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="text"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="NIC"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>Email Address</p>
              <Field name="emailAddress">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="email"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="Email Address"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>Contact No</p>
              <Field name="phoneNo">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="tel"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="Contact No"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>Emergency Contact No</p>
              <Field name="emergencyContact">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="tel"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="Emergency Contact No"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>Blood Group</p>
              <Field name="bloodGroup">
                {({ field }) => (
                  <div>
                    <Select
                      {...field}
                      placeholder="Select Blood Group"
                      variant="filled"
                      borderRadius="md"
                      width="500px"
                      px={3}
                      py={2}
                      mt={1}
                      icon={<MdArrowDropDown />}
                    >
                      <option value="BloodGroup1">Blood Group 1</option>
                      <option value="BloodGroup2">Blood Group 2</option>
                      <option value="BloodGroup3">Blood Group 3</option>
                    </Select>
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>User Name</p>
              <Field name="userName">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="text"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="User Name"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>Password</p>
              <Field name="password">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="password"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="Password"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <p>Confirm Password</p>
              <Field name="confirmPassword">
                {({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="password"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      placeholder="Confirm Password"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <Field name="isActive">
                {({ field, form }) => (
                  <Checkbox
                    {...field}
                    size="lg"
                    defaultChecked={field.value}
                    onChange={e => form.setFieldValue(field.name, e.target.checked)}
                  >
                    Is Active
                  </Checkbox>
                )}
              </Field>
            </div>
            <div className="flex w-full justify-end gap-10 col-span-2">
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
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <AlertDialog isOpen={isDialogOpen} onClose={onDialogClose} motionPreset="slideInBottom">
        <AlertDialogOverlay />
        <AlertDialogContent position="absolute" top="30%" left="50%" transform="translate(-50%, -50%)">
          <AlertDialogHeader>Error</AlertDialogHeader>
          <AlertDialogBody>{dialogMessage}</AlertDialogBody>
          <AlertDialogFooter>
            <Button bg={theme.purple} color="#FFFFFF" onClick={onDialogClose}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog isOpen={isSuccessDialogOpen} onClose={handleSuccessDialogClose} motionPreset="slideInBottom">
        <AlertDialogOverlay />
        <AlertDialogContent position="absolute" top="30%" left="50%" transform="translate(-50%, -50%)">
          <AlertDialogHeader>Success</AlertDialogHeader>
          <AlertDialogBody>{successDialogMessage}</AlertDialogBody>
          <AlertDialogFooter>
            <Button bg={theme.purple} color="#FFFFFF" onClick={handleSuccessDialogClose}>Ok</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
