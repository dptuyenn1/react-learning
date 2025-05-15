import { toast } from "react-toastify";

function isEmpty(object) {
  return Object.values(object).some(function (value) {
    return value === null || value === "";
  });
}

function handleValidationMessage(error) {
  const message = error.response?.data?.message || error.message;

  if (typeof message === "object")
    for (const [key, value] of Object.entries(message))
      toast.error(`${key}: ${value}`);
  else toast.error(message);
}

export { isEmpty, handleValidationMessage };
