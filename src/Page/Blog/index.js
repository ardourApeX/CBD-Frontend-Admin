import React, { Component } from "react";
import * as actionCreators from "../../store/actions/blog";
import { connect } from "react-redux";
import cogoToast from "cogo-toast";
import DataTable from "../../App/components/DataTable";
import BlogForm from "../../App/components/BlogForm";
import Loader from "../../App/layout/Loader";
import { Button } from "react-bootstrap";
import { Input } from "antd";
import windowSize from "react-window-size";
import DEMO from "../../store/actions/constant";
import { IMAGE_URL } from "../../utilities/Axios/url";

// const sections = ["Blog Table", "Add Blog", "Update Blog"];
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      btnText: "Add Blog",
      section: 0,
      currentBlog: {
        heading: "",
        subHeading: "",
        content: "",
        tags: [],
      },
      file: "",
      imagePreviewUrl: "",
      search: "",
      blogs: [],
      searchWidth: this.props.windowWidth < 992 ? 90 : 0,
      searchString: this.props.windowWidth < 992 ? "90px" : "",
      isOpen: this.props.windowWidth < 992,
    };
    this.toggleHandler = this.toggleHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.imageRemoveHandler = this.imageRemoveHandler.bind(this);
  }
  handleImageChange(e, id) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    console.log(reader);
    console.log(file);

    reader.onloadend = () => {
      if (id) {
        const data = { ...this.state.currentBlog };
        data.image = file;
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          currentBlog: data,
        });
      } else {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          // imagePreviewUrl: file.name,
        });
      }
    };

    reader.readAsDataURL(file);
  }
  toggleHandler = () => {
    let section = this.state.section;
    if (section === 0) {
      this.setState({
        section: 1,
        btnText: "All Blogs",
      });
    } else {
      this.setState({
        section: 0,
        btnText: "Add Blog",
      });
    }
  };
  editHandler = (index) => {
    const formData = new FormData();
    console.log(this.state.currentBlog);
    // formData.append("image", this.state.file);
    Object.keys(this.state.currentBlog).forEach((key) =>
      formData.append(key, this.state.currentBlog[key])
    );
    // formData.append("image", this.state.file);
    console.log(this.props.blogs[index]);
    this.props
      .update(index, formData)
      .then((result) => {
        cogoToast.success(result);
      })
      .catch((err) => cogoToast.error(err));
  };
  updateHandler = (index) => {
    this.setState({
      section: 2,
      btnText: "All Blogs",
      currentBlog: this.state.blogs[index],
      imagePreviewUrl: this.state.blogs[index].image.length
        ? `${IMAGE_URL}/${this.state.blogs[index].image}`
        : "",
    });
  };

  changeHandler = (name, value) => {
    console.log("change", name, value);
    let curValue = this.state.currentBlog;

    if (name === "tags") {
      let val = value.split(",");
      curValue[name] = val;
      this.setState(
        {
          currentBlog: curValue,
        },
        console.log(this.state)
      );
    } else {
      curValue[name] = value;
      this.setState({
        currentBlog: curValue,
      });
    }
  };

  submitHandler = () => {
    console.log("SubmitHandler");
    const formData = new FormData();
    Object.keys(this.state.currentBlog).forEach((key) =>
      formData.append(key, this.state.currentBlog[key])
    );
    formData.append("image", this.state.file);
    console.log(formData);
    this.props
      .add(formData)
      .then((result) => {
        console.log("Success");
        cogoToast.success("Success");
      })
      .catch((err) => cogoToast.error(err));
  };

  imageRemoveHandler = () => {
    const data = { ...this.state.currentBlog };
    data.image = "";
    this.setState({
      file: "",
      imagePreviewUrl: "",
      currentBlog: data,
    });
  };

  pageHandler = async (pageNo) => {
    console.log("pageHandler", pageNo);
    // this.props.getAll(pageNo, this.props.size);
    this.props
      .getAll(pageNo, this.props.size)
      .then((result) => {
        this.setState({ blogs: result.data });
        // cogoToast.success(result.message);
      })
      .catch((err) => cogoToast.error(err));
  };
  componentDidMount = () => {
    this.props
      .getAll(this.props.pageNo, this.props.size)
      .then((result) => {
        this.setState({ blogs: result.data });
        cogoToast.success(result.message);
      })
      .catch((err) => cogoToast.error(err));
  };

  searchOnHandler = () => {
    this.setState({ isOpen: true });
    const searchInterval = setInterval(() => {
      if (this.state.searchWidth >= 91) {
        clearInterval(searchInterval);
        return false;
      }
      this.setState((prevSate) => {
        return {
          searchWidth: prevSate.searchWidth + 15,
          searchString: prevSate.searchWidth + "px",
        };
      });
    }, 35);
  };

  searchOffHandler = () => {
    const searchInterval = setInterval(() => {
      if (this.state.searchWidth < 0) {
        this.setState({ isOpen: false });
        clearInterval(searchInterval);
        return false;
      }
      this.setState((prevSate) => {
        return {
          searchWidth: prevSate.searchWidth - 15,
          searchString: prevSate.searchWidth + "px",
        };
      });
    }, 35);
  };

  render() {
    let searchClass = ["main-search"];
    if (this.state.isOpen) {
      searchClass = [...searchClass, "open"];
    }
    const data = this.state.blogs.map((elem, index) => {
      return (
        <tr>
          <td>{this.props.size * this.props.pageNo + index + 1}</td>
          <td>{elem.heading}</td>
          <td>
            <Button variant="warning" onClick={() => this.updateHandler(index)}>
              Edit
            </Button>
            <Button
              onClick={() => this.props.deletee(elem._id)}
              variant="danger"
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <Button onClick={this.toggleHandler}>{this.state.btnText}</Button>
        <div id="main-search" className={searchClass.join(" ")}>
          <div className="input-group">
            <input
              type="text"
              id="m-search"
              className="form-control"
              placeholder="Search By Title or Tags"
              style={{ width: this.state.searchString }}
              value={this.state.search}
              onChange={(e) => {
                this.setState({ search: e.target.value });
                if (e.target.value.length) {
                  let blogs = this.props.blogs.map((a) => {
                    return { ...a };
                  });
                  let blogsByTags = blogs.map((item) => {
                    let tags = item.tags.filter((tag) =>
                      tag.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    console.log(tags);
                    if (tags.length) {
                      return true;
                    }
                    return false;
                  });
                  console.log(blogsByTags);
                  blogs = blogs.filter(
                    (item, index) =>
                      item.heading
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      blogsByTags[index]
                  );
                  this.setState({ blogs });
                }
              }}
            />
            <a
              href={DEMO.BLANK_LINK}
              className="input-group-append search-close"
              onClick={this.searchOffHandler}
            >
              <i className="feather icon-x input-group-text" />
            </a>
            <span
              className="input-group-append search-btn btn btn-primary"
              onClick={this.searchOnHandler}
            >
              <i className="feather icon-search input-group-text" />
            </span>
          </div>
        </div>
        {/* <input
          type="search"
          id="m-search"
          className="form-control"
          style={{ padding: "5px" }}
          placeholder="Search By Title or Tags"
          value={this.state.search}
          onChange={(e) => {
            this.setState({ search: e.target.value });
            if (e.target.value !== "") {
              let blogs = this.props.blogs.map((a) => {
                return { ...a };
              });
              let blogsByTags = blogs.map((item) => {
                let tags = item.tags.filter((tag) =>
                  tag.toLowerCase().includes(e.target.value.toLowerCase())
                );
                console.log(tags);
                if (tags.length) {
                  return true;
                }
                return false;
              });
              console.log(blogsByTags);
              blogs = blogs.filter(
                (item, index) =>
                  item.heading
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                  blogsByTags[index]
              );
              this.setState({ blogs });
            }
          }}
        /> */}
        {this.state.section === 0 ? (
          <DataTable
            header={["#", "Title", "actions"]}
            data={data}
            pageHandler={this.pageHandler}
            pageNo={this.props.pageNo}
          />
        ) : this.state.section === 1 ? (
          <BlogForm
            data={this.state.currentBlog}
            imagePreviewUrl={this.state.imagePreviewUrl}
            submitHandler={this.submitHandler}
            changeHandler={this.changeHandler}
            handleImageChange={this.handleImageChange}
          />
        ) : (
          <BlogForm
            data={this.state.currentBlog}
            imagePreviewUrl={this.state.imagePreviewUrl}
            submitHandler={this.editHandler}
            changeHandler={this.changeHandler}
            handleImageChange={this.handleImageChange}
            imageRemoveHandler={this.imageRemoveHandler}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogReducer.blogs,
    pageNo: state.blogReducer.pageNo,
    size: state.blogReducer.size,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAll: (pageNo, size) => dispatch(actionCreators.getAll(pageNo, size)),
    update: (index, data) => dispatch(actionCreators.update(index, data)),
    add: (data) => dispatch(actionCreators.add(data)),
    deletee: (id) => dispatch(actionCreators.Delete(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(Blog));
