import React from "react";
// reactstrap components
import { Row, Container } from "reactstrap";

function IndexFooter() {
  return (
    <footer className="footer footer-black footer-white" style={{backgroundColor:"#ededed"}}>
      <div className="container footer-info-block">
        <div className="info-content-block">
          <div className="home-tag">
          <i class="fas fa-search-dollar"></i>
          </div>
          <p className="info-lable">SieuSoSanhvn.web.app</p>
          <p className="contents">Đây là website thu thập thông tin giá cả các sản phẩm điện tử, điện lạnh, viễn thông, gia dụng, tin học, giải trí, kỹ thuật số... tại các nhà bán lẻ lớn, uy tín tại Việt Nam.</p>
        </div>
        <div className="info-content-block">
          <div className="home-tag">
          <i class="fas fa-tags"></i>
          </div>
          <p className="info-lable">Không chỉ so sánh giá</p>
          <p className="contents">Đây là website thu thập thông tin giá cả các sản phẩm điện tử, điện lạnh, viễn thông, gia dụng, tin học, giải trí, kỹ thuật số... tại các nhà bán lẻ lớn, uy tín tại Việt Nam.</p>
        </div>
        <div className="info-content-block">
          <div className="home-tag">
          <i class="far fa-file-alt" style={{fontSize:"2em"}}></i>
          </div>
          <p className="info-lable">Thông tin phong phúp</p>
          <p className="contents">Đây là website thu thập thông tin giá cả các sản phẩm điện tử, điện lạnh, viễn thông, gia dụng, tin học, giải trí, kỹ thuật số... tại các nhà bán lẻ lớn, uy tín tại Việt Nam.</p>
        </div>
      </div>
      <Container style={{padding:"0 17vh"}}>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="/"
                  target="_blank"
                >
                  SIÊU SO SÁNH
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                >
                  Copyright © 2020 Little Bamboo Cute
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                >
                  Email: info@sieusosanh.com
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart heart-gif"/> by Nguyen Hoang Huy
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default IndexFooter;
