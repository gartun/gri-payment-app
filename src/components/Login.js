import { Formik, Form } from "formik";
import * as Yup from "yup";

import { MyField } from "../components/MyFields";
import shouldDisable from "../helpers/shouldDisable";

const Login = ({ setTokens }) => {
  const handleSubmit = async (values, setSubmitting) => {
    const body = {
      data: {
        attributes: {
          grant_type: "password",
          login: values.email,
          auth: values.pwd,
        },
      },
    };

    try {
      const res = await fetch("https://tahsilat.grilabs.net/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const { access_token, expires_in, refresh_token } = await res.json();

        setTokens(access_token, expires_in, refresh_token);

        alert("Giriş başarılı...");
      } else {
        alert("Girilen bilgilerin doğruluğundan emin olun");
      }
    } catch (err) {
      alert("Bir hata oluştu");
    }
  };

  const initVals = {
    email: "",
    pwd: "",
  };

  const vSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli bir email adresi girin")
      .required("Bu alanı boş bırakamazsınız"),
    pwd: Yup.string().required("Bu alanı boş bırakamazsınız"),
  });

  const commonBtnStyle =
    "px-3 py-4 border-1 border-solid rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent";
  return (
    <Formik
      initialValues={initVals}
      validationSchema={vSchema}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
    >
      {({ values, errors, isSubmitting, resetForm }) => {
        return (
          <Form className="mx-auto my-48 w-9/10 p-3 max-w-form rounded-lg border-2 border-gray-200 border-solid bg-blue-100 shadow-lg">
            <MyField name="email" label="E-posta adresi" type="email" />
            <MyField name="pwd" label="Şifre" type="password" />
            <div className="flex justify-around mt-4">
              <button
                disabled={shouldDisable(errors, values, isSubmitting)}
                type="submit"
                className={`${commonBtnStyle} border-green-400 bg-green-100 hover:bg-green-300 disabled:opacity-50 disabled:hover:cursor-not-allowed disabled:hover:bg-green-100`}
              >
                {isSubmitting ? "Bekleyin" : "Giriş Yap"}
              </button>

              <button
                className={`${commonBtnStyle} bg-red-100 hover:bg-red-300`}
                onClick={resetForm}
              >
                <span className="sr-only">girilen bilgileri</span>Temizle
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
