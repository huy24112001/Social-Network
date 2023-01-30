import Axios from "axios";

export async function createConversation(url, {token, data}) {
    try {
      console.log(token)
      console.log(data)
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

export async function createMessage(url, {token, data}) {
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

  export async function setActiveConversation(url) {
    try {
      // console.log(token)
      // console.log(data)
      const headers =  {
        "Content-Type": "application/json"
      }
      return await Axios.put(
        url, 
        {},
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

export async function getConversationsOfUser(url) {
    // console.log(url)
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

export async function getConversation(url) {
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


export async function findConversationBetweenUser(url) {
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


export async function getMessagesOfConversation(url) {
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