import React from 'react';
import './App.css';

import FrequenciesDialog from './FrequenciesDialog';
import FactorAnalysisDialog from './FactorAnalysisDialog';
import ReliabilityDialog from './ReliabilityDialog';
import LinearRegressionDialog from './LinearRegressionDialog';
import ChiSquareDialog from './ChiSquareDialog';
import BinomialDialog from './BinomialDialog';
import RunsDialog from './RunsDialog';
import DataSheet from './DataSheet';

import 'semantic-ui-css/semantic.min.css';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';



import {Dropdown, Icon, Menu, Segment, Grid, Table, Divider} from 'semantic-ui-react'

import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";


function ExecuteSyntax(syntax) {
  const wm = window.Module;
  // Create a pointer using the 'Glue' method and the String value var ptr  =
  // wm.allocate(wm.intArrayFromString(syntax), 'i8', wm.ALLOC_NORMAL);
  let res = wm.ccall('execute_ui_generated_syntax', 'int', ['string'], [syntax]);
  console.log(res);
  return res;
  // wm._free(ptr);
}

function RefreshGrid() {
  window.Module.ccall('refresh_grid', null, null, null);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDataMenu: false,
      showTransformMenu: false,
      showAnalyzeMenu: false,
      showGraphsMenu: false,
      cells :  [],
      columns : [],
      vars : [],
      data : [],
    };

    window.initSheet = (rows, cols)  => {
      var columns = [];
      for (var i = 0; i < cols; i++) {
        const name = i < this.state.vars.length && this.state.vars[i] != null ? this.state.vars[i] : "VAR-" + i.toString();
        columns.push({ columnId : name, width : 100 });
      }

      var rowss = [];
      for (let i = 0; i < rows; i++) {
        rowss.push({ rowId : i + 1, cells: [] });
        for (let j = 0; j < cols; j++) {
          rowss[i].cells.push({ type : "text", text: "" });
        }
      }

      rowss.unshift({ rowId: 0, cells : columns.map(c =>  ({ type : "header", text: c.columnId }) )  });

      this.setState({ cells : rowss, columns : columns });
    };

    window.setCell = (row, col, val)  => {
    //   row++;
    //   this.setState({ cells : this.state.cells.map((r, i) => {
    //     if (i !== row) return r;
    //     return {
    //         rowId : r.rowId,
    //         cells : r.cells.map((c, j) => {
    //           if (j != col) return c;
    //           return { type : "text",  text : val.toString() }
    //           })
    //       }
    //   })
    // });
    };

    window.setVarName = (i, namePtr) => {
      const view = new Uint8Array(window.wasmMemory.buffer, namePtr, 100);
      let name = '';
      let j = 0;
      while (view[j] != 0) {
        name += String.fromCharCode(view[j]);
        j++;
      } // UTF8ToSTring ?]

      let vars = [...this.state.vars];
      while (i > vars.length - 1) {
        vars.push(null);
      }
      vars[i] = name;
      this.setState({ vars : vars });
    };

    window.setGridBuffer = (rows, cols, buffer) => {
      const view = new Float64Array(window.wasmMemory.buffer, buffer);
      const data = [];
      for (let i = 0; i < rows; i++) {
        let r = [];
        data.push(r);
        for (let j = 0; j < cols; j++) {
          if (view[i * cols + j] == -1.7976931348623157e+308) {
            r.push(null);
            continue;
          }
          r.push(view[i * cols + j]);
        }
      }
      this.setState({ numRows: rows, numCols: cols, cells : view.slice(0), data : data });
      console.log(this.state);
      window._free(buffer);
    };


  }

  componentDidMount() {
    window.initSheet(10, 10);
  }

  getVars() {
    return this.state.vars.filter(v => v != null);
  }

  gridChange(ch, src) {
    console.log(src);
    if (src !== "edit" && src !== "CopyPaste.paste") return;

    console.log(ch);

    ch.forEach(change => {
      if (change[0] === 0) {
        // Var name
        const syntax = `RENAME VARIABLES ${change[2]}=${change[3]}.`
        alert(syntax);
        if (ExecuteSyntax(syntax) < 0) {
          // error
          alert("Rename failed!");
          this.setState({ vars: this.state.vars.map((v, i) => i === change[1] ? change[2] : v) }); // reset
          return;
        }
        this.setState({ vars: this.state.vars.map((v, i) => i === change[1] ? change[3] : v) });
        return;
      }
      if (change[2] && (change[2].toString() == change[3])) return;
      const syntax = `IF $CASENUM=${ change[0] } ${ this.state.vars[ change[1] ]}=${change[3]}.`;
      if (ExecuteSyntax(syntax) < 0) {
        alert("Edit failed! Please double check acceptable values for this column");
        this.setState({ data : this.state.data.map((row, i) => {
          if (i !== change[0] - 1) return row;
          let _row = [...row];
          _row[change[1]] = change[2];
          console.log(_row);
          return _row;
        })});
      }
    })


  }

  render() {
    const hotData = [...this.state.data];
    hotData.unshift(this.state.vars);

    return (
      <div className="App">

        <Grid columns={1}>
        <Menu attached='top'>
          <Dropdown item icon={null} text='File' simple>
            <Dropdown.Menu>
              <Dropdown.Item>Open</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item icon={null} text='Analyze' simple>
            <Dropdown.Menu>
              <Dropdown.Item><FrequenciesDialog vars={this.getVars()} onSyntax={ExecuteSyntax}/></Dropdown.Item>
              <Dropdown.Item><FactorAnalysisDialog vars={this.getVars()} onSyntax={ExecuteSyntax}/></Dropdown.Item>
              <Dropdown.Item><ReliabilityDialog vars={this.getVars()} onSyntax={ExecuteSyntax}/></Dropdown.Item>
              <Dropdown.Item><LinearRegressionDialog vars={this.getVars()} onSyntax={ExecuteSyntax}/></Dropdown.Item>
              <Dropdown.Item><ChiSquareDialog vars={this.getVars()} onSyntax={ExecuteSyntax}/></Dropdown.Item>
              <Dropdown.Item><BinomialDialog vars={this.getVars()} onSyntax={ExecuteSyntax}/></Dropdown.Item>
              <Dropdown.Item><RunsDialog vars={this.getVars()} onSyntax={ExecuteSyntax}/></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item icon={null} text='Graphs' simple>
            <Dropdown.Menu>
              <Dropdown.Item>Scatterplot</Dropdown.Item>
              <Dropdown.Item>Histogram</Dropdown.Item>
              <Dropdown.Item>Barchart</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item icon={null} text='Output' simple/>


        </Menu>
        </Grid>

        <Grid columns={1}>
        {/* <ReactGrid
          rows={this.state.cells}
          columns={this.state.columns}
          stickyTopRows={1}/> */}

          <div id="hot-app">
          <HotTable id="hot" colHeaders={false} fixedRowsTop={0}
            afterChange={this.gridChange.bind(this)}
          licenseKey="non-commercial-and-evaluation" settings={{
            data: hotData,
            
            contextMenu: {
              items: {
                'sort_asc': {
                  name: 'Sort by column(s) (ASC)',
                  callback: (name, arg1) => { console.log(arg1);
                    let col = arg1[0].start.col;
                    const syntax = `SORT CASES BY ${this.state.vars[col]} .\n`; // Can sort by >1 var here
                    ExecuteSyntax(syntax);
                    this.setState({ data : [] });
                    RefreshGrid();

                  }
                },
                'sort_desc': {
                  name: 'Sort by column(s) (DESC)',
                  callback: (name, arg1) => { console.log(arg1);
                    let col = arg1[0].start.col;
                    const syntax = `SORT CASES BY ${this.state.vars[col]} (D) .\n`; // Can sort by >1 var here
                    ExecuteSyntax(syntax);
                    this.setState({ data : [] });
                    RefreshGrid();

                  }
                },
                'row_below': {},
                'clear_custom': {
                  name: 'Clear all cells (custom)',
                  callback: function() {
                    this.clear();
                  }
                }
              }
            }
            }} />
          </div>
          {/* <DataSheet numRows={this.state.numRows} numCols={this.state.numCols} cells={this.state.cells}/> */}
        </Grid>
        <Divider/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }

}

export default App;
