import React, {useRef, useState, useEffect} from "react"
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'
import { auth } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"


export default function Chats() {

    const history = useHistory();
    const { user } = useAuth();
    const [Loading, setLoading] = useState(true)

    async function handleLogout() {
        await auth.signOut()
        history.push("/")
    }
    
    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()
        return new File([data], "userPhoto.jpg", {type : "image/jpeg"})
    }
    useEffect(() => {
        if(!user) {
            history.push("/")
            return;
        }
        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id" : "3128fea9-7ebf-4e27-9307-f1ea81a2222a",
                "user-name" : user.email,
                "user-secret" : user.uid,
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formData = new FormData();
            formData.append("email", user.email);
            formData.append("username", user.email);
            formData.append("secret", user.uid);
            getFile(user.photoURL)
            .then((avatar) => {
                formData.append("avatar", avatar, avatar.name)
            })
            axios.post("https://api.chatengine.io/users",
                formData,
                { headers: { "private-key": "0e84e756-1687-43f6-8cef-3c323f6f5033"}}
            )
            .then(
                () => setLoading(false)
            )
            .catch(
                (error) => console.log(error)
            )
        })

    }, [user, history])

    if(!user || Loading ) {
        return (
            <div id="loading-container">
                <div class="exponea-loading-backdrop">
                    <div class="exponea-loading-icon"></div>
                </div>
            </div>
        )
    }
    
    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                S-Chat
                </div>

                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>

            <ChatEngine 
                height='calc(100vh - 66px)'
                projectID= "3128fea9-7ebf-4e27-9307-f1ea81a2222a"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}