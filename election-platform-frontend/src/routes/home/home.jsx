import React from "react";
import "../../tailwind.output.css";
import "../../index.css";
import "./styles.css";

import { ElectionsList } from "@/components/ui/elections-list";

export default function Home() {
	return (
		<div className="home">
			<Hero />
			<ElectionsList heading="Featured Elections" length={2} />
		</div>
	);
}

function Hero() {
	return (
		<div className="hero">
			<section className="hero-callout">
				<h1 className="title">Cast Your Vote for Change!</h1>
				<p className="subtitle">
					The future is in your hands. Learn about the parties and
					make an informed choice.
				</p>
			</section>
			<section className="hero-image">
				<img
					src="https://mg.co.za/wp-content/uploads/2021/09/9e9c33c1-gettyimages-1233200921-1024x683.jpg"
					alt='Board with the words "voting station" and the IEC logo, South Africa'
				></img>
			</section>
		</div>
	);
}
