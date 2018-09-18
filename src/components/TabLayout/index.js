import React from 'react';
import Chart from 'components/Chart';
import { string, object, func } from 'prop-types';
import { Select } from 'antd';
 
const Option = Select.Option;

class TabLayout extends React.Component {
    render(){    
        const { dropdownValue, handleChange, datasets } = this.props;

        return (
            <React.Fragment>
                <Select
                    defaultValue={dropdownValue}
                    style={{ width: 120 }}
                    onChange={handleChange}
                >
                <Option value="all">All</Option>
                <Option value="open">Open</Option>
                <Option value="close">Close</Option>
                <Option value="high">High</Option>
                <Option value="low">Low</Option>
                </Select>
                <Chart datasets={datasets} />
            </React.Fragment>
        );
    }
}

const propTypes = {
    dropdownValue: string,
    datasets: object,
    handleChange: func
};

TabLayout.propTypes = propTypes;

export default TabLayout;