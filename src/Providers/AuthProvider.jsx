import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const [isDark, setIsDark] = useState(()=>{
        const stordTheme = localStorage.getItem('theme');
        return stordTheme === 'dark'
    });

    useEffect(()=>{
        localStorage.setItem('theme', isDark ? 'dark': 'light')
    } ,[isDark])


    // For Register
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // For Login
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL:photo
        })
    }

    useEffect( ()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res=> {
                    if(res.data.token){
                        localStorage.setItem('Access-token', res.data.token);
                    }
                })
            }
            else{
                localStorage.removeItem('Access-token');
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    } , [axiosPublic])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        login,
        logout,
        updateUserProfile,
        isDark,
        setIsDark
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;