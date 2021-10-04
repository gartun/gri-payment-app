import { useReducer, useEffect } from "react";
import { FcAddRow } from "react-icons/fc";
import { Link } from "react-router-dom";

import FetchService from "../FetchService";
import useToken from "../custom-hooks/useToken";

const initState = {
  loading: false,
  err: "",
  orders: [],
  links: {
    first: "",
    last: "",
    next: "",
    prev: "",
    self: "",
  },
  meta: {
    currentPage: 0,
    maxPage: 0,
    perPage: 10,
    totalPage: 0,
    totalResults: 0,
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "REQ":
      return {
        ...state,
        loading: true,
      };

    case "SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload.data,
        links: action.payload.links,
        meta: action.payload.meta,
      };

    case "FAIL":
      return {
        ...state,
        loading: false,
        err: action.payload.err,
      };

    default:
      return state;
  }
};

const ListItem = ({ order }) => (
  <li className="py-3">
    <p>
      <strong>Fatura NO:</strong> {order.attributes.order_num}
    </p>
    <p>
      <strong>Miktar:</strong> {order.attributes.amount}{" "}
      {order.attributes.currency_code}
    </p>
  </li>
);

const Orders = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { token } = useToken();

  useEffect(() => {
    const getOrders = async () => {
      dispatch({ type: "REQ" });
      try {
        const { data, meta, links } = await FetchService.getOrders(token);

        dispatch({ type: "SUCCESS", payload: { data, meta, links } });
      } catch (err) {
        dispatch({ type: "FAIL", payload: { err } });
      }
    };

    getOrders();
  }, [token]);

  if (state.err) {
    return <h1>Bir hata oluştu</h1>;
  }

  return (
    <>
      <h1 className="text-center font-bold my-3">Faturalar</h1>
      {state.loading ? (
        <h1>Faturalar alınıyor</h1>
      ) : state.orders.length === 0 ? (
        <h2>Hiç fatura yok!</h2>
      ) : (
        <ul className="divide-y divide-gray-500">
          {state.orders.map((order) => (
            <ListItem
              key={order.id}
              order={order}
              className="py-3 border-bottom-gray"
            />
          ))}
        </ul>
      )}
      <Link to="/new-order">
        <span className="sr-only">Yeni fatura ekle</span>
        <FcAddRow size={55} />
      </Link>
    </>
  );
};

export default Orders;
