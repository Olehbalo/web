const BASE_URL = "http://localhost:8080";
const RESOURCE_URL = `${BASE_URL}/plane`;

const baseRequest = async ({urlPath = "", method = "GET", body = null}) => {
    try {
        const reqParams = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            reqParams.body = JSON.stringify(body)
        }

        return await fetch(`${RESOURCE_URL}${urlPath}`, reqParams);
    } catch (error) {
        
    }
};

export const getAllPlane = async () => {
    const rawRes = await baseRequest({ method: "GET" });

    return rawRes.json();
};

export const postPlane = (body) => baseRequest({
    method: "POST", body
});

export const updatePlane = (id, body) => 
baseRequest({ urlPath: `/${id}`, method: "PATCH", body
});

export const deletePlane = (id) => 
    baseRequest ({ urlPath: `/${id}`, method: "DELETE"
});
