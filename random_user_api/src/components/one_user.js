import React from 'react';

const OneUser = props => {

	return (
		<article className="user">
			<figure>
				<img src={props.user.pictureLarge} alt={props.user.firstName + " " +  props.user.lastName} />
			</figure>
			<div className="name">
				<p>Mon nom est </p>
				<p>{props.user.titleName} {props.user.firstName} {props.user.lastName}</p>
			</div>
			<div className="hidden">
				<div className="address">
					<p><span>Rue :</span> <span>{props.user.street}</span></p>
					<p><span>Ville :</span> <span>{props.user.city}</span></p>
					<p><span>Code Postal :</span>
						<span>{props.user.postCode}</span></p>
					<p><span>Pays :</span> <span>{props.user.country}</span></p>
				</div>
				<div className="phone">
					<p><span>Téléphone :</span> <span>{props.user.phone}</span>
					</p>
					<p><span>Mobile :</span> <span>{props.user.cell}</span></p>
				</div>
			</div>
		</article>
	)
}

export default OneUser;
