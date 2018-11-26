import React from "react";
import "./style.css";

export function DeleteBtn(props) {
    return (
        <button className="delete-btn" {...props} tabIndex="0">
            Delete
        </button>
    );
}

export function ViewBtn(props) {
    return (
        <button className="view-btn" {...props} tabIndex="0">
            View
      </button>
    );
}

export function SaveBtn(props) {
    return (
        <button className="save-btn" {...props} tabIndex="0">
            Save
        </button>
    )
}