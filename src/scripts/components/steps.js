"use strict";

import { tail } from "lodash";
import React, { Component } from "react";
import Step from "./step";

export default class Steps extends Component {
	render () {
		const { steps, ui, actions } = this.props;

		// upStep = upstreamStep
		return (
				<ul className="steps">
					{tail(steps).map((step, i) => <Step key={i + 1} step={step} upStep={steps[i]} index={i + 1} ui={ui} actions={actions} />)}
				</ul>
		);
	}
}
