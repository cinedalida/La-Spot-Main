import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export function  useDeleteFetch() {
    const {auth, setAuth} = useAuth();
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const triggerDelete = (url) => {
        setIsPending(false);
        setError(null);

        if(!url) {
            setIsPending(true);
            return;
        } 

        fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${auth.accessToken}`
            },
            credentials: 'include'
        }).then( async res => {
            if (res.status === 403) {
                console.log("Access token expired, refreshing token...")
                return fetch("http://localhost:8080/refresh", {
                    method: "POST",
                    credentials: "include"
                })
                .then(res => res.json())
                .then( async data => {
                    console.log("Updated token: " + data.accessToken)
                    setAuth({
                        accessToken: data.accessToken,
                        username: data.username,
                        accountType: data.accountType,
                    });
                    return fetch(url, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${data.accessToken}`,
                        },
                        credentials: 'include'
                    }). then(res => {
                        if (!res.ok) throw new Error("Retry after refresh failed")
                        return res.json();
                    })
                })
            }

            if(!res.ok){
                const responseData = await res.json();
                console.log("Error message: " + responseData.message)
                throw new Error (responseData.message || "An unknown error has occured")     
            }

            if (res.status === 204) {
                return {status: 204}
            }

            return res.json()
        }).then(data =>  {
            console.log(data);
            setData(data);
            setError(null);
        }).catch(err => {
            setError(err.message);
        }).finally(() => {
            setIsPending(false);
        });
    }


    return {data, isPending, error, triggerDelete};
}

