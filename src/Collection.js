import { useState } from "react";
import Selected from "./Selected";

import './Collection.css';

const Collection = (props) => {
    const availableArt = props.availableArt;
    const empty = 0;
    const [selectedArt, setSelectedArt] = useState({});

    console.log(availableArt);
    return (availableArt.length === empty ?
        <div className="Collection">
            <div className="Available"></div>
        </div> :
        <div className="Collection">
            <div className="Available">
                {availableArt.map((Art) => {
                    return (
                        <div key={Art.id} onClick={() => setSelectedArt(Art)}>
                            <h3>{Art.title}</h3>
                            <img src={Art.primaryimageurl}></img>
                        </div>
                    )
                })}
            </div>
            <Selected selectedArt={selectedArt} />
        </div>

    )
}

export default Collection