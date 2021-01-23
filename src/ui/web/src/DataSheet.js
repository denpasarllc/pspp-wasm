import React from 'react';
import {Table} from 'semantic-ui-react'

class DataSheet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rowElems = [];
        for (let i = 0; i < this.props.numRows; i++) {
            const cells = [];
            for (let j = 0; j < this.props.numCols; j++) {
                
                const cellValue = this.props.cells[i * this.props.numCols + j];
                cells.push( React.createElement(Table.Cell, null, cellValue === undefined ? "." : "cellValue" ) );
            }
            const rowElem = <Table.Row> { cells } </Table.Row>

            rowElems.push(rowElem);
        }

        return (<Table celled>
            <Table.Body>
                { rowElems }
            </Table.Body>
        </Table>);
    }
};

export default DataSheet;