import React, { useEffect, useRef, useState } from "react";
import {
	GPTProvider,
	type RewardedOnReadyEvent,
	type RewardedOnGrantedEvent,
} from "../../../../../dist";
import type { Styles } from "../../Config";

const DisplayRewardedAd = () => {
	const [status, setStatus] = useState("Loading...");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [reward, setReward] = useState<RewardedOnGrantedEvent["payload"]>();
	const eventRef = useRef<RewardedOnReadyEvent>();

	const handleReady = (event: RewardedOnReadyEvent) => {
		setStatus("Rewarded ad slot is ready.");
		eventRef.current = event;
		setIsModalOpen(true);
		setMessage("Watch an ad to receive a special reward?");
	};

	const handleGranted = (event: RewardedOnGrantedEvent) => {
		setReward(event.payload);
		setMessage("Reward granted.");
	};

	const handleClose = () => {
		setStatus("Rewarded ad has been closed.");
	};

	const watchAd = () => {
		eventRef?.current?.makeRewardedVisible();
	};

	useEffect(() => {
		if (reward) {
			setMessage(`You have been rewarded ${reward.amount} ${reward.type}!`);
		}
	}, [reward]);

	return (
		<GPTProvider
			networkId={22639388115}
			outOfPage={{
				type: "rewarded",
				adUnit: "rewarded_web_example",
				settings: {
					onReady: handleReady,
					onClosed: handleClose,
					onGranted: handleGranted,
				},
			}}
			debug
		>
			<Component
				status={status}
				isModalOpen={isModalOpen}
				message={message}
				onWatchAd={watchAd}
				closeModal={() => setIsModalOpen(false)}
			/>
		</GPTProvider>
	);
};

const Component = (props: {
	status: string;
	isModalOpen: boolean;
	message: string;
	onWatchAd: () => void;
	closeModal: () => void;
}) => {
	return (
		<div>
			<h1>{props.status}</h1>
			{props.isModalOpen && (
				<div id="modal" style={styles.modal}>
					<div style={styles.modalDialog}>
						<p>{props.message}</p>

						<span style={styles.block}>
							<input
								type="button"
								value="Close"
								onClick={props.closeModal}
								style={styles.input}
							/>
						</span>

						<span style={styles.block}>
							<input
								type="button"
								value="Yes"
								onClick={props.onWatchAd}
								style={styles.input}
							/>
							<input
								onClick={props.closeModal}
								type="button"
								value="No"
								style={styles.input}
							/>
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

const styles = {
	modal: {
		display: "block",
		position: "fixed",
		zIndex: "1",
		paddingTop: "300px",
		left: "0",
		top: "0",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	modalDialog: {
		margin: "auto",
		padding: "25px",
		backgroundColor: "white",
		textAlign: "center",
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	block: { display: "block" },
	input: {
		padding: "0.5rem",
		background: "blue",
		border: "none",
		borderRadius: "4px",
		margin: "4px",
		color: "white",
		cursor: "pointer",
	},
} satisfies Styles;

export { DisplayRewardedAd };

//   .modal[data-type] {
// 	display: block;
//   }

//   .grantButtons,
//   .rewardButtons {
// 	display: none;
//   }

//   .modal[data-type="grant"] .grantButtons,
//   .modal[data-type="reward"] .rewardButtons {
// 	display: block;
//   }
