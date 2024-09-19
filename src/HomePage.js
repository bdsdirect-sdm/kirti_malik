import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import colImg from './images/col_img.jpg';
import contImg1 from './images/cont2-img1.jpg';
import contImg2 from './images/cont2-img2.jpg';
import contImg3 from './images/cont2-img3.jpg';
import cont3Img from './images/cont3-img1.jpg';
import cont5img1 from './images/cont5-img1.jpg';
import cont5img2 from './images/cont5-img2.jpg';
import cont5img3 from './images/cont5-img4.jpg';


const HomePage = () => {
  return (
    <div>
      <header className='headertop'>
    
    <nav className="navbar navbar-expand-lg custom-navbar">
    <div className="container-fluid ">
      <a className="navbar-brand" href="#"><i class="fa-solid fa-house"></i> Apps Market</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Services Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Why Us</a>
          </li>
          <li className="nav-item">
            <a ><button className="buttonClass"  > Contact Us</button></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  </header>


<div className='bgstyle'>
  <div className='row'>
    <div className='col-5'><h1>We create applications<br/> with excellent tecnology</h1>
    <p>It is a long estabilished fact that reader will be distracted by<br/> the readable content of a page when looking at its layout.
    <br/> The point of using lorem ipsum is that it has a more or less<br/> 
    normal distribution of letters , as opposed to using content</p>

    <div className='btn'>
    <button>Download Now<i class="fa-solid fa-download"></i></button><p>Explore More</p>
    
    </div>
    
    </div>
    <div className='col-7'><img src={colImg}/></div>
  </div>
</div>

    <div className='container'>

      <h1 className='text-center'>we provide various kinds of<br/> services for you</h1>
      <p className='text-center '>it is a long estabilished fact that a reader will be distracted by the readable
      content <br/>of a page when looking at its layout. the point of 
      using lorem</p>



      <div className='container 1'>
     <div className='row'>
      <div className='col-4'>
        <div className='card'>
        <img src={contImg1} className='mx-auto d-block'/>
        <h1 className='fs-3 text-center'>Unique App Ui</h1>
        <p className='text-center'>it is longer estabilished fact that <br/> 
        the user will be distracted by<br/>
        the readable content of the page</p>
        </div>
      </div>
      <div className='col-4'>
      <div className='card'>
        <img src={contImg2}className='mx-auto d-block' />
        <h1 className='fs-3 text-center'>Excellent Dashboard</h1>
        <p className='text-center'>it is longer estabilished fact that <br/> 
        the user will be distracted by<br/>
        the readable content of the page</p>
        </div>
      </div>
      <div className='col-4'>
      <div className='card'>
        <img src={contImg3} className='mx-auto d-block'/>
        <h1 className='fs-3 text-center'>By Construction</h1>
        <p className='text-center'>it is longer estabilished fact that <br/> 
        the user will be distracted by<br/>
        the readable content of the page</p>
        </div>
      </div>

     </div>

    </div>

       <div className='container2'>
         <h1 className='text-center '>Why Us?</h1>
         <p className='text-center'>it is longer estabilished fact that 
        the user will be distracted by
        the readable <br/>content of the page when looking at its layout. The point of using Lorem</p>
        </div>  

    

    <div className='container3'>
      <div className='row'>
        <div className='col-6'>
          <img src={cont3Img} className='h-50'/>
        </div>
        <div className='col-6'>
          <h2>Built the app that<br/> everyone love</h2>
          <p>It is a long estabilished fact that reader will be distracted by<br/> the readable content of a page when looking at its layout.
    <br/> The point of using lorem ipsum is that it has a more or less<br/> 
    normal distribution of letters , as opposed to using content</p>
        </div>
      </div>
    </div>
 
 <div className='container4'>
  <h1 className='text-center'>
    We completed 12000+ projects yearly<br/>sucessfully and counting
  </h1>
  <p className='text-center'>it is longer estabilished fact that 
        the user will be distracted by
        the readable <br/>content of the page when looking at its layout. The point of using Lorem</p>
        <div className='row'>
          <div className='col-3'>hey</div>
          <div className='col-3'>hey</div>
          <div className='col-3'>hey</div>
          <div className='col-3'>hey</div>
        </div>

 </div>

 <div className='container5'>
  <h1 className='text-center'>Our Portfolio</h1>
  <p className='text-center'>it is longer estabilished fact that 
        the user will be distracted by
        the readable <br/>content of the page when looking at its layout. The point of using Lorem</p>

        <div className='row'>
          <div className='col-3'>
             
          <div className='card '>
        <img src={cont5img1}className='h-30 rounded-circle mt-6' />
        </div>

          </div>
          <div className='col-3'>
          <div className='card'>
        <img src={cont5img2}className='h-30 rounded-circle mt-6' />
        </div>
          </div>
          <div className='col-3'>
          <div className='card'>
        <img src={cont5img3}className='h-30 rounded-circle mt-6' />
        </div>
          </div>
          <div className='col-3'>
          <div className='card'>
        <img src={cont5img3}className='h-30 rounded-circle mt-6' />
        </div>
          </div>
        </div>

 </div>

    </div>

    <div className='container6'>
      <div className='row'>
        <div className='col-3'>h</div>
        <div className='col-3'>
          <h4 >Links</h4><br/>
          <h6>Home</h6>
          <h6>Pricing</h6>
          <h6>Download</h6>
          <h6>About</h6>
          <h6>Service</h6>
        </div>
        <div className='col-3'>
        <h4 >Support</h4><br/>
          <h6>FAQ</h6>
          <h6>How it</h6>
          <h6>Features</h6>
          <h6>Contact</h6>
          <h6>Reporting</h6>
        </div>
        <div className='col-3'>

        <h4 >Contact Us</h4><br/>
          <h6>+880 123456789</h6>
          <h6>youremail@gmail.com</h6>
          <h6>Rangpur city</h6>
         
        </div>
      </div>
    </div>
    
  </div>

  );
};

export default HomePage;
