import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form, Col, Row } from "react-bootstrap";
import Select from 'react-select';
import { saveBook } from '../../actions/libraryActions';
import { saveAuthor } from '../../actions/authorActions';
import { toast } from 'react-toastify';
import AuthorModal from "../../components/Modals/Author/AuthorModal";
import { ErrorList } from "../../components/Notify/Messages";
import { validateValue, getBase64Image, defImage } from "../../helpers/Helpers";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


class BookEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formErrors: {},
            fieldValCondition: {
                label: {
                    types: ['required', 'lesslength'],
                    readName: 'Поле заголовок',
                    params: {
                        vlength: 30
                    }
                }, authors: {
                    types: ['morelength'],
                    message: "Книга должна содержать хотя бы одного автора",
                    params: {
                        vlength: 1
                    }
                }, page_size: {
                    types: ['required', 'number', 'interval'],
                    readName: 'Кол-во страниц',
                    params: {
                        vmin: 0,
                        vmax: 10000,
                    }
                }, publisher: {
                    types: ['required', 'lesslength'],
                    readName: 'Издательство',
                    params: {
                        vlength: 30
                    }
                }, year: {
                    types: ['more'],
                    readName: 'Поле год',
                    params: {
                        vmin: 1800
                    }
                }, circulation_date: {
                    types: ['moredate'],
                    message: "Выход в тираж должен быть не ранее 1800 года",
                    params: {
                        vmin: new Date('01.01.1800').getTime()
                    }
                }, isbn: {
                    types: ['isbn'],
                    params: {}
                }
            },
            book: {
                id: 0,
                label: '',
                authors: [],
                page_size: '',
                image: '',
                publisher: '',
                year: '',
                circulation_date: '01.01.2019',
                isbn: ''
            },
            newAuthor: {
                first_name: '',
                last_name: ''
            },
            selectedAuthor: {first_name: '', last_name: ''}
        };
    }

    validateField = (value, fieldName) => {
        const { fieldValCondition, formErrors } = this.state,
              { params, types, readName, message } = fieldValCondition[fieldName];
        let errors = validateValue(formErrors, value, types, fieldName, readName, params, message);

        this.setState({formErrors: errors})
    };

    componentDidMount() {
        this.getBookData();
    }

    getBookData = () => {
        let book_id = Number(this.props.match.params.id),
            book = this.props.libraryData.bookList.find(el => el.id === book_id);
        if(book)
            this.setState({book: book}, )
    };

    authorChange = (selAuthors) => {
        this.setState({ book: {...this.state.book, authors: selAuthors}}, () => {
            this.validateField(selAuthors, 'authors')
        });
    };

    labelChange = (e) => {
        const target = e.target;
        this.setState({book: {...this.state.book, label: target.value}}, () => {
            this.validateField(target.value, 'label')
        });
    };

    pageSizeChange = (e) => {
        const target = e.target;

        this.setState({book: {...this.state.book, page_size: target.value}}, () => {
            this.validateField(target.value, 'page_size')
        });
    };
    publisherChange = (e) => {
        const target = e.target;
        this.setState({book: {...this.state.book, publisher: e.target.value}}, () => {
            this.validateField(target.value, 'publisher')
        })
    };
    yearChange = (e) => {
        const target = e.target;
        this.setState({book: {...this.state.book, year: target.value}}, () => {
            this.validateField(target.value, 'year')
        })
    };

    circulationDateChange = (date) => {
        this.setState({book: {...this.state.book, circulation_date: moment(date).format("DD.MM.YYYY")}},
            () => {
                this.validateField(moment(date).format("DD.MM.YYYY"), 'circulation_date')
            }
        )
    };

    isbnChange = (e) => {
        const target = e.target;
        this.setState({book: {...this.state.book, isbn: target.value}}, () => {
            this.validateField(target.value, 'isbn')
        })
    };

    saveClickHandler = () => {
        const { fieldValCondition, book } = this.state;
        for(var fn in book) {
            if(fieldValCondition[fn]) {
                this.validateField(book[fn], fn)
            }
        }
        this.saveHandl();
    };

    saveHandl = () => {
        const bookList = [...this.props.libraryData.bookList],
            { book, formErrors } = this.state;

        if (Object.keys(formErrors).length > 0) {
            toast.error(<ErrorList header="Ошибка. Неверно заполнены поля" errors={formErrors} />);
        } else {
            let index = bookList.map(function(e) { return e.id; }).indexOf(Number(this.props.match.params.id));
            if(index > -1) {
                bookList[index] = book;
            } else {
                book.id = new Date().getTime();
                bookList.push(book)
            }

            this.props.onSaveBook(bookList, () => {
                toast.success('Успешно сохранено');
                this.props.history.push('/');
            });
        }
    };

    authorModalToggle = () => {
        this.setState({authorModal: !this.state.authorModal});
    };

    setParentState = (state = {}) => {
        this.setState(state);
    };

    authorSave = () => {
        const authorsList = [...this.props.authorData.authorsList],
            { selectedAuthor } = this.state;
        let index = authorsList.map(function(e) { return e.id; }).indexOf(Number(this.state.selectedAuthor.id));
        if(index > -1) {
            authorsList[index] = selectedAuthor;
        } else {
            selectedAuthor.id = new Date().getTime();
            authorsList.push(selectedAuthor);
        }

        this.props.onSaveAuthor(authorsList, () => {
            toast.success('Успешно сохранено');
            this.setState({
                selectedAuthor: {first_name: '', last_name: ''},
                book: {
                    ...this.state.book,
                    authors: [
                        ...this.state.book.authors,
                        {value: selectedAuthor.id, label: `${selectedAuthor.first_name} ${selectedAuthor.last_name}`}
                    ]
                }
            });
        });
        this.authorModalToggle();
    };

    prepareToSelect = (data) => {
        return data.map((item) => {
            return {value: item.id, label: `${item.first_name} ${item.last_name}` };
        });
    };

    fileChange = (e) => {
        let file = e.target.files[0];
        getBase64Image(file).then((result) => {
            this.setState({book: {...this.state.book, image: result}});
        });
    };

    render() {
        const options = this.prepareToSelect(this.props.authorData.authorsList);
        const { selectedAuthor, book, authorModal, formErrors} = this.state;

        return (
            <div>
                <Card>
                    <Card.Header><span className="font-weight-bold">Параметры книги </span></Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} controlId="bookName">
                                <Form.Label column md="2">Заголовок</Form.Label>
                                <Col md="10">
                                    <Form.Control
                                        type="text"
                                        className={formErrors['label'] ? 'inp-error' : ''}
                                        placeholder="Введите название заголовка"
                                        value={book.label}
                                        onChange={this.labelChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="bookName">
                                <Form.Label column md="2">Автор</Form.Label>
                                <Col md="8">
                                    <Select
                                        className={formErrors['authors'] ? 'inp-error' : ''}
                                        isMulti={true}
                                        onChange={this.authorChange}
                                        options={options}
                                        placeholder="Выберите автора"
                                        removeSelected={true}
                                        value={book.authors}
                                    />
                                </Col>
                                <Col md="2" >
                                    <Button className="btn-input" variant="info"  onClick={this.authorModalToggle}>
                                        <i className="fa fa-lg fa-plus"/>&nbsp;Добавить
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column md="2">Обложка</Form.Label>
                                <Col md="1">
                                    <img
                                        src={(book.image && book.image.length > 0) ? book.image : defImage}
                                        alt="Обложка"
                                        className="img-preview"
                                    />
                                </Col>
                                <Col md="9">
                                    <input
                                        className="form-control"
                                        accept='image/*'
                                        type="file"
                                        onChange={this.fileChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column md="2">Кол-во страниц</Form.Label>
                                <Col md="2">
                                    <Form.Control
                                        type="text"
                                        className={formErrors['page_size'] ? 'inp-error' : ''}
                                        value={book.page_size}
                                        onChange={this.pageSizeChange}
                                    />
                                </Col>
                                <Form.Label column md="2" >Издательство</Form.Label>
                                <Col md="6">
                                    <Form.Control
                                        type="text"
                                        className={formErrors['publisher'] ? 'inp-error' : ''}
                                        value={book.publisher}
                                        onChange={this.publisherChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column md="2">Год публикации</Form.Label>
                                <Col md="2">
                                    <Form.Control
                                        type="text"
                                        className={formErrors['year'] ? 'inp-error' : ''}
                                        value={book.year}
                                        onChange={this.yearChange}
                                    />
                                </Col>
                                <Form.Label column md="2">Выход в тираж</Form.Label>
                                <Col md="2">
                                    <DatePicker
                                        dateFormat="dd.MM.yyyy"
                                        className="form-control"
                                        selected={moment(book.circulation_date, "DD.MM.YYYY").toDate()}
                                        onChange={this.circulationDateChange}
                                    />
                                </Col>
                                <Form.Label column md="1">ISBN</Form.Label>
                                <Col md="3">
                                    <Form.Control
                                        type="text"
                                        className={formErrors['isbn'] ? 'inp-error' : ''}
                                        value={book.isbn}
                                        onChange={this.isbnChange}
                                    />
                                    <Form.Text className="text-muted">
                                        9788371815102 этот точно валидный))
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Col md="12" className="text-right">
                                    <Button variant="primary" className="btn-fill" type="submit" onClick={this.saveClickHandler}>
                                        Сохранить
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>

                <AuthorModal
                    show={authorModal}
                    toggleHandler={this.authorModalToggle}
                    author={selectedAuthor}
                    setParentState={this.setParentState}
                    saveHandler={this.authorSave}
                />

            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        ownProps,
        libraryData: state.libraryData,
        authorData: state.authorData,
    }),
    dispatch => ({
        onSaveBook: (data, callback) => {
            dispatch(saveBook(data));
            callback();
        },
        onSaveAuthor: (data, callback) => {
            dispatch(saveAuthor(data));
            callback();
        },
    })
)(BookEdit);