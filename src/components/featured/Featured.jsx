import './featured.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Revenu total</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <p className="title">Total des ventes réalisées aujourd'hui</p>
        <p className="amount">€ 420</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          porro aliquid quam fuga mollitia, fugit aut modi earum cupiditate
          voluptates dolor numquam optio natus laborum, laboriosam dolores
          architecto rem.
        </p>
      </div>
    </div>
  );
};

export default Featured;
