import { createContext } from "react";

const UserContext = createContext({
    loggedInUser : "Dafault value"
})


export default UserContext;