import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleValidationMessage, isEmpty } from "~/helpers/utils";
import useAuth from "~/hooks/useAuth";
import { authService } from "~/services";

function Register() {
  const [user] = useAuth();

  const [request, setRequest] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirm: "",
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

    setRequest(function (prev) {
      return { ...prev, [field]: value };
    });
  }

  async function handleRegister() {
    if (isEmpty(request)) {
      toast.warn("Please fill in all fields!");

      return;
    }

    if (request.password !== request.confirm) {
      toast.error("Password must match!");

      return;
    }

    try {
      const response = await authService.register(request);

      await toast.success(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      handleValidationMessage(error);
    }
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
                placeholder="Enter password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password again"
                name="confirm"
                onChange={handleInputChange}
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
