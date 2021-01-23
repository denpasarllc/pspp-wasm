import React from 'react';


class ChiSquareDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        show: false,
        vars : (this.props.vars || []).map((v, i) => { return { i : i, name: v, selected : false } }),
    };
    }

  render() {
    const title = <div onClick={() => this.setState({ show : !this.state.show}) }>Chi Square</div>;
    if (!this.state.show) {
        return <div>{title}</div>   
    }
    return (<div>
        {title}
        <span>Variables</span>
        {
            this.state.vars.map(v => {
                return <li style={{color : v.selected ? 'green' : 'gray', fontWeight : v.selected ? 'bold' : 'normal' }}
                onClick={() => {
                    this.state.vars[v.i].selected = !this.state.vars[v.i].selected ; 
                    this.setState({ vars : [...this.state.vars]})
                    } }
                >{v.name}</li>;
            })
        }

        <button onClick={() => this.generateSyntax()} disabled={!this.selectionsAreValid()}>OK</button>
        <button>Reset</button>
        <button>Cancel</button>
    </div>);
  }

  selectionsAreValid() {
      const varsSelected = this.state.vars.reduce((acc, v) => acc + (v.selected ? 1 : 0), 0)
      return varsSelected > 0;

  }

  generateSyntax() {
    const buffer = ["NPAR TEST /CHISQUARE="];
    this.state.vars.forEach(v => { if (!v.selected) return; buffer.push(v.name ); buffer.push(" "); });
    buffer.push(".\n");
    const syntax = buffer.join("");
    alert(syntax);
    this.props.onSyntax(syntax);
  };

}

export default ChiSquareDialog;
