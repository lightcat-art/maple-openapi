import './button.css'

export const Button = (props) => {
    return (
        <button
            disabled={props.disabled}
            display={props.hidden === true ? "none" : ""}
            className={`btn-1 btn rounded-pill ${props.className}`}
            onClick={props.action}
            style={props.style}
        >
            {props.title}
        </button>
    )
}


export const ContentButton = (props) => {
    return (
        <button
            disabled={props.disabled}
            display={props.hidden === true ? "none" : ""}
            className={`btn-1 btn rounded-pill ${props.className}`}
            onClick={props.action}
            style={props.style}
        >
            {props.title}
            {props.imgsrc}
        </button>
    )
}