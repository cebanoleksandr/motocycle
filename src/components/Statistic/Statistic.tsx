import { useAppSelector } from '../../redux/hooks';
import './Statistic.scss';

export const Statistic = () => {
  const bykes = useAppSelector(state => state.bikes.items);
  const availableBykes = bykes.filter(byke => byke.status === 'available');
  const bookedBykes = bykes.filter(byke => byke.status === 'busy');
  const avgPrice = +(
    bykes.map(b => b.price).reduce((b1, b2) => b1 + b2, 0) / bykes.length
  ).toFixed(2) || 0;

  return (
    <div className="statistic">
      <h2 className="is-size-4 bold">STATISTICS</h2>

      <p>
        Total Bikes: <strong>{bykes.length}</strong>
      </p>

      <p>
        Available Bikes: <strong>{availableBykes.length}</strong>
      </p>

      <p>
        Booked Bikes: <strong>{bookedBykes.length}</strong>
      </p>

      <p>
        Average bike cost: <strong>{avgPrice}</strong> UAH/hr
      </p>
    </div>
  );
}
