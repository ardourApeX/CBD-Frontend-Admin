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
  // console.log("url", imagePreviewUrl, sectionName);
  // let $imagePreview = null;
  // if (imagePreviewUrl) {
  // 	$imagePreview = (
  // 		<img src={imagePreviewUrl} style={{ width: "10%" }} className="mt-5" />
  // 	);
  // }
  let Img = [];

  console.log("ima", props);
  const images = props.Images.map((elem, index) => {
    // console.log(imagePreviewUrl[index]);
    return (
      <Col key={index}>
        {isCategory ? elem && <p>{elem.name}</p> : <p>{elem}</p>}

        {elem && (
          <div className="box">
            {!isCategory &&
            imagePreviewUrl[index] &&
            imagePreviewUrl[index].image.length > 0 ? (
              <div
                className="js--image-preview"
                style={{
                  backgroundImage: `url(${imagePreviewUrl[index].image})`,
                }}
              ></div>
            ) : isCategory ? (
              <div
                className="js--image-preview"
                style={{ backgroundImage: `url(${elem.src})` }}
              ></div>
            ) : (
              <div
                className="js--image-preview"
                style={{ backgroundImage: `url(${IMAGE_URL}/${elem}` }}
              ></div>
            )}

            <div className="upload-options">
              {imagePreviewUrl[index] && imagePreviewUrl[index].file ? (
                <lable
                  onClick={(e) => {
                    props.imageSubmitHandler(e, sectionName, index);
                    imagePreviewUrl[index].file = "";
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
              ) : isCategory ? (
                <label>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ name, base64 }) => {
                      props.handleImageChange(
                        name,
                        base64,
                        index,
                        mainIndex,
                        sectionName
                      );
                    }}
                  />
                </label>
              ) : (
                <label>
                  <input
                    type="file"
                    onChange={async (e) =>
                      props.handleImageChange(e, sectionName, index)
                    }
                    accept="image/*"
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
