import React, {useState, useEffect} from "react";

export const Time = () => {

	const [time, setTime] = useState(new Date());

	useEffect(() => {

		setInterval(() => {
			setTime(new Date());
		}, 1000);

	}, []);

	return (
		<p>
			<span>{time.getHours()}</span> :
			<span>{time.getMinutes()}</span> :
			<span>{time.getSeconds()}</span>
		</p>
	)
}
