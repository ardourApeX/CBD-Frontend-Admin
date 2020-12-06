import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import "antd/dist/antd.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, FormControl, InputGroup, Card } from "react-bootstrap";
import { DeleteFilled } from "@ant-design/icons";
// import ImageForm from

export default function BlogForm(props) {
  console.log("props", props);
  let { imagePreviewUrl } = props;
  let $imagePreview = null;
  if (imagePreviewUrl.length) {
    console.log("reached here");
    console.log(imagePreviewUrl);
    $imagePreview = (
      <img src={imagePreviewUrl} style={{ width: "5%" }} className="mt-5" />
    );
  }
  return (
    <div>
      <Card>
        <Card.Body>
          <label htmlFor="Heading">Heading</label>
          <InputGroup>
            <FormControl
              as="textarea"
              name="heading"
              value={props.data.heading}
              onChange={(e) =>
                props.changeHandler(e.target.name, e.target.value)
              }
            />
          </InputGroup>
          <label htmlFor="SubHeading">SubHeading</label>
          <InputGroup>
            <FormControl
              as="textarea"
              name="subHeading"
              value={props.data.subHeading}
              onChange={(e) =>
                props.changeHandler(e.target.name, e.target.value)
              }
            />
          </InputGroup>
          <label htmlFor="Content">Content</label>
          <CKEditor
            editor={ClassicEditor}
            data={props.data.content}
            onChange={(event, editor) =>
              props.changeHandler("content", editor.getData())
            }
          />
          <label htmlFor="Tags">Tags</label>
          <InputGroup>
            <FormControl
              as="textarea"
              value={props.data.tags.join(",")}
              name="tags"
              onChange={(e) =>
                props.changeHandler(e.target.name, e.target.value)
              }
            />
          </InputGroup>
          <label htmlFor="BlogImage">Blog Image</label>
          <br />
          {$imagePreview}
          <br />
          <p style={{ marginBottom: 0 }}>
            {imagePreviewUrl.length > 0 ? (
              <>
                {imagePreviewUrl && imagePreviewUrl.length < 100 && (
                  <span style={{ marginRight: "20px" }}>
                    {props.data.image}
                  </span>
                )}
                <DeleteFilled
                  style={{ fontSize: "20px", color: "red" }}
                  onClick={props.imageRemoveHandler}
                />
              </>
            ) : null}
          </p>
          <br />
          <input
            type="file"
            onChange={(e) => props.handleImageChange(e, props.data._id)}
            className="mt-4"
          />
          <hr />
          <Button onClick={props.submitHandler}>Submit</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
