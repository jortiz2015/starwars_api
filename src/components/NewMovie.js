import React, {useState} from "react";
import style from "./NewMovie.module.css";

const NewMovie = props => {
    const [title, setTitle] = useState("");
    const [openingText, setOpeningText] = useState("");
    const [releaseDate, setReleaseDate] = useState("");

    const titleHandler = event => {
        setTitle(event.target.value);
    }

    const openingTextHandler = event => {
        setOpeningText(event.target.value);
    }

    const releaseDateHandler = event => {
        setReleaseDate(event.target.value);
    }

    const submitHandler = event => {
        event.preventDefault();
        const movieData = {
            id: Math.random().toString(),
            title: title,
            openingText: openingText,
            releaseDate: releaseDate
        }
        props.onAddMovie(movieData);
        console.log(movieData);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={style.control}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={titleHandler}></input>
            </div>
            <div className={style.control}>
                <label htmlFor="opening-text">Opening Text</label>
                <textarea rows='5' id="opening-text" value={openingText} onChange={openingTextHandler}></textarea>
            </div>
            <div className={style.control}>
                <label htmlFor="release-date">Release Date</label>
                <input type="text" id="release-date" value={releaseDate} onChange={releaseDateHandler}></input>
            </div>
            <div className={style.control}>
                <button type="submit" onClick={submitHandler}>Add Movie</button>
            </div>
        </form>
    );
}

export default NewMovie;