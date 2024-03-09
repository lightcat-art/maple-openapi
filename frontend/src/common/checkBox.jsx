import './checkBox.css'

export const CheckBox = ({ children, disabled, checked, onChange }) => {
    return (
        <label>
            <input
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={({ target: { checked } }) => onChange(checked)}
            />
            {children}
        </label>
    );
}

export const SwitchCheckBox = ({ children, disabled, checked, onChange }) => {
    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                disabled={disabled}
                checked={checked}
                onChange={({ target: { checked } }) => onChange(checked)}>
            </input>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{children}</label>
        </div>
    );
}