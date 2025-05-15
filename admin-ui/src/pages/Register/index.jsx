import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { ROLES } from "~/helpers/constants";
import { isEmpty } from "~/helpers/utils";
import useAuth from "~/hooks/useAuth";
import { authService } from "~/services";

function Register() {
  const [user] = useAuth();

  const [registerRequest, setRegisterRequest] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    roles: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  function handleInputChange(event) {
    const field = event.target.name;
    const value = event.target.value;

    setRegisterRequest(function (prev) {
      return { ...prev, [field]: value };
    });
  }

  async function handleRegister() {
    // eslint-disable-next-line no-unused-vars
    const { roles, ...rest } = registerRequest;

    if (isEmpty(rest)) {
      toast.warn("Please fill in all fields!");

      return;
    }

    try {
      await authService.register(registerRequest);

      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || error.message;

      if (typeof message === "object")
        for (const [key, value] of Object.entries(message))
          toast.error(`${key}: ${value}`);
      else toast.error(message);
    }
  }

  function handleRoleChange(roles) {
    setRegisterRequest(function (prev) {
      return { ...prev, roles: roles.map((role) => role.value) };
    });
  }

  return (
    <main>
      <section className="d-flex flex-column align-items-center gap-3 py-3">
        <h1>Register page</h1>

        <div className="shadow-lg p-3 mb-5 bg-body rounded w-50">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Roles</Form.Label>
              <Select
                defaultValue={ROLES[0]}
                isMulti
                options={ROLES}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleRoleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mb-3">
              <Button
                variant="primary"
                type="button"
                className="w-25"
                onClick={handleRegister}
              >
                Register
              </Button>
            </div>
            <Button
              variant="warning"
              type="button"
              className="w-100"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login now!
            </Button>
          </Form>
        </div>
      </section>

      <ToastContainer />
    </main>
  );
}

export default Register;
