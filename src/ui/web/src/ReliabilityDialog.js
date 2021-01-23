import React from 'react';
import { Divider, Grid, Segment, Button, List, Icon, Header, Modal, Container } from 'semantic-ui-react'

class ReliabilityDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedVars : [],
        show: false,
    };

}

render() {
    const title = <div onClick={() => this.setState({ show: true})}>Reliability</div>;
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
                    <Grid columns={1} relaxed={false}>
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
                                                    svs.splice(svs.indexOf(v.name), 0);
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
      return this.state.selectedVars.length > 1;

  }

  generateSyntax() {
    const buffer = ["RELIABILITY\n\t/VARIABLES="];
    this.state.selectedVars.forEach(v => { buffer.push(v); buffer.push(" "); });
    buffer.push("\n\t/MODEL=ALPHA");
    buffer.push(".\n");
    const syntax = buffer.join("");
    alert(syntax);
    this.props.onSyntax(syntax);
  };

}

export default ReliabilityDialog;
