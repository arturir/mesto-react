import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
export default function AddPlacePopup ({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState(''),
        [link, setLink] = useState('');
  
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
    onClose();
  } 

  return (
    <PopupWithForm title={'Новое место'} 
                   onSubmit={handleSubmit}
                   name={'new-card'} 
                   isOpen={isOpen} 
                   onClose={onClose}>
      <input id="new-place-form-place" type="text" className="form__text" name="name" placeholder="Название" minLength="2" maxLength="30" required onChange={handleChangeName}/>
      <span className="form__input-error new-place-form-place-error"></span>
      <input id="new-place-form-link" type="url" className="form__text" name="link" placeholder="Ссылка на картинку" required onChange={handleChangeLink}/>
      <span className="form__input-error new-place-form-link-error"></span>
    </PopupWithForm>
  )

}