import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/product";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";

const Wishlist = ({ get, deletee }) => {
  const [wishlists, setwishlists] = useState([]);
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
        console.log(result);
        setLoading(false);
        cogoToast.success(result.message);
        setwishlists(result.data);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, [get]);

  const removeWishlist = (id) => {
    setLoading(true);
    deletee(id)
      .then((result) => {
        setLoading(false);
        cogoToast.success(result.message);
        setwishlists(wishlists.filter((item) => item._id !== id));
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
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
      <ExportCSV
        csvData={wishlists.map((item) => {
          console.log(item);
          return {
            ID: item.serial,
            "Product Name": item.productid ? item.productid.producttitle : "",
            Sku: item.productid ? item.productid.sku : "",
            Username: item.userid ? item.userid.email : "",
            "Added On": item.createdon,
          };
        })}
        fileName="All wishlists"
      />
      <ReactToPdf
        x={0}
        y={0}
        scale={1}
        onComplete={() => setPdf(true)}
        options={options}
        targetRef={ref1}
        filename="All wishlists.pdf"
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
          onDelete={removeWishlist}
          data={wishlists.map((item) => {
            return {
              _id: item._id,
              id: item.serial,
              name: item.productid ? item.productid.producttitle : "",
              sku: item.productid ? item.productid.sku : "",
              username: item.userid ? item.userid.email : "",
              addedon: item.createdon,
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={["id", "name", "sku", "username", "addedon"]}
          titles={["ID", "Product Name", "Sku", "Username", "Added On"]}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    wishlists: state.vendorReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getWishlists()),
    deletee: (id) => dispatch(actionCreators.deleteWishlist(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
