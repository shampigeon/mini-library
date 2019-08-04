import React, { Component } from 'react';
import {connect} from "react-redux";
import {getBooksList, saveBook} from "../../actions/libraryActions";
// import Nouislider from 'react-nouislider';
// import '../../assets/css/nouislider.css';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class Page1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            budgetStart: 20,
            budgetEnd: 80
        };
    }


    onSlide = (render, handle, value, un, percent) => {

        console.log('value', value);
        console.log('percent', percent);

        this.setState({
            budgetStart: Math.round(value[0]),
            budgetEnd: Math.round(value[1]),
            percent: percent[0].toFixed(2)
        });
    };


    render() {

        const {budgetStart, budgetEnd} = this.state;

        return (
            <div className="main-wrap">
                <div className="main-wrap__header">
                    <div className="main-wrap__header__left">КВАРТИРАТОР</div>
                    <div className="main-wrap__header__right">
                        <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"/>
                        &nbsp;
                        На сайт
                    </div>
                </div>

                <div className="main-wrap__toolbar">
                    <div className="crow">
                        <div className="main-wrap__toolbar__head">
                            <div className="main-wrap__toolbar__head__left">
                                Выберите <br/> апартаменты
                            </div>
                            <div className="main-wrap__toolbar__head__right">
                                <span className="glyphicon glyphicon-repeat" aria-hidden="true"/>
                            </div>
                        </div>
                    </div>
                    <div className="crow slider-wrapper">
                        <Nouislider
                            tooltips={false}
                            onSlide={this.onSlide}
                            range={{ min: 0, max: 100 }}
                            start={[20, 80]}
                            connect
                        />
                        <div className="slider-wrapper__vals">
                            <div className="slider-wrapper__vals__left">
                                Бюджет от {budgetStart}
                            </div>
                            <div className="slider-wrapper__vals__right">
                                до {budgetEnd} млн.руб
                            </div>
                        </div>
                    </div>
                    <div className="crow">
                        <div className="c-btn-group">
                            <div className="c-btn-group__item c-btn-group__item--left">Студия</div>
                            <div className="c-btn-group__item c-btn-group__item--active">1</div>
                            <div className="c-btn-group__item">2</div>
                            <div className="c-btn-group__item">3</div>
                            <div className="c-btn-group__item c-btn-group__item--right">4+</div>
                        </div>
                    </div>

                    <div className="crow">
                        <div className="c-btn-group">
                            <div className="c-btn-group__item c-btn-group__item--left">Вид на город</div>
                            <div className="c-btn-group__item">Проспект</div>
                            <div className="c-btn-group__item c-btn-group__item--right">Парк Фили</div>
                        </div>
                    </div>

                    <div className="crow">
                        <div className="c-btn-group">
                            <div className="c-btn-group__item c-btn-group__item--left">Для жилья</div>
                            <div className="c-btn-group__item c-btn-group__item--right">Для инвестиций</div>
                        </div>
                    </div>
                </div>
                <div className="add-params">
                    <div className="add-params__button">Добавить параметры</div>
                </div>




                <div className="useful">
                    <div className="useful__header">Полезно инвестору</div>
                    <div className="useful__item">
                        <a href="#" target="_blank">Как расчитать окупаемость сдаваемого жилья?</a>
                    </div>

                    <div className="useful__item">
                        <a href="#" target="_blank">Какие квартиры лучше сдаются?</a>
                    </div>

                    <div className="useful__item">
                        <a href="#" target="_blank">Сдавать квартиру с отделкой или без?</a>
                    </div>
                </div>

                <div className="add-params">
                    <div className="add-params__button">Ещё статьи</div>
                </div>


                <div className="consult">
                    <div className="consult__header">Нужна консультация специалиста?</div>
                    <div className="consult__item">
                        Оставьте свой номер и мы перезвоним вам в течение часа
                    </div>

                    <div className="consult__sender">
                        <input type="text" placeholder="+7 000 000-00-00" />
                    </div>
                </div>


                <div className="show-button">
                    <button>
                        Всего найдено 47 квартир
                    </button>

                </div>

            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        ownProps,
        libraryData: state.libraryData,
    }),
    dispatch => ({
        onGetBooks: (filter = '') => {
            dispatch(getBooksList(filter));
        },
        onSaveBook: (data, callback = () => {}) => {
            dispatch(saveBook(data));
            callback();
        }
    })
)(Page1);