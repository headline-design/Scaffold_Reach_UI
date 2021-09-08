import React from 'react';
import { PipelineShell, Button, Heading, Text, AlgoAddress, Input, ToastMessage } from "pipeline-ui";

export class RunBackend extends React.Component {
    render() {
        const {parent} = this.props;
        const {ctcInfoStr} = this.state || {};
        return (
            <PipelineShell>
                <Text className="Text">
                    Alice will deploy the contract.
                </Text>
                <Text className="Text">
                    Ask Alice for her contract info and paste it here:
                </Text>
                <textarea
                    className='ContractInfo'
                    spellCheck='false'
                    onChange={(e) => this.setState({ctcInfoStr: e.currentTarget.value})}
                    placeholder='{}'
                />
                <br />
                <Button
                    disabled={!ctcInfoStr}
                    onClick={() => parent.runBackend(ctcInfoStr)}
                ><Text className="Text">Connect</Text></Button>
            </PipelineShell>
        );
    }
}

export class ApproveRequest extends React.Component {
    render() {
        const {requestStandard} = this.props;
        if (!requestStandard) {
            return (
                <Text className="Text">
                    Once Alice has submitted her requested amount,
                    you will be prompted to pay it.
                </Text>
            );
        } else {
            return (
                <Text className="Text">
                    You have received a prompt to pay Alice's requested amount.
                </Text>
            );
        }
    }
}

export class DisplayInfo extends React.Component {
    render() {
        const {info} = this.props;
        if (!info) {
            return (
                <Text className="Text">
                    Waiting for Alice to reveal her secret info...
                </Text>
            );
        } else {
            return (
                <PipelineShell>
                    <Text className="Text">
                        Alice's secret info is: <strong>{info}</strong>
                    </Text>
                    <Text className="Text">
                        Thank you, Bob. The contract has run to completion.
                    </Text>
                </PipelineShell>
            );
        }
    }
}

export class BobWrapper extends React.Component {
    render() {
        const {bob} = this.props;
        return (
            <PipelineShell className='Bob'>
                {bob}
            </PipelineShell>
        );
    }
}
