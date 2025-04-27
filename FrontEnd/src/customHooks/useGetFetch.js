import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export function useGetFetch(url){
    const { accessToken } = useAuth();
    console.log("Access Token:", accessToken);

    
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const triggerGet = (url) => {
        setIsPending(true);
        setError(null);

        if (!url) return;
        console.log("Request URL:", url);
        console.log("Sending GET request with token:", accessToken);
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken?.accessToken}`,
            },
            credentials: 'include'
        })
            .then(async res => {
                if (res.status === 401) {
                    console.log("Access token expired, refreshing token...")
                    return fetch("http://localhost:8080/refresh", {
                        method: "GET",
                        credentials: 'include'
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log("Updated token: " + data.accessToken)
                        return fetch(url, {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${accessToken?.accessToken}`,
                            },
                            credentials: 'include'
                        })
                    })
                }

                if(!res.ok){
                    throw Error ("Status of 404 (Not Found)")
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
            })
    }

    return {data, isPending, error, triggerGet};
}

