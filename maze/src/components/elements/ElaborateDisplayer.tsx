import { Elaborate } from "../../types/elaborateType";
import { Component } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { formatDate, formatTime } from "../../helpers/helpers";

interface ElaborateProps {
  elaborates: Elaborate[];
}

function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </div>
  );
}

class ElaborateDisplayer extends Component<ElaborateProps> {
  render() {
    const { elaborates } = this.props;

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      adaptiveHeight: true,
    };

    return (
      <Container className="elaborateContainer">
        <h3 className="text-center mt-5 mb-4 mint">Elaborates</h3>
        <div className="custom-slick-container">
          <Slider {...sliderSettings}>
            {elaborates.map((elaborate) => (
              <div key={elaborate.id} className="slideContainer">
                <div className="row mb-4 ms-sm-1">
                  <div className="col col-12 col-sm-5 col-md-6 d-flex justify-content-center justify-content-md-end">
                    <img
                      src={elaborate.file}
                      alt={elaborate.title}
                      className="mb-2"
                      style={{ maxWidth: 400 }}
                    />
                  </div>
                  <div
                    className="col col-12 col-sm-6 col-md-5 text-center text-sm-start d-flex flex-column justify-content-between"
                    style={{ maxHeight: 200 }}
                  >
                    <h4 className="mint">{elaborate.title}</h4>
                    <blockquote>
                      <cite>"{elaborate.description}"</cite>
                    </blockquote>
                    <div>
                      <span className="small d-block">
                        Created: {formatDate(elaborate.createdAt)}
                      </span>
                      <span className="small">
                        Last updated:{" "}
                        {elaborate.updatedAt
                          ? formatTime(elaborate.updatedAt)
                          : formatTime(elaborate.createdAt)}{" "}
                        ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    );
  }
}

export default ElaborateDisplayer;
