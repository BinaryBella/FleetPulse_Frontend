import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
  Button,
  Checkbox,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import * as Yup from "yup";

export default function AddStaffDetails() {
  const navigate = useNavigate();
  const {
    isOpen: isDialogOpen,
    onOpen: onDialogOpen,
    onClose: onDialogClose,
  } = useDisclosure();
  const [dialogMessage, setDialogMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    UserName: "",
    FirstName: "",
    LastName: "",
    NIC: "",
    DateOfBirth: "",
    PhoneNo: "",
    EmailAddress: "",
    ProfilePicture: "",
    EmergencyContact: "",
    JobTitle: "",
    Status: true,
    Password: "",
    confirmPassword: "",
  });

  const breadcrumbs = [
    { label: "Staff", link: "/" },
    { label: "Staff Details", link: "/app/StaffDetails" },
    { label: "Add Staff Details", link: "/app/AddStaffDetails" },
  ];

  useEffect(() => {
    // Simulated fetch function; replace with actual API call
    const fetchStaffData = async () => {
      setIsLoading(true);
      try {
        // Replace with your API endpoint
        const response = await fetch("https://localhost:7265/api/Staff");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setInitialValues({
          FirstName: data.firstName,
          LastName: data.lastName,
          NIC: data.nic,
          DateOfBirth: data.dateOfBirth,
          PhoneNo: data.phoneNo,
          EmailAddress: data.emailAddress,
          UserName: data.userName,
          EmergencyContact: data.emergencyContact,
          JobTitle: data.jobTitle,
          Status: data.status,
          Password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or show an error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  const validationSchema = Yup.object({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    NIC: Yup.string().required("National Identity Card No is required"),
    DateOfBirth: Yup.date().required("Date of Birth is required"),
    PhoneNo: Yup.string().required("Contact Number is required"),
    EmailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    UserName: Yup.string().required("Username is required"),
    EmergencyContact: Yup.string().required("Emergency Contact No is required"),
    JobTitle: Yup.string().required("Job Title is required"),
    Status: Yup.boolean().required("Status is required"),
    Password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch('https://localhost:7265/api/Staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        const data = await response.json();
        setDialogMessage("Staff details saved successfully.");
        onDialogOpen();
        actions.resetForm();
      } else {
        setDialogMessage("Failed to save staff details.");
        onDialogOpen();
      }
    } catch (error) {
      setDialogMessage("Failed to save staff details.");
      onDialogOpen();
    }
  };

  const handleCancel = () => {
    navigate("/app/StaffDetails");
  };

  return (
    <>
      <PageHeader title="Add Staff Details" breadcrumbs={breadcrumbs} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="grid grid-cols-2 gap-10 mt-8">
              
              <div className="flex flex-col gap-3">
                <p>First Name</p>
                <Field name="FirstName">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="FirstName"
                      placeholder="First Name"
                    />
                  )}
                </Field>
                {errors.FirstName && touched.FirstName && (
                  <div className="text-red-500">{errors.FirstName}</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p>Last Name</p>
                <Field name="LastName">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="LastName"
                      placeholder="Last Name"
                    />
                  )}
                </Field>
                {errors.LastName && touched.LastName && (
                  <div className="text-red-500">{errors.LastName}</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p>National Identity Card No</p>
                <Field name="NIC">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="NIC"
                      placeholder="NIC No"
                    />
                  )}
                </Field>
                {errors.NIC && touched.NIC && (
                  <div className="text-red-500">{errors.NIC}</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p>Date of Birth</p>
                <Field name="DateOfBirth">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="DateOfBirth"
                      placeholder="Date of Birth"
                    />
                  )}
                </Field>
                {errors.DateOfBirth && touched.DateOfBirth && (
                  <div className="text-red-500">{errors.DateOfBirth}</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p>Email Address</p>
                <Field name="EmailAddress">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="EmailAddress"
                      placeholder="Email Address"
                    />
                  )}
                </Field>
                {errors.EmailAddress && touched.EmailAddress && (
                  <div className="text-red-500">{errors.EmailAddress}</div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <p>Username</p>
                <Field name="UserName">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="UserName"
                      placeholder="Username"
                    />
                  )}
                </Field>
                {errors.UserName && touched.UserName && (
                  <div className="text-red-500">{errors.UserName}</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p>Contact Number</p>
                <Field name="PhoneNo">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="tel"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="PhoneNo"
                      placeholder="Contact Number"
                    />
                  )}
                </Field>
                {errors.PhoneNo && touched.PhoneNo && (
                  <div className="text-red-500">{errors.PhoneNo}</div>
                )}
              </div>
              
              <div className="flex flex-col gap-3">
                <p>Emergency Contact No</p>
                <Field name="EmergencyContact">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="tel"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="EmergencyContact"
                      placeholder="Emergency Contact No"
                    />
                  )}
                </Field>
                {errors.EmergencyContact && touched.EmergencyContact && (
                  <div className="text-red-500">{errors.EmergencyContact}</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p>Job Title</p>
                <Field name="JobTitle">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="JobTitle"
                      placeholder="Job Title"
                    />
                  )}
                </Field>
                {errors.JobTitle && touched.JobTitle && (
                  <div className="text-red-500">{errors.JobTitle}</div>
                )}
              </div>
              
              <div className="flex flex-col gap-3">
                <p>Password</p>
                <Field name="Password">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="Password"
                      placeholder="Password"
                    />
                  )}
                </Field>
                {errors.Password && touched.Password && (
                  <div className="text-red-500">{errors.Password}</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p>Confirm Password</p>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      width="500px"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                    />
                  )}
                </Field>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500">{errors.confirmPassword}</div>
                )}
              </div>

              <div className="flex flex-col gap-20">
                <p>Status</p>
                <Field name="Status" type="checkbox">
                  {({ field }) => (
                    <Checkbox
                      {...field}
                      variant="filled"
                      borderRadius="md"
                      px={3}
                      py={2}
                      mt={1}
                      id="Status"
                      isChecked={field.value}
                    >
                      Active
                    </Checkbox>
                  )}
                </Field>
                {errors.Status && touched.Status && (
                  <div className="text-red-500">{errors.Status}</div>
                )}
              </div>
              <div className="flex justify-end gap-4 col-span-2">
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
      )}
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={undefined}
        onClose={onDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
             Success
            </AlertDialogHeader>
            <AlertDialogBody>{dialogMessage}</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDialogClose}>OK</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
