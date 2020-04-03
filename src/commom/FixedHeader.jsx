import React from 'react';
import fmt from 'indian-number-format';
// import config from '../Modal/config';

export function FixedHeader() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  var Headerdate = date + "." + month + "." + year
  return (

    <div class="header_panel" role="navigation" >
      <div class="menu-overlay">&nbsp;</div>
      <div class="header_panel_inner" style={{ "background": "#0D95A2" }}>
        <div class="col-12 p-0 m-0 header-table" >
          {/* <div class="table-cell">
          </div> */}
          <div class="logo-title table-cell" ><h1 class="no-space text-center white-text f-20 bold-font">Self Onboarding</h1></div>
          {/* <div class="table-cell white-text text-right">
            <small class="no-wrap f-10"></small>
            <div class="f-16 bold-font"><span class="rupee"></span> */}
             {/* {fmt.format(config.walletBalance)}  */}
            {/* </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
