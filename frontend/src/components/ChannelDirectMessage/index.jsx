import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetAllServers } from "../../store/server";
import '../../styles/components/ChannelDirectMessage.css';

function ChannelDirectMessage() {
    const serversStore = useSelector((state) => state.servers)
    const { serverId, channelId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllServers())
    }, [dispatch]);



    return (
        <>
            <h1>asdasd</h1>
        </>
    )
}

export default ChannelDirectMessage
