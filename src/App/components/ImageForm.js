import React from "react";
import { connect } from "react-redux";
import { IMAGE_URL } from "../../utilities/Axios/url";
import { Container, Row, Col, Button } from "react-bootstrap";
import FileBase from "react-file-base64";
const ImageForm = ({
  sectionName,
  imagePreviewUrl,
  img,
  isCategory,
  mainIndex,
  ...props
}) => {
  let Img = [];
  const images = props.Images.map((elem, index) => {
    console.log(elem);
    return (
      <Col key={index}>

        {elem && <p>{elem.name}</p>}

        {elem && (
          <div className="box">
            {imagePreviewUrl[index] &&
            imagePreviewUrl[index].image.length > 0 ? (
              <div
                className="js--image-preview"
                style={{
                  backgroundImage: `url(${imagePreviewUrl[index].image})`,
                }}
              ></div>
            ) : (
              <div
                className="js--image-preview"
                style={{
                  backgroundImage: `url(${IMAGE_URL}/${elem.src}`
                    .replace("public", "")
                    .replace("\\", ""),
                }}
              ></div>
            )}

            <div className="upload-options">
              {imagePreviewUrl[index] && imagePreviewUrl[index].file ? (
                <lable
                  onClick={(e) => {
                    props.imageSubmitHandler(e, sectionName, index, mainIndex);
                    // imagePreviewUrl[index].file = "";
                  }}
                >
                  <p
                    style={{
                      marginTop: "1rem",
                      fontSize: "x-large",
                      color: "white",
                    }}
                  >
                    Update
                  </p>
                </lable>
              ) : (
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      props.handleImageChange(e, index, mainIndex, sectionName)
                    }
                  />
                </label>
              )}
            </div>
          </div>
        )}
      </Col>
    );
  });

  return (
    <Container>
      <Row>{images}</Row>
    </Container>
  );
};
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state,
});

export default connect(mapStateToProps)(ImageForm);
