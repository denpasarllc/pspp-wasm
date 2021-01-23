import React from 'react';
import { Divider, Grid, Segment, Button, List, Icon, Header, Modal, Container } from 'semantic-ui-react'

class LinearRegressionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        show: false,
        selectedIndep : [],
        selectedDep : [],
    };
    }

  render() {
    const title = <div onClick={() => this.setState({ show : !this.state.show}) }>Linear Regression</div>;
    if (!this.state.show) {
        return <div>{title}</div>
    }
    let vars = this.props.vars.map((v, i) => { return {
      i: i, 
      name: v,
      indep: this.state.selectedIndep.indexOf(v) > -1,
      dep: this.state.selectedDep.indexOf(v) > -1,
     } });

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
                          <Header as='h3' textAlign='center'>Independent</Header>
                          <Divider />
                          <List selection verticalAlign='middle'>
                              {
                                  vars.map((v,k) => {
                                    if (v.dep) return null;

                                      const icon = v.indep ? <Icon name="check" /> : null;
                                      return <List.Item key={k} style={{ color: v.indep ? 'black' : 'gray' }}
                                          onClick={() => {
                                              let sIndep = [...this.state.selectedIndep];
                                              let idx = sIndep.indexOf(v.name);
                                              if (idx > -1) {
                                                sIndep.splice(idx, 1);
                                              } else {
                                                sIndep.push(v.name);
                                              }
                                              this.setState({ selectedIndep: sIndep });
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
                          <Header as='h3' textAlign='center'>Dependent</Header>
                          <Divider />
                          <List selection verticalAlign='middle'>
                              {
                                vars.map((v,k) => {
                                    if (v.indep) return null;

                                    const icon = v.dep ? <Icon name="check" /> : null;
                                    return <List.Item key={k} style={{ color: v.dep ? 'black' : 'gray' }}
                                        onClick={() => {
                                            let sDep = [...this.state.selectedDep];
                                            let idx = sDep.indexOf(v.name);
                                            
                                            if (idx > -1) {
                                              sDep.splice(idx, 1);
                                            } else {
                                              sDep.push(v.name);
                                            }

                                            this.setState({ selectedDep: sDep });
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
    return this.state.selectedDep.length > 0 && this.state.selectedIndep.length > 0;
  }

  generateSyntax() {
    const buffer = ["REGRESSION\n\t/VARIABLES="];
    this.state.selectedIndep.forEach(v => { buffer.push(v); buffer.push(" "); });
    buffer.push("\n\t/DEPENDENT=");
    this.state.selectedDep.forEach(v => { buffer.push(v); buffer.push(" "); });
    buffer.push("\n\t/METHOD=ENTER");
    buffer.push("\n\t/STATISTICS=COEFF R ANOVA");
    buffer.push(".\n");
    const syntax = buffer.join("");
    alert(syntax);
    this.props.onSyntax(syntax);
  };

}

export default LinearRegressionDialog;
