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

export async function getProfilePost(url) {
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


export async function getTimelinePost(url) {
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

export async function createComment(url, {token, data}) {
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


export async function likePost(url, token) {
  try {
    const headers =  {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    }
    return await Axios.put(
      url,{},
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

export async function deletePost(url, token) {
  try {
    const headers =  {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    }
    return await Axios.delete(
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