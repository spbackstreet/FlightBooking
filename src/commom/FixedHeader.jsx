import React from 'react';
import fmt from 'indian-number-format';
// import config from '../Modal/config';

export function FixedHeader() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  var Headerdate = date + "." + month + "." + year
  return (

    <div className="header_panel" role="navigation" >
      <div className="menu-overlay">&nbsp;</div>
      <div className="header_panel_inner" style={{ "background": "#0D95A2" }}>
        <div className="col-12 p-0 m-0 header-table" >
          {/* <div className="table-cell">
          </div> */}
          <div className="logo-title table-cell" ><h1 className="no-space text-center white-text f-20 bold-font">Self Onboarding</h1></div>
          {/* <div className="table-cell white-text text-right">
            <small className="no-wrap f-10"></small>
            <div className="f-16 bold-font"><span className="rupee"></span> */}
             {/* {fmt.format(config.walletBalance)}  */}
            {/* </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
