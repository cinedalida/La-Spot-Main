import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export function useGetFetch(url){
    const { auth, setAuth } = useAuth();
    console.log("Access Token:", auth.accessToken);

    
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const triggerGet = (url) => {
        setIsPending(false);
        setError(null);

        if(!url) {
            setIsPending(false);
            return;
        } 
        // console.log("Request URL:", url);
        // console.log("Sending GET request with token:", accessToken);
        const fetchSetUp = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${auth.accessToken}`,
            },
            credentials: 'include'
        }

        fetch(url, fetchSetUp)
        .then(async res => {
            console.log(res.status);
            if (res.status === 403) {
                console.log("Access token expired, refreshing token...")
                return fetch("http://localhost:8080/refresh", {
                    method: "POST",
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(async data => {
                    console.log(data);
                    console.log("Updated token: " + data.accessToken)
                    setAuth({
                        accessToken: data.accessToken,
                        ID: data.ID,
                        accountType: data.accountType,
                    });
                    return fetch(url, fetchSetUp)
                    // .then(res => {
                    //     if (!res.ok) throw new Error("Retry after refresh failed")
                    //     return res.json();
                    // })
                })
            }

            if(!res.ok){
                throw new Error ("An unknown error has occured")
            }

            return res.json()

        }).then(data =>  {
            console.log("Data Fetched (GET)");
            console.log(data);
            setData(data);
            setError(null);
        }).catch(err => {
            setError(err.message);
            console.log("erro error");
        }).finally(() => {
            setIsPending(false);
        })
    }

    return {data, isPending, error, triggerGet};
}

