import { useState, useEffect, useContext } from "react";

import {
  loginUserReq,
  loginUserSuccess,
  loginUserFail,
  logoutUser,
} from "../context/user/actionCreators";
import { UserAuthCtx } from "../context/GlobalContext";
import FetchService from "../FetchService";
import useToken from "../custom-hooks/useToken";

const Profile = ({ deleteTokens }) => {
  const [info, setInfo] = useState((prev) => ({}));
  const { token } = useToken();
  const { userState, userDispatch } = useContext(UserAuthCtx);

  useEffect(() => {
    const fetchUserId = async () => {
      userDispatch(loginUserReq());
      try {
        const { id } = await FetchService.whoAmI(token);
        const data = await FetchService.getUserInfo(id, token);

        const { email, firstname, language, lastname, username, last_login } =
          data?.data?.attributes;

        setInfo({
          ...info,
          firstname,
          lastname,
          username,
          email,
          language,
          last_login,
        });

        userDispatch(loginUserSuccess(username, id));
      } catch (err) {
        userDispatch(loginUserFail(err));
      }
    };

    fetchUserId();
    // eslint-disable-next-line
  }, [token, userDispatch]);

  const handleLogOut = () => {
    userDispatch(logoutUser());
    deleteTokens();
  };

  if (userState.err) {
    return (
      <h2 className="text-red-500">Bilgiler çekilirken bir hata oluştu.</h2>
    );
  }

  if (userState.isInLoginProcess) {
    return <h2>Bilgiler Çekiliyor...</h2>;
  }

  return (
    <>
      <h1 className="text-center my-3">Kullanıcı Profili</h1>
      {Object.keys(info).length > 0 ? (
        <ul className="w-9/10 mx-auto my-2">
          <li>Kullanıcı adı: {info.username}</li>
          <li>Email adresi: {info.email}</li>
          <li>Adı: {info.firstname}</li>
          <li>Soyadı: {info.lastname}</li>
          <li>Dil: {info.language === "tr" ? "Türkçe" : "English"}</li>
          <li>Son Giriş Tarihi: {Date(info.last_login)}</li>
        </ul>
      ) : null}
      <button
        onClick={handleLogOut}
        className="my-3 p-2 bg-red-500 hover:bg-red-600 text-white"
      >
        Çıkış Yap
      </button>
    </>
  );
};

export default Profile;
