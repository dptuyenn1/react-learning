import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AUTH_REDUCER_TYPES } from "~/helpers/constants";
import { handleValidationMessage, isEmpty } from "~/helpers/utils";
import useAuth from "~/hooks/useAuth";
import { authService } from "~/services";

function Login() {
  const [user, dispatch] = useAuth();

  const [request, setRequest] = useState({
    username: "",
    password: "",
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

  async function handleLogin() {
    if (isEmpty(request)) {
      toast.warn("Please fill in all fields!");

      return;
    }

    try {
      let response = await authService.login(request);

      const {
        data: { accessToken },
      } = response;

      localStorage.setItem("accessToken", accessToken);

      response = await authService.me();

      const { data: user } = response;

      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: AUTH_REDUCER_TYPES["login"],
        payload: user,
      });
    } catch (error) {
      handleValidationMessage(error);
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
                placeholder="Enter password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mb-3">
              <Button
                variant="primary"
                type="button"
                className="w-25"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
            <Button
              variant="warning"
              type="button"
              className="w-100"
              onClick={() => navigate("/register")}
            >
              Don't have an account yet? Register now!
            </Button>
          </Form>
        </div>
      </section>

      <ToastContainer />
    </main>
  );
}

export default Login;
