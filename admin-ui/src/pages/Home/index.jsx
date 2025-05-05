import { AUTH_REDUCER_TYPES } from "@/helpers/constants";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
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

  return (
    <main>
      <section className="d-flex flex-column align-items-center gap-3 py-3">
        <h1>Home page</h1>

        <div className="shadow-lg p-3 mb-5 bg-body rounded w-50">
          <div className="d-flex justify-content-center gap-3">
            <Button variant="warning">Fetch API</Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
