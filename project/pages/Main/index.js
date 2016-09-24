import React, { PropTypes } from 'react';

import './main.css';

// Components
import createButton from '../../components/Button/Button';
import createCustomInput from '../../components/CustomInput/CustomInput';
import createCustomRadio from '../../components/CustomRadio/CustomRadio';
import createCardList from '../../components/Card/Card';

import { createGetJobsWithCache } from '../../services/api-service';

/* eslint-disable no-unused-vars */
const CustomInput = createCustomInput(React);
const Button = createButton(React);
const CustomRadio = createCustomRadio(React);
const CardList = createCardList(React);
/* eslint-enable no-unused-vars */

const descendingOptions = [
	{
		text: 'Ascending',
		default: true,
		value: false,
	},
	{
		text: 'Descending',
		value: true,
	},
];

const cache = {};

class Main extends React.Component {
	componentWillMount() {
		this.setState({ ...this.props });
		this.getJobs = createGetJobsWithCache(cache);
		this.jobs = [];
	}

	nextPage() {
		const page = this.state.page + 1;
		this.setState({ page, });
	}

	lastPage() {
		const page = this.state.page - 1;
		this.setState({ page, });
	}

	/**
	 * Implemented memoization
	 * @return {[type]} [description]
	 */
	getAllJobs() {
		this.getJobs(this.state)
			.then(res => res.json())
			.then(json => this.renderJobs(json))
			.then(() => this.nextPage())
			.catch(err => console.log(err));
	}

	renderJobs(json) {
		console.log('response', json);
		console.log('value set', this.state);

		this.jobs = json.results;
	}

	onToggleDescendingFn(e) {
		const val = e.currentTarget.value === 'true' ? true : false;

		this.setState({ descending: val, });
	}

	onClickFn() {
		this.getAllJobs();
	}

	render() {
		return (
			<section className="main container">
				<div className="row">
					<h3>Job Filters: </h3>
					<CustomRadio
						className="descending-order"
						options={descendingOptions}
						onChange={(e) => this.onToggleDescendingFn(e)} />

					<CustomInput
						type="text"
						placeholderText="Company"
						className="company-input" />

					<Button
						className="search"
						onClickFn={() => this.onClickFn()}
						text={'Search'} />

					<CardList options={this.jobs} />
				</div>
			</section>
		);
	}
}

Main.propTypes = {
	page: PropTypes.number.isRequired,
  descending: PropTypes.bool,
  company: PropTypes.string,
	category: PropTypes.array,
	level: PropTypes.array,
	location: PropTypes.array,
};

Main.defaultProps = {
	page: 1,
	descending: false,
	company: '',
	category: [],
	level: [],
	location: [],
};

export default Main;
