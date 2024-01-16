import { useState } from 'react';
import './AddBykeForm.scss';
import { Byke } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addBykeAC } from '../../redux/bykeReducer';
import classNames from 'classnames';
import { addByke } from '../../api/bykes';

export const AddBykeForm = () => {
  const ids = useAppSelector(state => state.bikes.items).map(b => b.id);
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [wheelSize, setWheelSize] = useState('');
  const [bykeId, setBykeId] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [colorError, setColorError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [wheelSizeError, setWheelSizeError] = useState('');
  const [bykeIdError, setBykeIdError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const pattern = /^\d+(\.\d{1,2})?$/;
  const pattern2 = /^\d+$/;

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!nameError) {
      validateName();
    }

    setName(e.target.value);
  }

  const changeColorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!colorError) {
      validateColor();
    }

    setColor(e.target.value);
  }

  const changeTypeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!typeError) {
      validateType();
    }

    setType(e.target.value);
  }

  const changePriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!priceError) {
      validatePrice();
    }

    setPrice(e.target.value);
  }

  const changeWheelSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!wheelSizeError) {
      validateWheelSize();
    }

    setWheelSize(e.target.value);
  }

  const changeIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!bykeIdError) {
      validateId();
    }

    setBykeId(e.target.value);
  }

  const changeDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!!descriptionError) {
      validateDescription();
    }

    setDescription(e.target.value);
  }

  const validateName = () => {
    if (!name.trim()) {
      setNameError(() => 'Name is require');
    } else if (name.trim().length < 5) {
      setNameError(() => 'It must be at least 5 cheracters');
    } else {
      setNameError('');
    }
  }

  const validateColor = () => {
    if (!color.trim()) {
      setColorError(() => 'Color is require');
    } else if (color.trim().length < 5) {
      setColorError(() => 'It must be at least 5 cheracters');
    } else {
      setColorError('');
    }
  }

  const validateType = () => {
    if (!type.trim()) {
      setTypeError(() => 'Type is require');
    } else if (type.trim().length < 5) {
      setTypeError(() => 'It must be at least 5 cheracters');
    } else {
      setTypeError('');
    }
  }

  const validateDescription = () => {
    if (!description.trim()) {
      setDescriptionError(() => 'Description is require');
    } else if (description.trim().length < 5) {
      setDescriptionError(() => 'It must be at least 5 cheracters');
    } else {
      setDescriptionError('');
    }
  }

  const validatePrice = () => {
    if (!price.trim()) {
      setPriceError(() => 'Price is require');
    } else if (!pattern.test(price.trim())) {
      setPriceError(() => 'Please, enter the correct price');
    } else {
      setPriceError('');
    }
  }

  const validateId =  () => {
    if (!bykeId.trim()) {
      setBykeIdError(() => 'ID is require');
    } else if (bykeId.trim().length < 5) {
      setBykeIdError(() => 'It must be at least 5 cheracters');
    } else if (ids.includes(bykeId.trim())) {
      setBykeIdError(() => 'ID must be unique. Please, enter another one');
    } else {
      setBykeIdError('');
    }
  }

  const validateWheelSize = () => {
    if (!wheelSize.trim()) {
      setWheelSizeError(() => 'Wheel size is require');
    } else if (!pattern2.test(wheelSize.trim())) {
      setWheelSizeError(() => 'Please, enter the correct wheel size');
    } else if (wheelSize.trim().length < 5) {
      setWheelSizeError(() => 'It must be at least 5 cheracters');
    } else {
      setWheelSizeError('');
    }
  }

  const validateForm = () => {
    validateName();
    validateColor();
    validateType();
    validateDescription();
    validatePrice();
    validateId();
    validateWheelSize();
  }

  const reset = () => {
    setName('');
    setColor('');
    setPrice('');
    setType('');
    setWheelSize('');
    setBykeId('');
    setDescription('');

    setNameError('');
    setColorError('');
    setPriceError('');
    setTypeError('');
    setWheelSizeError('');
    setBykeIdError('');
    setDescriptionError('');
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    validateForm();

    if (
      !name.trim() || name.trim().length < 5
      || !color.trim() || color.trim().length < 5
      || !price.trim()
      || !type.trim() || type.trim().length < 5
      || !wheelSize.trim() || wheelSize.trim().length < 5
      || !bykeId.trim() || bykeId.trim().length < 5
      || !description.trim() || description.trim().length < 5
      || !pattern.test(price.trim())
      || ids.includes(bykeId.trim())
      || !pattern2.test(wheelSize.trim())
    ) {
      return;
    }

    const newByke: Byke = {
      id: bykeId,
      name,
      type,
      color,
      wheel_size: wheelSize,
      price: +price,
      status: 'available',
      description
    }

    addByke(newByke)
      .then((res) => {
        reset();
        dispatch(addBykeAC(res.data));
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="columns">
        <div className="column is-6">
          <div className="field">
            <div className="control">
              <input
                className={classNames('input bg-light-grey is-small', {
                  'is-danger': !!nameError
                })}
                type="text"
                placeholder="Name"
                value={name}
                onChange={changeNameHandler}
              />
            </div>
            <div className="error-container">
              <small className="has-text-danger small">{nameError}</small>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className={classNames('input bg-light-grey is-small', {
                  'is-danger': !!colorError
                })}
                type="text"
                placeholder="Color"
                value={color}
                onChange={changeColorHandler}
              />
            </div>
            <div className="error-container">
              <small className="has-text-danger small">{colorError}</small>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className={classNames('input bg-light-grey is-small', {
                  'is-danger': !!priceError
                })}
                type="text"
                placeholder="Price"
                value={price}
                onChange={changePriceHandler}
              />
            </div>
            <div className="error-container">
              <small className="has-text-danger small">{priceError}</small>
            </div>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <div className="control">
              <input
                className={classNames('input bg-light-grey is-small', {
                  'is-danger': !!typeError
                })}
                type="text"
                placeholder="Type"
                value={type}
                onChange={changeTypeHandler}
              />
            </div>
            <div className="error-container">
              <small className="has-text-danger small">{typeError}</small>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className={classNames('input bg-light-grey is-small', {
                  'is-danger': !!wheelSizeError
                })}
                type="text"
                placeholder="Wheel size"
                value={wheelSize}
                onChange={changeWheelSizeHandler}
              />
            </div>
            <div className="error-container">
              <small className="has-text-danger small">{wheelSizeError}</small>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className={classNames('input bg-light-grey is-small', {
                  'is-danger': !!bykeIdError
                })}
                type="text"
                placeholder="ID (slug): xxxxxxx"
                value={bykeId}
                onChange={changeIdHandler}
              />
            </div>
            <div className="error-container">
              <small className="has-text-danger small">{bykeIdError}</small>
            </div>
          </div>
        </div>
      </div>

      <textarea
        className={classNames('textarea bg-light-grey is-small', {
          'is-danger': !!descriptionError
        })}
        placeholder="Description"
        value={description}
        onChange={changeDescriptionHandler}
      ></textarea>
      <div className="error-container">
        <small className="has-text-danger small">{descriptionError}</small>
      </div>

      <div className="btns mt-3">
        <button
          type="submit"
          className="button btn-block mr-3 is-dark"
        >SAVE</button>

        <button
          type="reset"
          className="button btn-block is-dark"
          onClick={reset}
        >CLEAR</button>
      </div>
    </form>
  );
}