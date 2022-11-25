import axios from "axios";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
export default function CodeVerification({
  code,
  setCode,
  error,
  setError,
  setVisible,
  userInfo,
}) {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min("5", "Code must be 5 characters.")
      .max("5", "Code must be 5 characters."),
  });
  const { email } = userInfo;
  console.log(email);
  const verifyCode = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/verifyCode`, {
        email,
        code,
      });
      setVisible(3);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form">
      <div className="reset_form_header">Code verification</div>
      <div className="reset_form_text">
        Please enter code that been sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={validateCode}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button
                type="submit"
                className="blue_btn"
                onClick={() => {
                  verifyCode();
                }}
              >
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
