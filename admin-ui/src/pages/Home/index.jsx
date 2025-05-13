import { AUTH_REDUCER_TYPES } from "~/helpers/constants";
import useAuth from "~/hooks/useAuth";
import { mockService } from "~/services";
import { useEffect, useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  let [user, dispatch] = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  function handleLogout() {
    dispatch({
      type: AUTH_REDUCER_TYPES["logout"],
    });
  }

  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  async function handleFetchAPI() {
    const response = await mockService.hello();

    setMessage(response);
    setShowToast(true);
  }

  return (
    <main>
      <section className="d-flex flex-column align-items-center gap-3 py-3">
        <h1>Home page</h1>

        <div className="shadow-lg p-3 mb-5 bg-body rounded w-50">
          <div className="d-flex justify-content-center gap-3">
            <Button variant="warning" onClick={handleFetchAPI}>
              Fetch API
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
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
            <strong className="me-auto text-success">Message</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </main>
  );
}

export default Home;
