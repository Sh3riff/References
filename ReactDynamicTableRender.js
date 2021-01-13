// This Code dynamically renders a table from an array of object, Probably form a JSON response.
// The Functional Component takes three props
    - tableHeader :- An array of the table headers
    - tableData :- An array of object containing row data
    - Config :- An object that contains addition settings
        - uniqueId :- The name of the data property with a unique Id, this is used as key
        - isImage :- An array of data that should be rendered as image
        - editWith : - A function. that is called to edit a row of data
        - delWith : - A function. that is called to delete a row of data
        
        
import React from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { TableContainer } from './TableStyle';

/// Docs
// const config = {
//     uniqueId: "", // item dt has a uniqueId
//     isImage: [], // item dt is an object
//     editWith: "func", // function to edit
//     delWith: "func",  // function to delete
// }

export const Table = ({ tableHeader, tableData, config }) => {
    const { uniqueId, isImage, editWith, delWith } = config;
    return (
        <TableContainer>
                <thead>
                    <tr>
                        {
                            tableHeader.map(header => <th>{header}</th>)
                        }
                        { editWith && <th>Edit</th> }
                        { delWith && <th>Delete</th> }
                    </tr>
                </thead>
                <tbody>
                        {
                            tableData.map(data =>
                                (
                                <tr key={data[uniqueId]}>
                                    {
                                        tableHeader.map(item =>
                                            (isImage.includes(item)) ?
                                            <td><img src={data[item]}  /></td> :
                                            <td>{data[item]}</td>
                                        )
                                    }
                                    { editWith && <td onClick={() => editWith(data)}><MdEdit/></td> }
                                    { delWith &&  <td onClick={() => delWith(data)}><MdDelete/></td> }
                                </tr>

                                )
                            )
                        }
                </tbody>
            </TableContainer>
    )
}
