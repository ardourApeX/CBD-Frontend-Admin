import { Button, Card } from 'react-bootstrap'
import { Form, Input, InputNumber, Select } from 'antd'
import 'antd/dist/antd.css'
import { Option } from 'antd/lib/mentions'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/product'
import { AddReviews, editReviewCompletely } from '../../store/actions/review'

// import ImageForm from

function CreateReview({
  products,
  get,
  deletee,
  AddReviews,
  editReviewCompletely,
  match,
  history,
  location,
  ...props
}) {
  const [editMode, setEditMode] = useState(
    match?.params?.mode === 'edit' ? true : false,
  )

  const [state, setState] = useState(
    editMode
      ? {
          title: '',
          name: '',
          rating: 4,
          productmetaid: null,
          content: '',
          ...location.state,
        }
      : {
          title: '',
          name: '',
          rating: 4,
          productmetaid: null,
          content: '',
        },
  )

  console.log({ match, location, editMode, state })

  useEffect(() => {
    get()
      .then((result) => {
        console.log({ result })
        // setLoading(false)
      })
      .catch(console.log)
  }, [])

  const handleSubmit = () => {
    if (editMode)
      editReviewCompletely(state, (error, response) => {
        console.log({ error, response })
        if (!error) history.push('/Review')
      })
    else
      AddReviews(state, (error, response) => {
        console.log({ error, response })
        if (!error) history.push('/Review')
      })
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Form>
            <Form.Item
              initialValue={state.title}
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please provide a title!',
                },
              ]}
            >
              <Input
                name="title"
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
              />
            </Form.Item>

            <Form.Item
              initialValue={state.name}
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please provide a name!',
                },
              ]}
            >
              <Input
                name="name"
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </Form.Item>

            <Form.Item
              initialValue={state.rating}
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  // max: 5,
                  // min: 0,
                  message: 'Please provide  a valid rating between (0 - 5)!',
                },
              ]}
            >
              <InputNumber
                step="0.1"
                value={state.rating}
                onChange={(value) =>
                  setState({ ...state, rating: value, overall: value })
                }
              />
            </Form.Item>

            <Form.Item
              initialValue={state.content}
              label="Content"
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Please provide content!',
                },
              ]}
            >
              <Input
                step="0.1"
                onChange={(e) =>
                  setState({ ...state, content: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              // initialValue="simple"
              initialValue={state.productmetaid}
              label="Product"
              value={state.productmetaid}
              name="producttype"
              rules={[
                {
                  required: true,
                  message: 'Please Select product',
                },
              ]}
            >
              <Select
                onChange={(value) =>
                  setState({ ...state, productmetaid: value })
                }
              >
                {products.map((el) => (
                  <Option value={el._id}>{el.productid.producttitle}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          {/* <InputGroup>
            <Form.Select>
              <option value={null}>Select product</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </InputGroup> */}
          {/* 
          <label htmlFor="Content">Content</label>
          <label htmlFor="Tags">Tags</label>
          <InputGroup>
            <FormControl
              as="textarea"
              value={props.data.tags.join(',')}
              name="tags"
              onChange={(e) =>
                props.changeHandler(e.target.value, e.target.value)
              }
            />
          </InputGroup> */}
          {/* <label htmlFor="BlogImage">Blog Image</label>
          <br />
          <input
            type="file"
            onChange={(e) => props.handleImageChange(e, props.data._id)}
            className="mt-4"
          />
          <hr /> */}
          <Button variant="dark" size="sm" onClick={handleSubmit}>
            Submit
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getProducts()),
    AddReviews: (data, cb) => dispatch(AddReviews(data, cb)),
    editReviewCompletely: (data, cb) =>
      dispatch(editReviewCompletely(data, cb)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview)
