import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    FormControl,
    Button,
    InputGroup
} from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchBar.scss'

class SearchBar extends Component {
    passValue() {
        
        this.props.passValueToHeader(this.refs.text.value);
    }
    render() {
        const { isSearchBar, icon, className, placeholder, method, action, onSearch, paramName, noBorder } = this.props;
        return (
            <div className={className}>
                <Form className="w-100" method={method} action={action} >
                    <div className={`search-bar ${!noBorder ? 'search-border' : ''}`} >
                        <InputGroup>
                            <FormControl onKeyPress={e => {
                                if (e.key === 'Enter' && isSearchBar) e.preventDefault();
                            }} onChange={this.passValue.bind(this)} ref="text" type="text" placeholder={placeholder} name={paramName} />
                            <div className="input-group-append">
                                <Button onClick={onSearch} variant="light" type="button">
                                    <FontAwesomeIcon icon={icon} />
                                </Button>
                            </div>
                        </InputGroup>
                    </div>
                </Form>
            </div>
        );
    }
}

SearchBar.defaultProps = {
    paramName: 'keyword',
}

SearchBar.propTypes = {
    className: PropTypes.string,//css style classes
    paramName: PropTypes.string,//param on Url (input name). ex: 'keyword'
    placeholder: PropTypes.string,//placeholder of input. ex: 'Nhap vao day'
    method: PropTypes.string,//POST or GET form method
    action: PropTypes.string,//url after press Enter
    onSearch: PropTypes.func,//do a action when button is clicked
    noBorder: PropTypes.bool,//remove black border
};

export default SearchBar;