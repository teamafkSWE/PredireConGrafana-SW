// Libraries
import React, { PureComponent } from 'react';

// Types
import { NavModelItem, AppRootProps } from '@grafana/data';
import TabB from './components/TabB'
import TabA from './components/TabA'

interface Props extends AppRootProps {}
interface State {
  active: string | undefined;
}

const TAB_ID_A:string = 'A';
const TAB_ID_B:string = 'B';

export class ExampleRootPage<ExampleAppSettings> extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: TAB_ID_A
    }
  }

  componentDidMount() {
    this.updateNav();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.query !== prevProps.query) {
      if (this.props.query.tab !== prevProps.query.tab) {
        this.updateNav();
      }
    }
  }

  updateNav() {
    const { path, onNavChanged, query, meta } = this.props;

    const tabs: NavModelItem[] = [];
    tabs.push({
      text: 'Tab A',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_ID_A,
      id: TAB_ID_A,
    });
    tabs.push({
      text: 'Tab B',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_ID_B,
      id: TAB_ID_B,
    });

    // Set the active tab
    let found = false;
    const selected = query.tab || TAB_ID_B;
    for (const tab of tabs) {
      tab.active = !found && selected === tab.id;
      if (tab.active) {
        found = true;
        this.setState({active: tab.id})
      }
    }
    if (!found) {
      tabs[0].active = true;
    }

    const node = {
      text: 'This is the Page title',
      img: meta.info.logos.large,
      subTitle: 'subtitle here',
      url: path,
      children: tabs,
    };

    // Update the page header
    onNavChanged({
      node: node,
      main: node,
    });
  }



  render() {

    return (
      <div>
        <TabA active={this.state.active}/>
        <TabB active={this.state.active}/>
      </div>
    );
  }
}
