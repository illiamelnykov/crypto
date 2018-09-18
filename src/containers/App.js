import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { bool, arrayOf, object } from 'prop-types';
import moment from 'moment';

import TabLayout from '../components/TabLayout';

import { capitalize } from '../utils/capitalize';
import { getYUnit } from '../utils/getYUnit';

import 'antd/dist/antd.css';

import { loadBitcoin, loadEthereum } from 'reducers/app/actions';

import './style.css';

const TabPane = Tabs.TabPane;

const propTypes = {
  data: arrayOf(object),
  isLoaded: bool,
  isLoading: bool
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'bitcoin',
      showValuesAt: ['open', 'close', 'high', 'low'],
      datasets: {
        values: []
      },
    };
  }


  componentDidMount() {
    this.props.loadBitcoin();
  }

  updateDatasets = (newDatasets) => {
    const datasets = (newDatasets || this.props.data).reduce((acc, item) => {

      this.state.showValuesAt.forEach(v => {
        if (!acc.values[v]) {
          acc.values[v] = {
            name: capitalize(v),
            all: [],
            x: [],
            y: [],
          };
        }
    
        acc.values[v].all.push({
          x: item.time,
          y: item[v],
        });
        acc.values[v].x.push(moment(new Date(item.time)).format('MM-DD-YYYY HH:mm'));
        acc.values[v].y.push(item[v]);
      })
      
    
      return acc;
    }, { values: {} });

    datasets.values = Object.values(datasets.values);
    datasets.xUnit = 'Date';

    const yUnit = getYUnit(this.state.showValuesAt);

    datasets.yUnit = capitalize(yUnit);

    this.setState({ datasets });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.updateDatasets(nextProps.data);
    }
  }

  handleChange = (value) => {
    let newValues = [value];

    if (value === 'all') {
      newValues = ['open', 'close', 'high', 'low'];
    }

    this.setState({
      showValuesAt: newValues,
    }, () => {
      this.updateDatasets()
    });
  }

  handleChangeCurrency = key => {

    this.setState({
      currency: key,
      isLoaded: false,
      isLoading: true
    }, () => {
      if(key === 'bitcoin'){
        this.props.loadBitcoin();
      } else {
        this.props.loadEthereum();
      }
      this.updateDatasets();
    });
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div>Loading...</div> 
      );
    }
    const { datasets, currency, showValuesAt } = this.state;
    const dropdownValue = getYUnit(showValuesAt);

    return (
      <Tabs onChange={this.handleChangeCurrency} activeKey={currency}>
        <TabPane tab="Bitcoin" key="bitcoin"><TabLayout dropdownValue={dropdownValue} handleChange={this.handleChange} datasets={datasets} /></TabPane>
        <TabPane tab="Ethereum" key="ethereum"><TabLayout dropdownValue={dropdownValue} handleChange={this.handleChange} datasets={datasets} /></TabPane>
      </Tabs>
    );
  }
}

App.propTypes = propTypes;

const withStore = connect(
  (store) => ({
    isLoading: store.app.isLoading, 
    isLoaded: store.app.isLoaded,
    data: store.app.data,
  }), {
    loadBitcoin,
    loadEthereum,
  }
);

export default withStore(App);
