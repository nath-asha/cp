import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function Gallery() {
    return (
        <div className='container-fluid'>
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height='800px'
                    width='200px'
                    src="https://media.licdn.com/dms/image/v2/D5622AQFI24AfY-vwcQ/feedshare-shrink_800/feedshare-shrink_800/0/1709390179014?e=1743638400&v=beta&t=ClC9TcRVOEo1-gf8RA2LoYVDK2ushHpSj3deeiAtuoQ"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3 className="text-success">React-a-thon</h3>
                    <p>Create Solutions that speak</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height='800px'
                    width='200px'
                    src="https://media.licdn.com/dms/image/v2/D5622AQF6VSJdUs69UQ/feedshare-shrink_1280/feedshare-shrink_1280/0/1709390178886?e=1743638400&v=beta&t=Li6xv75WH2y7Vh_xLFs3Ds55jVXSF23NYfZ6NIihSpk"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3 className="text-primary">React-a-thon</h3>
                    <p>Create Solutions thst speak.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    );
}

export default Gallery;
