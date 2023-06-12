import { useState, useEffect } from "react";

const useUserRoleStatus = (roleToCheck) => {
    const [status, setStatus] = useState(false);
    let roles = localStorage.getItem("roles")
    
    useEffect(() => {
        try {
            JSON.parse(roles).includes(roleToCheck) ? setStatus(true) : setStatus(false)
        } catch {
            setStatus(false)
        }
    })

  return status;
};

export default useUserRoleStatus