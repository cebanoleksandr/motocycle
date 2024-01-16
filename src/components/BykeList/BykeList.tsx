import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { BykeCard } from '../BykeCard/BykeCard';
import './BykeList.scss';
import { getBykes } from '../../api/bykes';
import { setBykes } from '../../redux/bykeReducer';
import { Loader } from '../Loader/Loader';

export const BykeList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const bykes = useAppSelector(state => state.bikes.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getBykes()
      .then((res) => {
        dispatch(setBykes(res.data));
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="byke-list">
      {!!bykes.length ? (
        <ul>
          {bykes.map(byke => (
            <BykeCard key={byke.id} byke={byke} />
          ))}
        </ul>
      ) : (
        <h2 className="is-size-2">
          There are no bykes yet. Please, add the first one!
        </h2>
      )}
    </div>
  );
}
