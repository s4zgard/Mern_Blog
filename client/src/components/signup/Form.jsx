import { Link, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import OAuth from "../OAuth";

export default function Form() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill the all fields");
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      !data.success && setErrorMessage(data.message);
      res.ok && navigate("/sign-in");
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <div>
          <Label value="Username" className="font-bold" />
          <TextInput
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <Label value="Email" className="font-bold" />
          <TextInput
            type="email"
            placeholder="name@domain.com"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <Label value="Password" className="font-bold" />
          <TextInput
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <Button
          disabled={isLoading}
          gradientDuoTone="purpleToPink"
          type="submit"
        >
          {isLoading ? (
            <>
              <Spinner size="sm" /> <span className="pl-3">Signing Up</span>
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
        <OAuth />
      </form>
      <div className="flex text-sm mt-5 gap-1">
        <span>Have an account?</span>
        <Link className=" text-teal-500" to="/sign-in">
          Sign In
        </Link>
      </div>
      {errorMessage && (
        <Alert
          onDismiss={() => setErrorMessage(null)}
          icon={HiInformationCircle}
          className="mt-5"
          color="failure"
        >
          {errorMessage}
        </Alert>
      )}
    </>
  );
}
