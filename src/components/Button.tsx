import React from "react";

type ButtonPropsType = {
    name: string
    callback: () => void
    styler?: string
}

const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callback();
    }
    return (
        <button className={props.styler} onClick={onClickHandler}>{props.name}</button>
    )
}

export default Button;