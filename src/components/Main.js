import {useState, useEffect, useContext} from 'react';
import api from '../utils/Api'
import Card from './Card';
import addButton from '../images/add.svg';
import avatar from '../images/avatar.jpg';
import {CurrentUserContext} from './../contexts/CurrentUserContext'
export default function Main ({handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, onCardClick}) {

    // const [userName, setUserName] = useState("Жак-ив Кусто"),
    //       [userDescription , setuserDescription] = useState("Исследователь Океана"),
    //       [userAvatar, setUserAvatar] = useState(avatar),
    const [cards, setCards] = useState([]);

    const currentUser = useContext(CurrentUserContext);

    function handleResponseError (error, textError) {
        console.log(error, " ", textError);
    }
    
    // useEffect(()=> {
    //     api.getUserInfo()
    //     .then(({name, about, avatar}) => {
    //         setUserName(name);
    //         setuserDescription(about); 
    //         setUserAvatar(avatar);
    //     })
    //     .catch((error)=> {
    //         handleResponseError(error, "Ошибка получения информации о пользователе");
    //     });
    //     }, []);
    useEffect(()=> {
        api.getCards()
        .then(data => {
            setCards(data)
        })
        .catch((error)=> {
            handleResponseError(error, "Ошибка получения карточек мест")
        });
    }, []);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__left-column">
                    <div className="profile__avatar" onClick={handleEditAvatarClick} style={{ backgroundImage: `url(${currentUser ? currentUser.avatar : ''})` }} > 
                    </div>
                    <div className="profile__info">
                        <div className="profile__wrapper-name">
                            <h1 className="profile__name">{currentUser ?  currentUser.name : ''}</h1>
                            <button type="button" className="profile__edit" onClick={handleEditProfileClick}></button>
                        </div>
                        <h2 className="profile__metier">{currentUser ? currentUser.about : ''}</h2>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}>
                    <img src={addButton} className="profile__add" alt="Добавить" />
                </button>
            </section>
            <section className="cards">
                {cards.map((card)=> (
                    <Card card={card} onCardClick={onCardClick} key={card._id} />
                ))}
            </section>
        </main>
    )
    
}