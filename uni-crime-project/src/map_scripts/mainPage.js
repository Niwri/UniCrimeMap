import MapImage from '../images/mapdemo.png'

function MainPage() {
    var projectName = "Map For Hu Tao Enthusiasts in UofT";

    var incidentReports = [
        {
            category: "Theft",
            address: "55 Awa Awa Dr"
        }
    ]

    return (
        <div>
            
            <header class="mainTitle">
                <div class="mainTitleBackground">
                    <svg viewBox="0 0 150 150">
                        <path fill="#00C2DC" fill-opacity="0.8" d="M0,0 L120,0 C120,0 150,75 120,150 L0 150 Z"/>
                    </svg>
                </div>
                <div class="mainTitleBackgroundBorder">
                    <svg viewBox="0 0 154 150">
                        <path fill="#0088A6" fill-opacity="0.5" d="M0,0 L124,0 C124,0 154,75 124,150 L0 150 Z"/>
                    </svg>
                </div>
                <div class="mainTitleText">
                    <h1>{projectName}</h1>
                    <p>
                        An interactive map for UofT incident reports...<br/>
                        Awareness, becoming simple
                    </p>
                </div>
                
            </header>
            <img src={MapImage} class="mapDemo"></img>
        </div>
    )
}

export default MainPage;