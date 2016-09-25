import React, { PropTypes } from 'react';
import debounce from 'lodash/debounce';

import './main.css';

// Components
import createButton from '../../components/Button/Button';
import createCustomInput from '../../components/CustomInput/CustomInput';
import createSwitch from '../../components/Switch/Switch';
import createCardList from '../../components/Card/Card';
import createCheckboxList from '../../components/CheckboxList/CheckboxList';

import { createGetJobsWithCache } from '../../services/api-service';

/* eslint-disable no-unused-vars */
const CustomInput = createCustomInput(React);
const Button = createButton(React);
const Switch = createSwitch(React);
const CardList = createCardList(React);
const CheckboxList = createCheckboxList(React);
/* eslint-enable no-unused-vars */

const cache = {};

let updateArray = (tg, arrayValue) => {
	if (tg.checked === false && arrayValue.indexOf(tg.value) !== -1) {
		let index = arrayValue.indexOf(tg.value);
		arrayValue.splice(index, 1);
	} else if (tg.checked === true) {
		arrayValue.push(tg.value);
	}
};

class Main extends React.Component {
	componentWillMount() {
		this.setState({ ...this.props });
		this.getJobs = createGetJobsWithCache(cache);
		this.pageNumberInputVal = this.props.page;
		this.categories = [
			{
				label: 'Account Management',
				value: false,
			},
			{
				label: 'Creative & Design',
				value: false,
			},
			{
				label: 'Data Science',
				value: false,
			},
			{
				label: 'Customer Service',
				value: false,
			},
			{
				label: 'HR & Recruiting',
				value: false,
			},
			{
				label: 'Engineering',
				value: false,
			},
		];
		this.levels = [
			{
				label: 'Internship',
				value: false,
			},
			{
				label: 'Entry Level',
				value: false,
			},
			{
				label: 'Mid Level',
				value: false,
			},
			{
				label: 'Senior Level',
				value: false,
			},
		];
		this.locations = [
			{
				label: 'Albuquerque, NM',
				value: false,
			},
			{
				label: 'New York City Metro Area',
				value: false,
			},
			{
				label: 'New Orleans, LA',
				value: false,
			},
			{
				label: 'Zurich, Switzerland',
				value: false,
			},
		];
	}

	nextPage() {
		if (!this.jobs.length) {
			return;
		}

		const page = this.state.page + 1;
		this.setState({ page, });
	}

	lastPage() {
		if (this.state.page === 1) {
			return;
		}

		const page = this.state.page - 1;
		this.setState({ page, });
	}

	/**
	 * Implemented memoization
	 * @return {[type]} [description]
	 */
	getAllJobs() {
		this.getJobs(this.state)
			.then(json => this.renderJobs(json))
			// .then(jobs => this.nextPage(jobs))
			.catch(err => console.log(err));
	}

	renderJobs(json) {
		this.jobs = json.results;
		this.setState(this.state);
	}

	onToggleDescendingFn(e) {
		const val = e.currentTarget.checked ? true : false;
		this.setState({ descending: val, });
	}

	onClickFn() {
		this.setState({
			company: this.companyInputVal,
		}, this.getAllJobs);
	}

	updateCompanyName(val) {
		this.companyInputVal = val;
	}

	updatePageNumber(val) {
		let page = val ? parseInt(val, 10) : this.state.page;
		this.setState({ page, });
	}

	onClickCheckbox(type, e) {
		let tg = this.getTarget(e);
		let arrayValue = [...this.state[type]];
		let update = {};

		// has side effect of mutating arrayValue
		// should make pure.
		updateArray(tg, arrayValue);
		update[type] = [...arrayValue];

		this.setState(update);
	}

	getTarget(e) {
		let tg = e.target;

		if (tg.tagName === 'LABEL') {
			tg = tg.closest('.checkbox-container').getElementsByTagName('input')[0];
		} else if (tg.className === 'checkbox-container') {
			tg = tg.getElementsByTagName('input')[0];
		}

		return tg;
	}

	render() {
		return (
			<section className="main container">
				<div className="row">
					<div className="col s6">
						<h6>Job Filters:</h6>
					</div>
					<div className="col s6">
						<Switch
							className="descending-order"
							labelOff="Ascending"
							labelOn="Descending"
							onClick={(e) => this.onToggleDescendingFn(e)} />
					</div>
				</div>

				<div className="row">
					<div className="col s6">
						<label>Search by:</label>
						<CustomInput
							type="text"
							placeholderText="Company name"
							className="company-input"
							updateCompanyName={ debounce((val) => this.updateCompanyName(val), 300) }
							onEnter={() => this.onClickFn()} />
					</div>

					<div className="col s6">
						<label>Page</label>
						<CustomInput
							type="number"
							min="1"
							placeholderText="Search by company name"
							className="company-input"
							defaultValue={this.state.page}
							updateCompanyName={ debounce((val) => this.updatePageNumber(val), 300) }
							onEnter={() => this.onClickFn()} />
					</div>
				</div>

				<div className="row">
					<div className="col s12 m12">
						<label>The job category to get:</label>
						<CheckboxList
							className="industries-list"
							onClickFn={(e) => this.onClickCheckbox('category', e)}
							options={this.categories} />
					</div>
				</div>

				<div className="row">
					<div className="col s12 m12">
						<label>The experience level required for the job:</label>
						<CheckboxList
							className="categories-list"
							onClickFn={(e) => this.onClickCheckbox('level', e)}
							options={this.levels} />
					</div>
				</div>

				<div className="row">
					<div className="col s12 m12">
						<label>The job location to get:</label>
						<CheckboxList
							className="locations-list"
							onClickFn={(e) => this.onClickCheckbox('location', e)}
							options={this.locations} />
					</div>
				</div>

				<div className="row">
					<div className="col s12 m6">
						<Button
							className="search"
							onClickFn={(e) => this.onClickFn(e)}
							text={'Search'} />
					</div>
				</div>

				<div className="row">
					<div className="col s12 m12">
						<CardList
							className="job"
							options={this.jobs} />
					</div>
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
