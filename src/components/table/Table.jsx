import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const List = (props) => {
  const { rows } = props;

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8800/api/orders/${id}`);
      console.log(res.data);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID de suivi</TableCell>
            <TableCell className="tableCell">Produit(s)</TableCell>
            <TableCell className="tableCell">Client</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Montant</TableCell>
            <TableCell className="tableCell">Mode de paiement</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Suppr.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.trackingID}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img
                    src={'http://localhost:8800/uploads/' + row.productImg}
                    alt=""
                    className="image"
                  />
                  {/* {row.product} */}
                  {row.product.map((pr) => `${pr.name}              `)}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">
                {moment(row.createdAt).format('DD-MM-YYYY')}
              </TableCell>
              <TableCell className="tableCell">{row.amount} €</TableCell>
              <TableCell className="tableCell">{row.paymentMethod}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
              <TableCell className="tableCell">
                <DeleteIcon
                  onClick={() => handleDeleteProduct(row._id)}
                  style={{ color: 'red' }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
