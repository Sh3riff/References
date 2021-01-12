// This Code dynamically renders a table from an array of object, Probably form a JSON response.
// The Functional Component takes two props
    - tableHeader :- An array of the table headers
    - tableData :- An array of object containing row data
    - N.B: If a tableHeader is contains item "img", it is treated as a picture.

import React from 'react';

const Table = ({ tableHeader, tableData }) => {

    return (
        <TableContainer>
                <thead>
                    <tr>
                        {
                            tableHeader.map(header => <th>{header}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                        {
                            tableData.map(data => 
                                <tr>
                                    {
                                        tableHeader.map(item =>
                                            (item === "img") ?
                                            <td><img src={data[item]}  /></td> :
                                            <td>{data[item]}</td>
                                        )
                                    }
                                </tr>
                            )
                        }
                </tbody>
            </TableContainer>
    )
}

export default Table
