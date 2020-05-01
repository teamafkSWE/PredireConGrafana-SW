import React from 'react';
import { UseState } from 'UseState';
import { TabsBar } from '@grafana/ui';
import { Tab } from '@grafana/ui';
import { TabContent } from '@grafana/ui';

export default {
    title: 'Layout/Tabs',
};

const tabs = [
    { label: 'Inserisci JSON', key: 'first', active: true },
    { label: 'Inserisci DB', key: 'second', active: false },
];

export const Simple = () => {
    return (
        <UseState initialState={tabs}>
            {(state, updateState) => {
                return (
                    <div>
                        <TabsBar>
                            {state.map((tab, index) => {
                                return (
                                    <Tab
                                        key={index}
                                        label={tab.label}
                                        active={tab.active}
                                        onChangeTab={() => updateState(state.map((tab, idx) => ({ ...tab, active: idx === index })))}
                                    />
                                );
                            })}
                        </TabsBar>
                        <TabContent>
                            {state[0].active && <div>Form di inserimento JSON</div>}
                            {state[1].active && <div>Form di inserimento DB</div>}
                        </TabContent>
                    </div>
                );
            }}
        </UseState>
    );
};