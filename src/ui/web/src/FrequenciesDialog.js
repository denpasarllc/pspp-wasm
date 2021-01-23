import React from 'react';
import { Divider, Grid, Segment, Button, List, Icon, Header, Modal, Container } from 'semantic-ui-react'

const STATS = [
    {
        name: 'Mean',
        syntaxName: 'MEAN',
        selectedByDefault: true,
    },
    {
        name: 'Standard Deviation',
        syntaxName: 'STDDEV',
        selectedByDefault: true,
    },
    {
        name: 'Minimum',
        syntaxName: 'MINIMUM',
        selectedByDefault: true,
    },
    {
        name: 'Maximum',
        syntaxName: 'MAXIMUM',
        selectedByDefault: true,
    },
    {
        name: 'Standard error of the mean',
        syntaxName: 'SEMEAN',
        selectedByDefault: false,
    },
    {
        name: 'Variance',
        syntaxName: 'VARIANCE',
        selectedByDefault: false,
    },
    {
        name: 'Skewness',
        syntaxName: 'SKEWNESS',
        selectedByDefault: false,
    },
    {
        name: 'Standard error of the skewness',
        syntaxName: 'SESKEW',
        selectedByDefault: false,
    },
    {
        name: 'Range',
        syntaxName: 'RANGE',
        selectedByDefault: false,
    },
    {
        name: 'Mode',
        syntaxName: 'MODE',
        selectedByDefault: false,
    },
    {
        name: 'Kurtosis',
        syntaxName: 'KURTOSIS',
        selectedByDefault: false,
    },
    {
        name: 'Standard error of the kurtosis',
        syntaxName: 'SEKURT',
        selectedByDefault: false,
    },
    {
        name: 'Sum',
        syntaxName: 'SUM',
        selectedByDefault: false,
    },

];

class FrequenciesDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVars : [],
            show: false,
            stats: STATS.map((s, i) => {
                return {
                    i: i,
                    name: s.name,
                    syntaxName: s.syntaxName,
                    selected: s.selectedByDefault
                };
            }),
        };

    }

    render() {
        const title = <div onClick={() => this.setState({ show: true})}>Frequencies</div>;
        if (!this.state.show) {
            return <span>{title}</span>
        }
        let vars = this.props.vars.map((v, i) => { return { i: i, name: v, selected: this.state.selectedVars.indexOf(v) > -1 } });

        return (
            <>
            <span>{title}</span>
            <Modal
                onClose={() => this.setState({ show: false })}
                onOpen={() => this.setState({ show: true })}
                open={this.state.show}
            >
                <div>


                    <Segment>
                        <Grid columns={2} relaxed={false}>
                            <Grid.Column>
                                <Header as='h3' textAlign='center'>Variables</Header>
                                <Divider />
                                <List selection verticalAlign='middle'>
                                    {
                                        vars.map((v,k) => {
                                            const icon = v.selected ? <Icon name="check" /> : null;
                                            return <List.Item key={k} style={{ color: v.selected ? 'black' : 'gray' }}
                                                onClick={() => {
                                                    let svs = [...this.state.selectedVars];
                                                    if (v.selected) {
                                                        svs.splice(svs.indexOf(v.name), 1);
                                                    } else {
                                                        svs.push(v.name);
                                                    }
                                                    this.setState({ selectedVars: svs });
                                                }}

                                            >
                                                {icon}
                                                <List.Content>{v.name}</List.Content>
                                            </List.Item>;
                                        })
                                    }
                                </List>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h3' textAlign='center'>Statistics</Header>
                                <Divider />
                                <List selection verticalAlign='middle'>
                                    {
                                        this.state.stats.map((stat, k) => {
                                            const icon = stat.selected ? <Icon name="check" /> : null;
                                            return <List.Item key={k} style={{ color: stat.selected ? 'black' : 'gray' }}
                                                onClick={() => {
                                                    this.state.stats[stat.i].selected = !this.state.stats[stat.i].selected;
                                                    this.setState({ stats: [...this.state.stats] })
                                                }}
                                            >{icon}<List.Content>{stat.name}</List.Content></List.Item>;
                                        })
                                    }
                                </List>
                            </Grid.Column>
                        </Grid>
                        <Divider />

                        <Container textAlign='right'>
            <Button onClick={() => { this.generateSyntax(); this.setState({show:false}); }} disabled={!this.selectionsAreValid()}>OK</Button>
                            <Button>Reset</Button>
                            <Button onClick={ () => { this.setState({show: false}) } }>Cancel</Button>
                        </Container>
                    </Segment>

                </div>


            </Modal>
            </>)
    }

    selectionsAreValid() {
        const varsSelected = this.state.selectedVars.length;
        const statsSelected = this.state.stats.reduce((acc, s) => acc + (s.selected ? 1 : 0), 0)
        return varsSelected > 0 && statsSelected > 0;

    }

    generateSyntax() {
        const buffer = ["FREQUENCIES\n\t/VARIABLES="];
        this.state.selectedVars.forEach(v => { buffer.push(v); buffer.push(" "); });
        buffer.push("\n\t/STATISTICS=");
        this.state.stats.forEach(s => { if (!s.selected) return; buffer.push(s.syntaxName); buffer.push(" "); });
        buffer.push(".\n");
        const syntax = buffer.join("");
        alert(syntax);
        this.props.onSyntax(syntax);
    };

}

export default FrequenciesDialog;
