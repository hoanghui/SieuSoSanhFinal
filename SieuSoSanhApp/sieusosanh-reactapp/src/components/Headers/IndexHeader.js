/*eslint-disable*/
import React from "react";
// reactstrap components
import { Container } from "reactstrap";
// core components
import BackgroundSlider from 'react-background-slider';
import photo1 from "../../assets/img/vach-ti-vi-trang-tri-9.jpg";
import photo2 from "../../assets/img/maygiat.jpg";
import photo3 from "../../assets/img/tulanh.jpg";
import photo4 from "../../assets/img/bg_dienmay.jpg";
import clouds from "../../assets/img/clouds.png"
import fog from "../../assets/img/fog-low.png"

function IndexHeader({namePage}) {
  var setting ={
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade:true
  }
  return (
    <div className="header"
    >
      
      <div
        className="page-header section-dark"
          style={{        
            minHeight: "88vh" 
          }}
      >
        <BackgroundSlider 
        images={[photo1, photo2, photo3, photo4]}
        duration={2} transition={2}
        />
        {/* <div className="filter" />   */}
        <div className="content-center">
          <Container>
            <div className="title-brand">
        <h1 className="presentation-title text-uppercase">{namePage}</h1>
              <div className="fog-low">
                <img alt="..." src={fog} />
              </div>
              <div className="fog-low right">
                <img alt="..." src={fog} /> 
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + clouds + ")",
            height: "28.75em"
          }}
        />
        <h6 className="category category-absolute" 
          style={{
            top: "80vh"
          }}
          
          >
          make by{" "}
          <a
            href="https://www.facebook.com/hoanghuy2015/"
            target="_blank"
          >
            <img
              className="creative-tim-logo"
              // src={require("assets/img/creative-tim-white-slim2.png")}
            />
          </a>
          hoang huy 🥺
        </h6>
      </div>
    </div>
  );
}

export default IndexHeader;
