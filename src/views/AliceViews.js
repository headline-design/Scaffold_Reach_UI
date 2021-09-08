import React from 'react';
import { PipelineShell, Button, Heading, Text, AlgoAddress, Input, ToastMessage } from "pipeline-ui";

const ALGO_ADDRESS = "0x9505C8Fc1aD98b0aC651b91245d02D055fEc8E49";

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

export class Deploy extends React.Component {
    render() {
        const {parent} = this.props;
        return (
            <PipelineShell>
                <Text className="Text">
                    As Alice, it is your job to deploy the contract.
                </Text>
                <Button size="medium"
                    onClick={() => parent.deploy()}
                ><Text className="Text">Deploy</Text></Button>
            </PipelineShell>
        );
    }
}

export class EnterInfo extends React.Component {
    render() {
        const {parent, defaultInfo} = this.props;
        const {info} = this.state || {};
        return (
            <PipelineShell>
                <AlgoAddress address={ALGO_ADDRESS} />

                <Text className="Text">
                    Alice, what is your secret info?
                </Text>
                <br />
                <textarea
                    onChange={(e) => this.setState({info: e.currentTarget.value})}
                    placeholder={defaultInfo}
                />
                <br />
                <Button size="medium" onClick={() => parent.enterInfo(info || defaultInfo)}>Submit Secret Info</Button>
            </PipelineShell>
        );
    }
}

export class EnterRequest extends React.Component {
    render() {
        const {parent, standardUnit, defaultRequestStandard} = this.props;
        const {req} = this.state || {};
        return (
            <PipelineShell>
                <Text className="Text">
                Alice, how much {standardUnit} should Bob pay you
                to reveal this info?
                </Text>
                <Input
                    type='number'
                    onChange={(e) => this.setState({req: e.currentTarget.value})}
                    placeholder={defaultRequestStandard}
                />
                <br /> <br />
                <Button  size="medium" mr={3} onClick={() => parent.enterRequest(req || defaultRequestStandard)}>Submit request</Button>
            </PipelineShell>
        );
    }
}

export class RunBackend extends React.Component {
    render() {
        const {parent, info, requestStandard, standardUnit} = this.props;
        return (
            <PipelineShell>
                <Text className="Text">
                    You request <strong>{requestStandard}</strong> {standardUnit + ' '}
                    to reveal secret info: <strong>{info}</strong>
                </Text>
                <Text className="Text">
                    Your Address:
                </Text>
                <Text className="Text">
                    Ready to connect to the contract?
                </Text>
                <Text className="Text">
                    You will be prompted to pay for two transactions.
                    The first transaction will publish your requested amount,
                    and the second will publish your secret while simultaneously
                    retrieving the requested amount from the contract.
                </Text>
                <Button  onClick={() => parent.runBackend()}>Connect</Button><br/>

            </PipelineShell>
        );
    }
}

export class BackendRunning extends React.Component {
    async copyToClipborad(button) {
        const {ctcInfoStr} = this.props;
        navigator.clipboard.writeText(ctcInfoStr);
        const origInnerHTML = button.innerHTML;
        button.innerHTML = 'Copied!';
        button.disabled = true;
        await sleep(1000);
        button.innerHTML = origInnerHTML;
        button.disabled = false;
    }

    render() {
        const {ctcInfoStr} = this.props;
        if (ctcInfoStr === undefined) {
            return (
                <ToastMessage>
                    <Text className="Text">
                    Waiting for the contract to deploy...
                    If this takes more than 1 min, something may be wrong.
                    </Text>
                </ToastMessage>
            )
        } else {
            return (
                <PipelineShell>
                    <Heading>Contract Info</Heading>
                    <Text className="Text">The contract is running!
                    Please give Bob the following contract info.
                    </Text>
                    <pre className='ContractInfo'>
            {ctcInfoStr}
          </pre>
                    <br />
                    <Button size="medium"
                        onClick={async (e) => this.copyToClipborad(e.currentTarget)}
                    >Copy to clipboard</Button>
                    <br />

                    <Text className="Text"> will be automatically prompted to approve the next transaction
                    once Bob has paid the requested amount into the contract.</Text>
                </PipelineShell>
            );
        }
    }
}

export class BackendRan extends React.Component {
    render() {
        return (
            <PipelineShell>
                <Text className="Text">
                    Thank you, Alice.
                    The contract has run to completion.
                </Text>
            </PipelineShell>
        );
    }
}

export class AliceWrapper extends React.Component {
    render() {
        const {alice} = this.props;
        return (
            <PipelineShell className="Alice">
                {alice}
            </PipelineShell>
        );
    }
}
