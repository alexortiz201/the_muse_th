export default React => ({
	className = '',
	options = [],
	onChange = () => {},
}) => {
	const singleRadioInput = (className = '', index = 1, option) =>
		<p key={`${className}-${index}`} className={`radio-btn ${className}`}>
	    <input
	    	type="radio"
	    	name={`${className}-group`}
	    	id={`${className}-${index}`}
	    	value={option.value}
	    	defaultChecked={option.default}
	    	onChange={(e) => onChange(e)} />
	    <label htmlFor={`${className}-${index}`}>{option.text}</label>
	  </p>;

	const radioInputs = options.map((option, index) =>
		singleRadioInput(className, index, option));

	return (
		<form>
			{ radioInputs }
		</form>
	);
};

