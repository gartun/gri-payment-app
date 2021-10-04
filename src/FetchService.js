const BASE_URL = "https://tahsilat.grilabs.net/";
class FetchService {
  static async getUserInfo(id, token) {
    try {
      const res = await fetch(`${BASE_URL}api/v2/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();

        return data;
      }
    } catch (err) {
      throw Error(err);
    }
  }

  static async whoAmI(token) {
    try {
      const res = await fetch(`${BASE_URL}api/v2/get-current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const {
          data: {
            attributes: { id, username },
          },
        } = await res.json();

        return { id, username };
      }
    } catch (err) {
      throw Error(err);
    }
  }

  static async getOrders(token, pageNum = 0, perPage = 10) {
    try {
      const res = await fetch(
        `${BASE_URL}api/v2/order?&page[size]=${perPage}&page[number]=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      return data;
    } catch (err) {
      throw Error(err);
    }
  }

  static async addNewOrder(token, data) {
    try {
      const res = await fetch(`${BASE_URL}api/v2/order`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();

        return result;
      }
    } catch (err) {
      throw Error(err);
    }
  }
}

export default FetchService;
