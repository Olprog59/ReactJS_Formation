import React from "react";
import {MyName} from "./myName";
import {MyCount} from "./myCount";
import {Time} from "./time";

export const Container = () => {


	return (
		<main>
			<MyName first="Samuel" last="Michaux" />
			<MyCount />
			<Time />
		</main>
	);
}
