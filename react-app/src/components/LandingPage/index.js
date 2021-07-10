import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function LandingPage() {
    const user = useSelector(state => state.session.user)

    if(user){
        return <Redirect to='/dashboard/home' />
    }
    return (
        <div>
            Landing
        </div>
    )
}
