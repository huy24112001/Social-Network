import Axios from "axios";



export async function getPost(url, param = {}) {
  try {
    return await Axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: param,
    });
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

export async function createPost(url, {token, data}) {
  try {
    // console.log(token)
    // console.log(data)
    const headers =  {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
    return await Axios.post(
      url, 
      data,
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