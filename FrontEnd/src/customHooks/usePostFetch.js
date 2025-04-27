import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react"


export function usePostFetch() {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { accessToken } = useAuth();
    console.log("Access Token:", accessToken);

    const triggerPost = (url, postData) => {
        setIsPending(true);
        setError(null);

        if(!url || !postData) return;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${accessToken?.accessToken}`    
            },
            credentials: 'include',
            body: JSON.stringify(postData)
        }). then( async res => {
            if (!res.ok) {
                const responseData = await res.json();
                console.log("Error message : " + responseData.message)
                throw new Error (responseData.message || "An unknown error has occured")
            }
            return res.json();
        }). then(data => {
            console.log("Data Posted")
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
