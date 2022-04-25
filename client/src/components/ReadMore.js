import React, { useState } from "react";

const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <p className="text">
                {isReadMore ? text.slice(0, 250) : text}
                <span onClick={toggleReadMore} className="readMore">
                    {isReadMore ? "   ...leer más" : "    mostrar menos"}
                </span>
            </p>
        );
    };

    export default ReadMore;