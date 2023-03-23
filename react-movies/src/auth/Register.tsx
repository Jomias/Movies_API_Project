import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";
import { urlAccounts } from "../endpoints";
import { authenticationResponse, userCredentials } from "../model/auth.model";
import DisplayErrors from "../utils/DisplayErrors";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const {update} = useContext(AuthenticationContext);
  const history = useHistory();

  async function register(credentials: userCredentials) {
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/register`,
        credentials
      );
      
      saveToken(response.data);
      update(getClaims());
      history.push('/');
      console.log(response);
    } catch (error: any) {
      setErrors(error.response.data.map((temp: { description: string; }) => temp.description))
    }
  }
  return (
    <>
      <h3>Register</h3>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await register(values)}
      />
    </>
  );
}
