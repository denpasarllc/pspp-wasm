import React from 'react';


const STATS = [
    {
        name : 'Mean',
        syntaxName : 'MEAN',
    },
    {
        name : 'Median',
        syntaxName : 'MEDIAN',  
    },
    {
        name : 'Mode',
        syntaxName : 'MODE',  
    },
];

class RunsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        show: false,
        vars : (this.props.vars || []).map((v, i) => { return { i : i, name: v, selected : false } }),
        selectedStat: -1
    };

    }

  render() {
    const title = <div onClick={() => this.setState({ show : !this.state.show}) }>Runs</div>;
    if (!this.state.show) {
        return <div>{title}</div>   
    }
    return <div>
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
        
        <span>Statistics</span>
        { 
            STATS.map((s,i) => {
                const isSelectedStat = i === this.state.selectedStat;
            return <li style={{color : isSelectedStat ? 'green' : 'gray', fontWeight : isSelectedStat ? 'bold' : 'normal' }}
                        onClick={() => {
                            this.setState({ selectedStat : i })
                            } }
                        >{s.name}</li>;
            }) 
        }

        <button onClick={() => this.generateSyntax()} disabled={!this.selectionsAreValid()}>OK</button>
        <button>Reset</button>
        <button>Cancel</button>
    </div>
  }

  selectionsAreValid() {
      const varsSelected = this.state.vars.reduce((acc, v) => acc + (v.selected ? 1 : 0), 0)
      return varsSelected > 0 && this.state.selectedStat !== -1;

  }

  generateSyntax() {
    const buffer = [`NPAR TEST /RUNS(${STATS[this.state.selectedStat].syntaxName})=`];
    this.state.vars.forEach(v => { if (!v.selected) return; buffer.push(v.name ); buffer.push(" "); });
    buffer.push(".\n");
    const syntax = buffer.join("");
    alert(syntax);
    this.props.onSyntax(syntax);
  };

}

export default RunsDialog;
