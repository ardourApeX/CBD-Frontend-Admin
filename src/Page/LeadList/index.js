import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/lead";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useRef } from "react";
import { ExportCSV } from "../../App/components/ExportCsv";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import { Link } from "react-router-dom";

const LeadList = ({ leadlist, get, ...props }) => {
    leadlist = leadlist.map(lead => lead.cart.items.length > 0 ? lead : "").filter(x=> x != "" );
    console.log(leadlist);
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

 // const removeAttribute = (id) => {
  //  setLoading(true);
    // deletee(id)
    //   .then((result) => {
    //     setLoading(false);
    //     cogoToast.success(result);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     cogoToast.error(err);
    //   });
// };

 // const editAttribute = (id) => {
    // props.history.push(`/ProductForm/edit/${id}`, {
    //   data: products.filter((item) => item._id === id)[0],
    // });
 // };
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
    
      {/* <ExportCSV
        csvData={products.map((product) => {
          return {
            ID: product.productid.id,
            Name: product.productid.producttitle,
            Category: product.categoryid[0]
              ? product.categoryid[0].categorytitle
              : "",
            SKU: product.productid.sku,
            Type: product.producttype,
            Date: new Date(product.productid.creationdate).toDateString(),
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
            size="sm"
            style={{ marginRight: "20px" }}
            variant="dark"
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
          return (
            <Button size="sm" variant="dark">
              PRINT
            </Button>
          );
        }}
        content={() => ref.current}
      /> */}
      <div ref={ref1}>
        <Table
         //onEdit={editAttribute}
        // onDelete={removeAttribute}
          data={leadlist.map((lead,index) => {
              
           
           
            return {
                no:index+1,
              email:lead.userid? lead.userid.email : "NaN",
              productNames:lead.cart?  lead.cart.items ? lead.cart.items.map(x=>x.productid? x.productid.producttitle: "combo" ).join() : "" : "" 
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={["no","email","productNames"]}
          titles={["No","Email","Product Name"]}
        />
      </div> 
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leadlist: state.leadReducer.leadlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getLeadList()),
   // deletee: (id) => dispatch(actionCreators.deleteProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadList);
