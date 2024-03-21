import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import { signInFailure, signInLoading, signInSuccess } from "../store";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useState } from "react";
import OAuth from "./OAuth";

export default function SignInForm() {
  const { isLoading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill the all fields"));
      return;
    }
    try {
      dispatch(signInLoading());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
        return;
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
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
            placeholder="*************"
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
              <Spinner size="sm" /> <span className="pl-3">Signing In</span>
            </>
          ) : (
            "Sign In"
          )}
        </Button>
        <OAuth />
      </form>
      <div className="flex text-sm mt-5 gap-1">
        <span>Don't have an account?</span>
        <Link className=" text-teal-500" to="/sign-up">
          Sign Up
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
