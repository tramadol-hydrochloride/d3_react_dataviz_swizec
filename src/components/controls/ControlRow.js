import React, {useCallback} from 'react';

import Toggle from './Toggle';

const ControlRow = (props) => {

    const make_pick = useCallback((picked, new_state) => {
        props.update_data_filter(picked, !new_state);
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                {props.toggle_names.map(name => (
                    <Toggle label={name}
                            name={name}
                            key={name}
                            value={props.picked === name}
                            onClick={make_pick}/>
                ))}
            </div>
        </div>
    );
};

export default ControlRow;
