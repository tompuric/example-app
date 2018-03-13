import 'semantic-ui-css/semantic.min.css';
import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import moment from 'moment/src/moment';
import 'antd/lib/date-picker/style/css';
import { DatePicker, LocaleProvider } from 'antd';
import * as enUS from 'antd/lib/locale-provider/en_US';
// cast 'enUS' to 'any' so that it can be passed to LocalProvider
const enUSLocale: any = enUS;

class Entry extends React.Component<{}, {}> {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Provider store={store}>
            <div>
              <LocaleProvider locale={enUSLocale}>
                <DatePicker/>
              </LocaleProvider>
            </div>
        </Provider>
      </div>
    );
  }
}

export default Entry;
