export default React => ({
	type = 'text',
	placeholderText = 'Type Here',
	className = '',
	updateCompanyName = () => {},
	onEnter = () => {},
}) =>
	<div className={`row ${className}`}>
    <div className="input-field col s6">
    	<input
    		id={`${className}-id`}
				onKeyDown={(e) => {
					if (e.charCode == 13 || e.keyCode == 13) {
						onEnter();
					}
				}}
				onChange={evt => updateCompanyName(evt.target.value)}
				type={type}
				placeholder={placeholderText}
				className={`input ${className}`} />
		</div>
	</div>;
