import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';
import { useLocation } from 'react-router-dom';

const List = () => {
  const path = useLocation().pathname.split('/')[1];
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable dataToFetch={path} />
      </div>
    </div>
  );
};

export default List;
