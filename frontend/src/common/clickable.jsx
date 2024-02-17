import './clickable.css'
import { Link} from 'react-router-dom'

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


export const AfterImageButton = (props) => {
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

export const AfterImageBadgeLight = (props) => {
    return (
        <span
            className={`tag-1 badge text-bg-light ${props.className}`}
            style={props.style}
        >
            {props.title}
            {props.imgsrc}
        </span>
    )
}

export const AfterImageLink = (props) => {
    return (
        <Link to={props.to} className={`after-image-link ${props.className}`}>
            {props.title}
            {props.imgsrc}
        </Link>
    )
}