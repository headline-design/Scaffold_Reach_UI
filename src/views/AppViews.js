import React from 'react';
import {  Button, Text } from "pipeline-ui";
import { PipelineShell, ToastMessage } from 'pipeline-ui';

export class Wrapper extends React.Component {
    render() {
        const {app} = this.props;
        return (
            <div className="App">
                <header className="App-header" id="root">
                    {app}
                </header>
            </div>
        );
    }
}

export class ConnectAccount extends React.Component {
    render() {
        return (
            <PipelineShell>
                <ToastMessage message={"Please wait while we connect to your account.\n" +
                "                    If this takes more than a few seconds, there may be something wrong."} />

            </PipelineShell>
        )
    }
}

export class FundAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {amt: props.defaultFundAmtStandard};
    }

    render() {
        const { bal, standardUnit, defaultFundAmtStandard, parent} = this.props;
        return (
            <PipelineShell>
                <h1>Fund account</h1>
                <br />
                <Text className="Text">
                Address:
                </Text>
                <br />
                <Text className="Text">
                Balance: {bal} {standardUnit}
                <hr />
                </Text>
                Would you like to fund your account with additional {standardUnit}?
                <br />
                <Text className="Text">
                (This only works on certain devnets)
                <br />
                </Text>
                <input
                    type='number'
                    placeholder={defaultFundAmtStandard}
                    onChange={(e) => this.setState({amt: e.currentTarget.value})}
                />
                <Button size="medium" onClick={() => parent.fundAccount(this.state.amt)}>Fund Account</Button>
                <Button size="medium" onClick={() => parent.skipFundAccount()}>Skip</Button>
            </PipelineShell>
        );
    }
}

export class SelectRole extends React.Component {
    render() {
        const {parent} = this.props;

        return (
            <PipelineShell>
                <Text className="Text Text-23">
                    PLEASE SELECT A ROLE:
                </Text>
                <Text className="Text Text-2">
                    <Button className="pipeline-btn-solid-1" size="medium"
                        onClick={() => parent.selectAlice()}
                    >Alice</Button><br />
                    <br /> Requests payment from Bob in order to reveal a secret.
                </Text>
                <Text className="Text Text-2">
                    <Button className="pipeline-btn-solid-1" size="medium"
                        onClick={() => parent.selectBob()}
                    >Bob</Button>
                    <br /><br /> Pays Alice in order for her to reveal a secret.
                    <br /> <br /></Text>
            </PipelineShell>
        );
    }
}
