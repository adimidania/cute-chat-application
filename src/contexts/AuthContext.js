import React, { useContext, useState, useEffect } from "react"
/**
 * “useContext” hook is used to create common data that can be accessed throughout
 * the component hierarchy without passing the props down manually to each level. 
 * Context defined will be available to all the child components without involving “props”.
 */
import { useHistory } from "react-router-dom"
/**
 * The useHistory hook helps us to access the history object, 
 * which is used to navigate programmatically to other routes using push and replace methods.
 */
import { auth } from "../firebase"

/** We are creating a context */
const AuthContext = React.createContext()

export function useAuth() { return useContext(AuthContext) }

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
            setLoading(false)
            if(user) history.push('/chats')
        })
    }, [user, history])

    const value = { user }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}