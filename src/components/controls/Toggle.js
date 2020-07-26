import React from 'react';

const Toggle = (props) => {

    let className = props.value ? 'btn btn-outline-primary' : 'btn btn-outline-secondary';

    return (
        <button className={className} onClick={() => props.onClick(props.name, !props.value)}>
            {props.label}
        </button>
    );
};

export default Toggle;
