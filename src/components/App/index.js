import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { ThemeProvider } from "emotion-theming";

import store, { history } from "store";
// import Header from "components/organisms/Header";
import Header from "components/organisms/Header/Header";
import TopBar from "components/organisms/Header/TopBar";
// import Footer from "components/organisms/Footer";
import Toasts from "components/organisms/Toasts";
import ExchangePage from "components/pages/ExchangePage";
import WalletsPage from "components/pages/WalletsPage";
import OrdersPage from "components/pages/OrdersPage";
import AccountPage from "components/pages/AccountPage";
import MarketsPage from "components/pages/MarketsPage";
import TradesPage from "components/pages/TradesPage";
import FundsPage from "components/pages/FundsPage";
import Admin from "components/admin/Admin";
import BottomMenu from "components/organisms/BottomMenu";
import Modals from "components/organisms/Modals";
import { Mobile, Desktop } from "components/layout";
import EmbeddedTestPage from "components/pages/EmbeddedTestPage";
import paths from "utils/paths";
import theme from "theme";

import * as $ from "./index.style";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <div className={$.app}>
              {/* <Desktop component={Header} /> */}
              <Desktop component={Header} />
              <Desktop component={TopBar} />

              <Desktop component={Switch}>
                <Route path={paths.EXCHANGE} component={ExchangePage} />
                <Route path={paths.ORDERS} component={OrdersPage} />
                <Route path={paths.WALLETS} component={WalletsPage} />
                <Route path={paths.ACCOUNT} component={AccountPage} />
                <Route path={paths.ADMIN} component={Admin} />
                {process.env.NODE_ENV === "development" && (
                  <Route
                    path={paths.EMBEDDED_TEST}
                    component={EmbeddedTestPage}
                  />
                )}

                <Redirect to={paths.EXCHANGE} />
              </Desktop>

              <Desktop component="div">
                {/* <Footer /> */}
                <Toasts />
              </Desktop>

              <Mobile component={Switch}>
                <Route path={paths.MARKETS} component={MarketsPage} />
                <Route path={paths.TRADES} component={TradesPage} />
                <Route path={paths.FUNDS} component={FundsPage} />
                <Route path={paths.ACCOUNT} component={AccountPage} />
                {process.env.NODE_ENV === "development" && (
                  <Route
                    path={paths.EMBEDDED_TEST}
                    component={EmbeddedTestPage}
                  />
                )}

                <Redirect to={paths.MARKETS} />
              </Mobile>

              <Mobile component={BottomMenu} />

              <Modals />
            </div>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
