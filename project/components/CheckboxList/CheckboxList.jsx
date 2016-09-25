export default React => ({
	className = '',
	options = [],
	onClickFn = () => {},
}) => {
	const singleCheckbox = (className = '', label, val, index) =>
		<div className="checkbox-container" key={`${className}-${label}-${index}`}>
      <input
      	id={`${className}-${index}`}
      	type="checkbox"
      	value={label}
      	defaultChecked={val}
      	onClick={(e) => onClickFn(e)} />
      <label htmlFor={`${className}-${index}`}>{label}</label>
    </div>;

	const checkboxList = options.map(({ label, value }, index) =>
		singleCheckbox(className, label, value, index));

	return (
		<div
			className={`${className}-list`}>
			{ checkboxList }
		</div>
	);
};
