
function MainPage() {
    var projectName = "Map For Hu Tao Enthusiasts in UofT";

    var incidentReports = [
        {
            category: "Theft",
            address: "55 Awa Awa Dr"
        }
    ]
    /*return(
        <div class="mainBody">
            <header class="mainTitle">
                <h1>Map For Hu Tao Enthusiasts in UofT</h1>
                <section class="mainDescription">
                    Have you ever wondered just where and when incidents in Universities occur? <br/>
                    Do you want to be more aware of what is happening in the campus where you study in?<br/><br/>

                    Well, you have come to the right place! Meet "Map for Hu Tao Enthusiasts in UofT"!<br/>
                    Our map borrows data from the UofT Activity Reports and organizes it in a more readable, interactive map interface!<br/>
                    If you like, you may see the activity reports <a href="https://www.campussafety.utoronto.ca/activity-reports" target="_blank" rel="noopener noreferrer">here</a>
                    </section>
                <div class="mainTitleBackground">
                    <svg viewBox="0 0 150 50">
                        <path fill="#00C2DC" d="M0,0 L0,35 C0,35 35,50 70,40 S130,50 150,50 L150,0 Z"/>
                    </svg>
                </div>
            </header>

            <section class="mainMapDescription">
                Had a good look at the activity report site? Well, how about seeing that information in a more organized manner?
            </section>

            <section class="mainIncident">
                <div class="mainReportList">
                    <table>
                        <tr><th colspan="2">Latest Reports</th></tr>
                        <tr>
                            <th>Category</th>
                            <th>Incident</th>
                        </tr>
                        {incidentReports.map((incident) => {
                            return (
                                <tr>
                                    <td>{incident.category}</td>
                                    <td>{incident.address}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div class="mainMapButton">

                </div>
            </section>
        </div>
    )*/

    return (
        <div>
            <header>
                <h1>{projectName}</h1>
                <p>
                    An interactive map for UofT incident reports...<br/>
                    Awareness, becoming simple
                </p>
                <div class="mainTitleBackgroundDummy">
                    <svg viewBox="0 0 150 150">
                        <path fill="#00C2DC" d="M0,0 L120,0 C120,0 150,75 120,150 L0 150 Z"/>
                    </svg>
                </div>
            </header>
        </div>
    )
}

export default MainPage;