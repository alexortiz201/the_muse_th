export default React => ({
	type = 'text',
	placeholderText = 'Type Here',
	className = '',
	defaultValue = '',
	updateCompanyName = () => {},
	onEnter = () => {},
	min,
}) =>
	<div className={`${className}`}>
  	<input
			onKeyDown={(e) => {
				if (e.charCode == 13 || e.keyCode == 13) {
					onEnter();
				}
			}}
			min={min}
			onChange={evt => updateCompanyName(evt.target.value)}
			type={type}
			placeholder={placeholderText}
			className={`input ${className}-input`}
			defaultValue={defaultValue} />
	</div>;
