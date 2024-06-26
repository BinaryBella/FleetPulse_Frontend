import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
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

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  nic: Yup.string()
    .required("NIC is required")
    .min(10, "NIC must be at least 10 characters")
    .max(12, "NIC cannot be more than 12 characters"),
  emailAddress: Yup.string()
    .required("Email Address is required")
    .email("Invalid email address"),
  phoneNo: Yup.string()
    .required("Contact No is required")
    .matches(/^[0-9]{10}$/, "Contact No must be exactly 10 digits"),
  emergencyContact: Yup.string()
    .required("Emergency Contact No is required")
    .matches(/^[0-9]{10}$/, "Emergency Contact No must be exactly 10 digits"),
  bloodGroup: Yup.string()
    .required("Blood Group is required"),
  userName: Yup.string()
    .required("User Name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref('password'), null], "Passwords must match"),
  isActive: Yup.boolean(),
});

export default function AddHelperDetails() {
  const navigate = useNavigate();
  const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
  const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
  const [dialogMessage, setDialogMessage] = useState("");
  const [successDialogMessage, setSuccessDialogMessage] = useState("");

  const breadcrumbs = [
    { label: 'Helper', link: '/' },
    { label: 'Helper Details', link: '/app/HelperDetails' },
    { label: 'Add Helper Details', link: '/app/HelperDetails' },
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
        validationSchema={validationSchema}
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
                      id="firstName"
                      placeholder="First Name"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="text-red-500">{errors.firstName}</div>
                    ) : null}
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
                      id="lastName"
                      placeholder="Last Name"
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="text-red-500">{errors.lastName}</div>
                    ) : null}
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
                      id="dob"
                      placeholder="Date of Birth"
                    />
                    {errors.dob && touched.dob ? (
                      <div className="text-red-500">{errors.dob}</div>
                    ) : null}
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
                      id="nic"
                      placeholder="NIC No"
                    />
                    {errors.nic && touched.nic ? (
                      <div className="text-red-500">{errors.nic}</div>
                    ) : null}
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
                      id="emailAddress"
                      placeholder="Email Address"
                    />
                    {errors.emailAddress && touched.emailAddress ? (
                      <div className="text-red-500">{errors.emailAddress}</div>
                    ) : null}
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
                      id="phoneNo"
                      placeholder="Contact No"
                    />
                    {errors.phoneNo && touched.phoneNo ? (
                      <div className="text-red-500">{errors.phoneNo}</div>
                    ) : null}
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
                      id="emergencyContact"
                      placeholder="Emergency Contact No"
                    />
                    {errors.emergencyContact && touched.emergencyContact ? (
                      <div className="text-red-500">{errors.emergencyContact}</div>
                    ) : null}
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
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O+">O+</option>
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                      <option value="AB-">AB-</option>
                      <option value="O-">O-</option>
                    </Select>
                    {errors.bloodGroup && touched.bloodGroup ? (
                      <div className="text-red-500">{errors.bloodGroup}</div>
                    ) : null}
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
                      id="userName"
                      placeholder="User Name"
                    />
                    {errors.userName && touched.userName ? (
                      <div className="text-red-500">{errors.userName}</div>
                    ) : null}
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
                      id="password"
                      placeholder="Password"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-500">{errors.password}</div>
                    ) : null}
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
                      id="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="text-red-500">{errors.confirmPassword}</div>
                    ) : null}
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
