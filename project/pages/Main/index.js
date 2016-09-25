import React, { PropTypes } from 'react';
import debounce from 'lodash/debounce';

import './main.css';
import createMainTemplate from './Main.jsx';

// Components
import createButton from '../../components/Button/Button';
import createCustomInput from '../../components/CustomInput/CustomInput';
import createSwitch from '../../components/Switch/Switch';
import createCardList from '../../components/Card/Card';
import createCheckboxList from '../../components/CheckboxList/CheckboxList';

import { createGetJobsWithCache } from '../../services/api-service';

/* eslint-disable no-unused-vars */
const mainTemplate = createMainTemplate(React, debounce);
const CustomInput = createCustomInput(React);
const Button = createButton(React);
const Switch = createSwitch(React);
const CardList = createCardList(React);
const CheckboxList = createCheckboxList(React);
/* eslint-enable no-unused-vars */

// object to store memoized fetches
const cache = {};

/**
 * Copies array of values and remove or adds the target's value
 * based on target checked value.
 * @param  {Object} tg         		target input from click event
 * @param  {array} valArr  				array of states values.
 * @return {array} arrayValue     clean copy of new modified array.
 */
let updateArray = ({ checked, value }, valArr = []) => {
	let arrayValue = [...valArr];

	if (checked === false && arrayValue.indexOf(value) !== -1) {
		let index = arrayValue.indexOf(value);
		arrayValue.splice(index, 1);
	} else if (checked === true) {
		arrayValue.push(value);
	}

	return arrayValue;
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
			// eslint-disable-next-line
			.catch(err => console.log(err));
	}

	renderJobs(json) {
		this.jobs = json.results;

		// workaround to trigger view update.
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
		let arrayValue = updateArray(tg, this.state[type]);
		let update = {};
		update[type] = arrayValue;

		this.setState(update);
	}

	/**
	 * Takes an onclick event and finds nearest input.
	 * Note: event delegations trigger two events in React,
	 * current and after.
	 * @param  {Object} e  onlick event
	 * @return {Object}   input element
	 */
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
			mainTemplate.call(this, {
				CustomInput,
				Button,
				Switch,
				CardList,
				CheckboxList,
			})
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
