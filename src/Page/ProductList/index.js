import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/product";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import { Link } from "react-router-dom";

const ProductList = ({ products, get, deletee, ...props }) => {
  console.log(props);
  const [loading, setLoading] = useState(true);
  const ref = useRef();
  const ref1 = useRef();
  const [pdf, setPdf] = useState(true);
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [595.28, 841.89],
    compress: true,
  };
  useEffect(() => {
    get()
      .then((result) => {
        setLoading(false);
        cogoToast.success(result);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, [get]);

  const removeAttribute = (id) => {
    setLoading(true);
    deletee(id)
      .then((result) => {
        setLoading(false);
        cogoToast.success(result);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  };

  const editAttribute = (id) => {
    props.history.push(`/ProductForm/edit/${id}`, {
      data: products.filter((item) => item._id === id)[0],
    });
  };
  return loading ? (
    <div>
      <Spinner
        animation="border"
        style={{ position: "fixed", top: "20%", left: "60%" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div>
      <Link to="/ProductForm/add">
        <div style={{ display: "flex" }}>
          <Button
            style={{
              marginLeft: "auto",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            type="primary"
          >
            <PlusOutlined style={{ marginRight: "10px" }} />
            Add Product
          </Button>
        </div>
      </Link>
      <ExportCSV
        csvData={products.map((item) => {
          return {
            ID: item.attributeid,
            Name: item.name,
          };
        })}
        fileName="All products"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All products.pdf"
      >
        {({ toPdf }) => (
          <Button
            style={{ marginRight: "20px" }}
            type="primary"
            onClick={async () => {
              setPdf(false);
              setTimeout(toPdf, 500);
            }}
          >
            PDF
          </Button>
        )}
      </ReactToPdf>
      <ReactToPrint
        onBeforeGetContent={() => setPdf(false)}
        onAfterPrint={() => setPdf(true)}
        trigger={() => {
          // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
          // to the root node of the returned component as it will be overwritten.
          return <Button type="primary">PRINT</Button>;
        }}
        content={() => ref.current}
      />
      <div ref={ref1}>
        <Table
          onEdit={editAttribute}
          onDelete={removeAttribute}
          data={products.map((product) => {
            return {
              _id: product._id,
              id: product.productid.id,
              name: product.productid.producttitle,
              category: product.categoryid[0]
                ? product.categoryid[0].categorytitle
                : "",
              sku: product.productid.sku,
              type: product.producttype,
              date: product.productid.creationdate,
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={["id", "name", "category", "sku", "type", "date"]}
          titles={["ID", "Name", "Category", "Sku", "Type", "Date"]}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getProducts()),
    deletee: (id) => dispatch(actionCreators.deleteProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
