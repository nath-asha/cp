import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function Gallery() {
    return (
        <div className='container-fluid'>
        <h1 className='text-center text-success'>Gallery</h1>
        <h3 className='text-center text-primary'>Reactathon 2024</h3>
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height='800px'
                    width='200px'
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP9R68N9hVrXMcnR1T4VCjCPmMhGIVZv6oEAgEPp41RS_voHGPCGNELYG7PVC9keGNdQE&usqp=CAU"
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
        <h3 className='text-center text-primary'>Reactathon</h3>
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height='800px'
                    width='200px'
                    src="https://img.freepik.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg?t=st=1741146510~exp=1741150110~hmac=aa36e1836d63a2fa40cf74e6d2efca9fe0c2bb91bbfb7d1a27f71d9d91a5486a&w=1380"
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
