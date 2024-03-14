import React from "react";
import PropTypes from 'prop-types';
import styles from './DefaultButton.css';

const DefaultButton = ({
    text,
    disabled,
    onPress,
    size = "large",
}) => {


    return (
        <button 
            className={size === "large" ? "button" : "button button-small"}
            onClick={() => onPress()}
        >
            {text}
        </button>
    );
};

DefaultButton.propTypes = {
    text: PropTypes.string,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
};

export default DefaultButton;