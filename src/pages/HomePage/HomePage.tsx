import { AddBykeForm } from '../../components/AddBykeForm/AddBykeForm';
import { BykeList } from '../../components/BykeList/BykeList';
import { Statistic } from '../../components/Statistic/Statistic';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="">
      <div className="columns">
        <div className="column is-7">
          <BykeList />
        </div>

        <div className="column is-5">
          <AddBykeForm />
          <hr className="bg-dark" />
          <Statistic />
        </div>
      </div>
    </div>
  );
}