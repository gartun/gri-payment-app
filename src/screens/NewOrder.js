// eslint-disable-next-line
import { Formik, Form } from "formik";
import * as Yup from "yup";

import useToken from "../custom-hooks/useToken";
import FetchService from "../FetchService";
import { MyField, MyTextarea, MySelect } from "../components/MyFields";

const initVals = {
  amount: 0,
  status: "open",
  orderNum: "",
  addressId: 0,
  paymentMethod: 0,
  notes: "",
  currencyCode: "",
};

const vSchema = Yup.object({
  amount: Yup.number()
    .required("Belli bir miktar girmelisiniz.")
    .positive("Negatif sayı giremezsiniz."),
  status: Yup.string()
    .oneOf(["open", "closed"], "Geçerli bir girdi değil")
    .required("Ödemenin durumunu belirtmelisiniz."),
  orderNum: Yup.string().required("Fatura numarasını girmelisiniz"),
  addressId: Yup.string().required("Şirketin adres Id'sini girin"),
  paymentMethod: Yup.number()
    .oneOf([0, 1], "Geçerli bir ödeme yöntemi seçin")
    .required("Bir ödeme yöntemi seçmelisiniz."),
  notes: Yup.string().required("Faturayla ilgili notları girin"),
  currencyCode: Yup.string().required(
    "Bir para birimi kodu girmalisiniz. Ör: 'try'"
  ),
});
const NewOrder = () => {
  const { token } = useToken();
  const handleSubmit = async (values, setSubmitting) => {
    const data = {
      data: {
        attributes: values,
      },
    };

    const res = await FetchService.addNewOrder(token, data);
    if (res.status) {
      alert(
        res.data.attributes.order_num + " numaralı fatura başarıyla eklendi."
      );
    } else {
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <Formik
      initialValues={initVals}
      validationSchema={vSchema}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
    >
      {({ values, errors, isSubmitting }) => (
        <Form className="max-w-form p-4 border-gray-400 bg-blue-200 shadow-lg my-7 mx-auto rounded-lg">
          <MyField label="Miktar" name="amount" type="number" />
          <MySelect label="Ödenme Durumu" name="status">
            <option value=""></option>
            <option value="closed">Ödendi</option>
            <option value="open">Ödenmedi</option>
          </MySelect>
          <MyField label="Fatura Numarası" name="orderNum" />
          <MyField label="Şirket adresi ID" name="addressId" type="number" />
          <MySelect label="Ödeme Yöntemi" name="paymentMethod">
            <option value="0">BkmExpress</option>
            <option value="1">GarantiPay</option>
          </MySelect>
          <MyTextarea label="Notlar" name="notes" />
          <MyField label="Para Birimi Kodu" name="currencyCode" />

          <button
            disabled={isSubmitting}
            className="block my-4 mx-auto px-4 py-2 bg-green-300 hover:bg-green-400"
          >
            {isSubmitting ? "Kaydediliyor" : "Kaydet"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NewOrder;
