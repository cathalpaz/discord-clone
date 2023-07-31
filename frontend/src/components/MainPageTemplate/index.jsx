import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import ServerList from "../ServerList";
import '../../styles/components/MainPageTemplate.css';
import FriendList from "../FriendList";

function MainPageTemplate() {

	return (
		<>
			<div className="main-page-container">
				<div className="server-list-container">
					<ServerList />
				</div>
				<div className="dm-list-container">
					<div className="dm-list-header">asd</div>
				</div>
				<div className="general-view-container">
					<div className="general-view-header">
					</div>
					<FriendList />

				</div>
			</div>
		</>
	);
}

export default MainPageTemplate;
