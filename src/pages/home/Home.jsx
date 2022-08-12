import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import axios from 'axios';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import { useEffect, useState } from 'react';

const Home = () => {
  const [usersNumber, setUsersNumber] = useState();
  const [ordersNumber, setOrdersNumber] = useState();
  const [gains, setGains] = useState();
  const [orders, setOrders] = useState([]);

  const calculGains = async (orders) => {
    let total = 0;
    orders.map((order) => (total = total + order.amount));
    setGains(total);
  };

  useEffect(() => {
    const getUsersNumber = async () => {
      try {
        const users = await axios.get('http://localhost:8800/api/users/');
        setUsersNumber(users.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    const getOrdersNumber = async () => {
      try {
        const orders = await axios.get('http://localhost:8800/api/orders/');
        setOrdersNumber(orders.data.length);
        await calculGains(orders.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getOrders = async () => {
      try {
        const orders = await axios.get('http://localhost:8800/api/orders/');
        setOrders(orders.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersNumber();
    getOrdersNumber();
    getOrders();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" count={usersNumber} />
          <Widget type="order" count={ordersNumber} />
          <Widget type="earning" count={gains} />
          {/* <Widget type="balance" count="0" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Dernière ventes (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Dernières transactions</div>
          <Table rows={orders} />
        </div>
      </div>
    </div>
  );
};

export default Home;
