import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Page not found</h1>
                    <p>Whoooaa, this URL is not available...</p>
                    <Link to="/" className="button button--link">Head home</Link>
                </div>
            </div>
        );
    }
}

export default NotFound;