import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import '../../styles/components/ServerListBar.css';

function MainPageTemplate() {

	return (
		<>
			<div className="main-page-container">
				<div className="server-list-container">

				</div>
				<div className="dm-list-container">

				</div>
				<div className="friend-list-container">

				</div>

			</div>
		</>
	);
}

export default MainPageTemplate;
