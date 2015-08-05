"use strict";

import React, { Component } from "react";
import PromiseId from "./promise-id";

class SourceButtons extends Component {
	handleResolve () {
		this.props.resolve();
	}
	handleReject () {
		this.props.reject();
	}
	render () {
		return (
			<div>
				<button className="resolve" onClick={::this.handleResolve} disabled={this.props.disabled}>Resolve</button>
				<button className="reject" onClick={::this.handleReject} disabled={this.props.disabled}>Reject</button>
			</div>
		);
	}
}

export default class Source extends Component {
	render () {
		const { source, ui, actions } = this.props;
		var assign;

		// snippets
		const shortSnippet = ``;
		const longSnippet =
`
var value = "${source.value}";
function executor (resolve, reject) {
	buttons.onclick = _.once(function (event) {
		if (event.target.textConent === 'Resolve') {
			resolve(value);
		} else {
			reject(value);
		}
	});
}
`;
		const snippet = true ? longSnippet : shortSnippet;

		if (ui.intermediatePromises) {
			assign = [
				<span>var </span>,
				<PromiseId id="Source" promiseState={source.promiseState} />,
				<span> = new Promise(executor);</span>
			];
		} else {
			assign = "(new Promise(executor))";
		}

		return (
				<div className="source">
					<strong>Source promise</strong>
					<span className={source.promiseState}>State: { source.promiseState }</span>
					<span>Value: "{source.value}"</span>
					<pre>{snippet}</pre>
					<div>{assign}</div>
					<SourceButtons {...actions} disabled={source.promiseState !== "pending"} />
				</div>
		);
	}
}
