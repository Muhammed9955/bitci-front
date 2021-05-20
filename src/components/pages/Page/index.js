import React from "react";
import { connect } from "react-redux";
import theme from "../../../theme";

import * as $ from "./index.style";

const Page = ({ children, loading }) =>
  !loading && (
    <div className={$.page} style={{ background: theme.colors.mainBG }}>
      {children}
    </div>
  );

const mapStateToProps = ({ app }) => ({
  loading: app.loading,
});

export default connect(mapStateToProps)(Page);
