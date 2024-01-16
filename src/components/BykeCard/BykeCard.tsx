import { Link } from 'react-router-dom';
import { removeByke, updateByke } from '../../api/bykes';
import { removeBykeAC, setStatus } from '../../redux/bykeReducer';
import { useAppDispatch } from '../../redux/hooks';
import { Byke, Status } from '../../utils/types';
import './BykeCard.scss';

type Props = {
  byke: Byke;
}

export const BykeCard: React.FC<Props> = ({ byke }) => {
  const dispatch = useAppDispatch();

  const remove = () => {
    removeByke(byke.id)
      .then(() => {
        dispatch(removeBykeAC(byke.id));
      })
  }

  const onStatusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateByke(byke.id, {status: e.target.value as Status})
      .then((res) => {
        dispatch(setStatus(byke.id, res.data.status));
      })
  }

  return (
    <li className="byke-card px-4 pt-2 pb-2 mb-2 bg-light-grey">
      <div className="byke-info">
        <Link to={`/details/${byke.id}`}>
          <p>
            <span className="byke-name">{byke.name}</span> - {byke.type} ({byke.color})
          </p>
        </Link>

        <small>
          id: {byke.id}
        </small>

        <div className="status">
          STATUS: &nbsp;
          <div className="select is-small">
            <select value={byke.status} onChange={onStatusHandler}>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      <div className="byke-price has-text-right">
        <div>
          <i className="fa fa-close remove-icon" onClick={remove}></i>
        </div>

        <p>{byke.price} UAH/hr</p>
      </div>
    </li>
  );
}
