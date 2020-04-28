// Libraries
import React, { PureComponent } from 'react';

// Types
import { NavModelItem, AppRootProps } from '@grafana/data';
import VisDati from './components/visDati'
import InsJson from './components/insJson'

interface Props extends AppRootProps {}

//definisco uno state
interface State {
  active: string | undefined;
}

//l'ID del tab sarebbe da spostare dentro la classe Tab
const TAB_ID_Ins:string = 'insJson';
const TAB_ID_Vis:string = 'visDati';

//aggiungo lo state alla classe
export class ExampleRootPage<ExampleAppSettings> extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    //imposto uno state iniziale, non sono sicuro della sua utilità
    this.state = {
      active: TAB_ID_Ins
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
      text: 'Inserisci JSON',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_ID_Ins,
      id: TAB_ID_Ins,
    });
    tabs.push({
      text: 'Visualizza dati',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_ID_Vis,
      id: TAB_ID_Vis,
    });

    // Set the active tab
    let found = false;
    const selected = query.tab || TAB_ID_Vis;
    //Questo loop cerca quale tab è diventato attivo(scritto da quelli di grafana)
    for (const tab of tabs) {
      tab.active = !found && selected === tab.id;
      if (tab.active) {
        found = true;
        //ho aggiuntoquesto state in modo tale che una volta trovato il tab, mi viene salvato nello state
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
    //Renderizzo le tabs
    return (
      <div>
        <InsJson active={this.state.active}/>
        <VisDati active={this.state.active}/>
      </div>
    );
  }
}
