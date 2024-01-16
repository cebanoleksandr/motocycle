import { useParams } from 'react-router-dom';
import './BykeDetailsPage.scss';
import { useEffect, useState } from 'react';
import { Byke } from '../../utils/types';
import { getBykeById } from '../../api/bykes';
import { Loader } from '../../components/Loader/Loader';

export const BykeDetailsPage = () => {
  const { bykeId } = useParams();
  const [selectedByke, setSelectedByke] = useState<Byke | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const id = bykeId ? bykeId : '';

  useEffect(() => {
    setIsLoading(true);

    getBykeById(id)
      .then((res) => {
        setSelectedByke(res.data)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="columns">
      <div className="column is-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWUBrOc5bMrsHydZLzl5LSxLlsIeTi-aoK9w&usqp=CAU"
          className="byke-img"
          alt=""
        />
      </div>

      <div className="column is-8 px-3">
        <h1 className="is-size-1 has-text-centered">
          {selectedByke?.name}
        </h1>

        <p className="has-text-centered mb-3">
          ({ selectedByke?.type }, { selectedByke?.color })
        </p>

        <p className="has-text-centered mb-3">
          <strong>{selectedByke?.price}</strong> UAH/hr
        </p>

        <p>{selectedByke?.description}</p>
      </div>
    </div>
  );
}
