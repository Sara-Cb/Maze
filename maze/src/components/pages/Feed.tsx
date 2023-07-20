import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import { Container, Row, Col, Image, Navbar, Nav, Form, Button } from "react-bootstrap";

function FeedPage() {

  let Dark = '#28383A';
  let Dark_green = '#04B597';
  let Mint_green = '#8CF5C9';
  let Light = '#FAF0F0'
  const [dark, setdark] = useState(Dark);
  const [drakgreen, setdarkgreen] = useState(Dark_green);
  const [mintgreen, setmintgreen] = useState(Mint_green);
  const [light, setlight] = useState(Light);

  return (
      <Container fluid>

        <Row className='pt-5'>
          <Col md={2} className='my-auto'>
            <a href="/">
              <Image src="Logo on light.png" style={{width:'16vw' ,height: '10vh'}}  />
            </a>
          </Col>
          <Col md={10} className='pt-5 mb-5'>
            <Navbar expand="lg" className='border-bottom border-5 border-success-subtle'>
              <div className='mx-3'>
                <a href="/home"  style={{color: mintgreen, fontSize:'larger', fontWeight:'900'}}>Home</a>
              </div>
              <div className='mx-3'>
                <a href="/feed"  style={{color: mintgreen, fontSize:'larger', fontWeight:'900'}}>Feed</a>
              </div>
              <div className='mx-3'>
                <a href="/portfolio" style={{color: mintgreen, fontSize:'larger', fontWeight:'900'}}>Portfolio</a>
              </div>
              <Container fluid>
                <Navbar.Brand href="/home">
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                  <Form className="d-flex">
                    <div className='pr-20'>
                      <Image src="logo800.png" style={{height: '3vh'}}  />
                    </div>
                    <input type="text" placeholder='search' className='form-control-sm' size={40} />
                  </Form>
              </Container>
            </Navbar>
          </Col>
        </Row>

        <Row>
            <div className="col-md-3 px-5">
                <Col
                  style={{backgroundColor:drakgreen, height:'70vh'}}
                  className='p-3'
                >
                  <div className='d-flex justify-content-center mb-3 mt-2'>
                    <Image src="coffee/img-4.png" style={{width:"150px"}} />
                  </div>
                  
                  <Col className='text-center'>
                    <h2>John Doe</h2>
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
                  </Col>

                  <Col className='text-center'>
                    <Button variant="white" size="lg" active>
                      Professional
                    </Button>{' '}
                  </Col>
                  <br />
                  <Col className='text-center'>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Col>                 

                </Col>
            </div>
            <div className="col-md-9 px-5">
              {/* <div className="p-5 bg-primary"></div> */}
              <Row className='px-5' style={{background: drakgreen, height: '70vh', justifyContent: 'center', alignItems: 'center'}}>
                <div className='text-center px-3 py-3' style={{backgroundColor: mintgreen, alignItems: 'center'}}>
                  <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-2 p-20'>
                      <img src="user.jpg" alt="" />
                    </div>
                    <div className='col-md-4 p-20'>
                      <p style={{alignItems: 'center' ,fontWeight:'bolder'}}>Stage Name</p>
                      <p style={{fontWeight:'bolder'}}>Look at my collections</p>
                    </div>
                    <div className='col-md-3'></div>
                  </div>

                  <div className='row px-5'>
                    <div className='text-center p-10' style={{backgroundColor: 'white',  alignContent: 'center', fontWeight:'700'}}>Updated Content</div>
                  </div>
                </div>

                <div className='text-center px-3 py-3' style={{backgroundColor: mintgreen, alignItems: 'center'}}>
                  <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-2 p-20'>
                      <img src="user.jpg" alt="" />
                    </div>
                    <div className='col-md-4 p-20'>
                      <p style={{alignItems: 'center' ,fontWeight:'bolder'}}>Stage Name</p>
                      <p style={{fontWeight:'bolder'}}>Look at my collections</p>
                    </div>
                    <div className='col-md-3'></div>
                  </div>

                  <div className='row px-5'>
                    <div className='text-center p-10' style={{backgroundColor: 'white',  alignContent: 'center', fontWeight:'700'}}>Updated Content</div>
                  </div>
                </div>
              </Row>
            </div>
        </Row>
      </Container>
  );
}

export default FeedPage;