import _ from 'lodash';

export const Table = (r, c) => {
    
    return (
        <table>
            <tbody>
                {
                    _.times( r, () => <tr>{ _.times( c,() => <td></td> )}</tr>)
                }
            </tbody>
        </table> 
    )
}