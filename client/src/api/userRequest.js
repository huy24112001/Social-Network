import Axios from "axios";

export async function getFollowings(url) {
    try {
      const headers =  {
        "Content-Type": "application/json",
      }
      return await Axios.get(
        url, 
        {
          headers: headers,
        },
      );
    } catch (ex) {
      const { status = 400, data = {} } = ex.response || {};
      const error = data?.errors || [];
      return {
        status,
        data: {},
        message: error[0]?.message || "",
        code: error[0]?.code || 0,
      };
    }
  }