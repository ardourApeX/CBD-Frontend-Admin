import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/NewsletterMailingList";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import Table from "../../App/components/CategoryTable";
import "antd/dist/antd.css";
import { useRef } from "react";
import { result } from "lodash";
import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "../../store/actions/actions";
import { ERROR_MESSAGE } from "../../store/actions/constant";
import { BACK_END_URL } from "../../utilities/Axios/url";

const getNewsletterMailingList = () => {
    return (dispatch) => {
      return Axios.get(`${BACK_END_URL}/subscribedData/get`).then((result) => {  //result stores the NewsletterMailingList
          console.log(result.data.data);
          dispatch({
            type: actionTypes.GET_NewsletterMailingList,
            data: result.data.data,
          });
          return `NewsletterMailingList retrieved Successfully`;
        }).catch((err) => {
          console.log(err);
          return Promise.reject(ERROR_MESSAGE);
        });
    };
  };

const NewsletterMailingList = ({ newsletterMailingList, get, ...props }) => {
    
    newsletterMailingList= newsletterMailingList.map(mail => result.data.email.length > 0 ? mail : "").filter(x=> x != "" );
    console.log(newsletterMailingList);
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
        console.log(result.data);
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err);
      });
  }, [get]);

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
        <div ref={ref1}>
        <Table
          data={NewsletterMailingList.map((mail,index) => {
            return {
                no:index+1,
                email:mail? mail : "NaN",
            };
          })}
          setPdf={pdf}
          ref={ref}
          columns={["no","email"]}
          titles={["No","Email"]}
        />
      </div> 
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    newsletterMailingList: state.newsletterMailingList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actionCreators.getNewsletterMailingList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsletterMailingList);