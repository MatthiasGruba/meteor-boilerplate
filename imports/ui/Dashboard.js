import React, {Component} from 'react';
import PrivateHeader from "./PrivateHeader";


class Dashboard extends Component {

    render() {
        return (
            <div>
                <PrivateHeader title="Dasboard"/>
                <div className="page-content">
                    Dasboard page content
                </div>
            </div>
        );
    }
}

export default Dashboard;