import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react"


export function usePostFetch() {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { auth, setAuth } = useAuth();
    console.log("Access Token:", auth?.accessToken);

    const triggerPost = (url, postData) => {
        setIsPending(true);
        setError(null);

        if(!url || !postData) {
            setIsPending(false);
            return;
        } 

        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${auth.accessToken}`    
            },
            credentials: 'include',
            body: JSON.stringify(postData)
        }).then( async res => {
            
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
                    return fetch(url, {
                        method: "POST",
                        body: JSON.stringify(postData),
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${data.accessToken}`,
                        },
                        credentials: 'include',
                    })
                })
            }

            if (!res.ok) {
                const responseData = await res.json();
                console.log("Error message: " + responseData.message)
                throw new Error (responseData.message || "An unknown error has occured")
            }

            return res.json();

        }). then(data => {
            console.log("Data Posted");
            console.log(data);
            setData(data);
            setError(null)
        }).catch (err => {
            setError(err.message)
        }). finally(() => {
            setIsPending(false);
        })

    }

    return { data, isPending, error, triggerPost }
}
