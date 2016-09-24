export default React => ({
	className = '',
	options = [],
}) => {
	const singleRadioInput = (className = '', index = 1, option) =>
		<p key={`${className}-${index}`} className={`radio-btn ${className}`}>
	    <input
	    	type="radio"
	    	name={`${className}-group`}
	    	id={`${className}-${index}`}
	    	defaultChecked={option.default} />
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

