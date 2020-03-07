import React from 'react';
import './formInput.styles.scss';

const FormInupt = ({handleChange, label, ...otherProps}) => (
    <div className="group">
        {
            label ? 
            (
                <label className={`${otherProps.value.length ? 'shirk' : ''}`}>
                                                {label}
                </label>
            )
            : null
        }
        <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
)

export default FormInupt;