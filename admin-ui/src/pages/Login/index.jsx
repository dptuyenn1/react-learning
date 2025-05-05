import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { isEmpty } from "@/helpers/utils";
import axios, { authAPI } from "@/configs/axios";
import { AUTH_REDUCER_TYPES, END_POINTS } from "@/helpers/constants";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

function Login() {
  const [user, dispatch] = useAuth();

  const [loginRequest, setLoginRequest] = useState({
    username: "",
    password: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  function handleInputChange(event) {
    const field = event.target.name;
    const value = event.target.value;

    setLoginRequest((prev) => {
      return { ...prev, [field]: value };
    });
  }

  async function handleLogin() {
    if (isEmpty(loginRequest)) {
      setError("Please fill in all fields!");
      setShowToast(true);

      return;
    }

    try {
      let response = await axios.post(END_POINTS["login"], loginRequest);

      const {
        data: { accessToken },
      } = response;

      localStorage.setItem("accessToken", accessToken);

      response = await authAPI().get(END_POINTS["me"]);

      const { data: user } = response;

      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: AUTH_REDUCER_TYPES["login"],
        payload: user,
      });
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setShowToast(true);
    }
  }

  return (
    <main>
      <section className="d-flex flex-column align-items-center gap-3 py-3">
        <h1>Login page</h1>

        <div className="shadow-lg p-3 mb-5 bg-body rounded w-50">
          <Form>
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
            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                type="button"
                className="w-25"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </section>

      <ToastContainer position="top-end" className="mt-3 me-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto text-danger">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </ToastContainer>
    </main>
  );
}

export default Login;
