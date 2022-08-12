import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';
import moment from 'moment';

const Datatable = (props) => {
  const { dataToFetch } = props;
  const [data, setData] = useState([]);

  const [newUserCivility, setNewUserCivility] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  const [newProductName, setNewProductName] = useState('');
  const [newProductType, setNewProductType] = useState(
    '62d048f025ce3e86020f7b8a'
  );
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductPrice, setNewProductPrice] = useState();
  const [newProductDestination, setNewProductDestination] = useState('');
  const [newProductDate, setNewProductDate] = useState('');
  const [newProductImg, setNewProductImg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/api/${dataToFetch}`);
      setData(res.data);
    };
    fetchData();
  }, [dataToFetch]);

  const handleCreateNewProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8800/api/products/add',
        {
          name: newProductName,
          type: newProductType,
          description: newProductDesc,
          price: newProductPrice,
          countryDestination: newProductDestination,
          // travelDate: '25-08-2022',
          imgUrl: newProductImg,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res.data);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNewUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/api/auth/signup', {
        civility: newUserCivility,
        email: newUserEmail,
        password: newUserPassword,
        lastname: 'changeLastname',
        firstname: 'changeFirstname',
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    setData(data.filter((item) => item._id !== id));
    try {
      const res = await axios.delete(`http://localhost:8800/api/users/${id}`, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    setData(data.filter((item) => item._id !== id));
    try {
      const res = await axios.delete(
        `http://localhost:8800/api/products/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    console.log('Hello World');
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: 'none' }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {dataToFetch == 'users' ? <>Utilisateurs</> : <>Produits</>}
      </div>
      {dataToFetch == 'users' ? (
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Civilité</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Pays</th>
              <th>Adresse</th>
              <th>Ville</th>
              <th>CP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.civility}</td>
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td>{user.country}</td>
                <td>{user.address}</td>
                <td>{user.city}</td>
                <td>{user.zipcode}</td>
                <td>
                  <DeleteIcon
                    onClick={() => handleDeleteUser(user._id)}
                    style={{ color: 'red' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.countryDestination}</td>
                <td>{moment(product.travelDate).format('DD-MM-YYYY')}</td>
                <td>
                  <DeleteIcon
                    onClick={() => handleDeleteProduct(product._id)}
                    style={{ color: 'red' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <hr />
      {dataToFetch == 'users' ? (
        <form onSubmit={handleCreateNewUser}>
          <h1>Ajouter un nouvel utilisateur</h1>
          <br />
          <div className="field">
            <div
              className="control"
              onChange={(e) => setNewUserCivility(e.target.value)}
            >
              <label className="radio">
                <input type="radio" value="Monsieur" name="gender" /> Monsieur
              </label>
              <label className="radio">
                <input type="radio" value="Madame" name="gender" /> Madame
              </label>
              <label className="radio">
                <input type="radio" value="Autre" name="gender" /> Autre
              </label>
            </div>
          </div>
          <br />

          <input
            type="email"
            placeholder="Adresse E-Mail"
            required
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de Passe"
            required
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
          <button type="submit">Ajouter</button>
        </form>
      ) : (
        <form onSubmit={handleCreateNewProduct}>
          <h1>Ajouter un nouveau produit</h1>
          <input
            type="text"
            placeholder="Nom du produit"
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => setNewProductDesc(e.target.value)}
          />
          <input
            type="text"
            placeholder="Prix"
            onChange={(e) => setNewProductPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            onChange={(e) => setNewProductDestination(e.target.value)}
          />
          <input
            type="text"
            placeholder="Date du voyage"
            onChange={(e) => setNewProductDate(e.target.value)}
          />
          <input
            type="file"
            placeholder="Image"
            onChange={(e) => setNewProductImg(e.target.files[0])}
          />
          <button type="submit">Ajouter</button>
        </form>
      )}
    </div>
  );
};

export default Datatable;
