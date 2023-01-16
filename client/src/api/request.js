import Axios from "axios";



export async function getAsync(url, param = {}, language = "vi") {
  try {
    // console.log(param)
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

export async function postAsync(url, params = {}) {
  try {
    return await Axios.post(url, params);
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}
export async function postAsyncWithHeader(url, params = {}, header = {}) {
  try {
    return await Axios.post(url, {}, {
      headers: header,
      params: params,
    });
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}

export async function getAsyncWithToken(url) {
  try {
    return await Axios.get(url);
  } catch (ex) {
    const { status = 400, data = {} } = ex?.response || {};
    const error = data?.errors || [];
    return { status, data: {}, message: (error[0]?.message || ''), code: (error[0]?.code || 0) }
  }
}

// export async function postAsyncWithToken(url, param) {
//   try {
//     const response = await Axios.post(url, {
//       headers: {
//         'Authorization': 'Bearer ' + getCookie(),
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Cache-Control': 'no-cache'
//       },
//       params: param
//     })
//
//     return response;
//   } catch (ex) {
//     const { status = 400, data = {} } = ex?.response || {};
//     const error = data?.errors || [];
//     return { status, data: {}, message: (error[0]?.message || ''), code: (error[0]?.code || 0) }
//   }
// }

export async function deleteAsyncWithToken(url, param) {
  try {
    const response = await Axios.delete(url, {
      headers: {
        'Authorization': 'Bearer ',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      params: param
    })

    return response;
  } catch (ex) {
    const { status = 400, data = {} } = ex?.response || {};
    const error = data?.errors || [];
    return { status, data: {}, message: (error[0]?.message || ''), code: (error[0]?.code || 0) }
  }
}

export async function putAsyncWithToken(url, param) {
  try {
    const response = await Axios.put(url,
      { params: param },
      {
        headers: {
          'Authorization': 'Bearer ',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
        },

      })

    return response;
  } catch (ex) {
    const { status = 400, data = {} } = ex?.response || {};
    const error = data?.errors || [];
    return { status, data: {}, message: (error[0]?.message || ''), code: (error[0]?.code || 0) }
  }
}
