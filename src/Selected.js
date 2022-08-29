const Selected = (props) => {
    const selectedArt = props.selectedArt;

    return (
        (selectedArt.id ?
            <div className="Selected">
                <div className='info'>
                    <h2 id="SelectedTitle">{selectedArt.title}</h2>
                    <p>Culture: {selectedArt.culture}</p>
                    <p>Technique: {selectedArt.technique}</p>
                    <p>Medium: {selectedArt.medium}</p>
                    <p>Dimensions: {selectedArt.dimensions}</p>
                    {selectedArt.peoplecount > 0 ?
                        selectedArt.people.map((person) => {
                            return (
                                <p>Person: {person.name}</p>
                            )
                        }) : <></>}
                    <p>Department: {selectedArt.department}</p>
                    <p>Division: {selectedArt.division}</p>
                    <p>Contact: {selectedArt.contact}</p>
                    <p>Credit: {selectedArt.credit}</p>
                </div>
                <div>
                    <img src={selectedArt.primaryimageurl} alt='A Pretty Art Picture'></img>
                </div>
            </div> :
            <></>)

    );
}

export default Selected;