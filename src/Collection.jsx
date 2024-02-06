export const Collection = ({ name, images }) => {
    return (
        <div className="collection">
            <img className="collection__big" src={images[0]} alt="big" />
            {
                <div className="collection__bottom">
                    <img className="collection__mini" src={images[1]} alt="mini" />
                    <img className="collection__mini" src={images[2]} alt="mini" />
                    <img className="collection__mini" src={images[3]} alt="mini" />
                </div>
            }
            <h4>{name}</h4>
        </div>
    );
}
