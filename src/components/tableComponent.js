import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CurrencyTable from "./currencyTable";
import DetailsModal from "./detailsModal";
import { getCurrencies } from "../actions/currencies";

const styles = theme => ({
  root: {
    display: "flex",
    padding: 30
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

const USD = "USD";
const EUR = "EUR";
const CNY = "CNY";
const currencies = [USD, EUR, CNY];

class TableComponent extends React.Component {
  state = {
    currency: USD,
    isDetailsModalOpen: false,
    activeRow: null,
    page: 0,
    rowsPerPage: 10
  };

  componentDidMount() {
    const { currency, page, rowsPerPage } = this.state;
    this.props.getCurrencies({
      start: page * rowsPerPage + 1,
      limit: rowsPerPage,
      convert: currency
    });
  }

  componentWillReceiveProps(props) {
    if (props.error) {
      this.notificationSystem.addNotification({
        level: "error",
        title: "Error",
        message: "Something went wrong while fetching data",
        position: "tc"
      });
    }
  }

  changePage = page => {
    const { rowsPerPage, currency } = this.state;
    this.props.getCurrencies({
      start: page * rowsPerPage + 1,
      limit: rowsPerPage,
      convert: currency
    });
    this.setState({ page });
  };

  changeRowsPerPage = rowsPerPage => {
    const { currency } = this.state;
    this.props.getCurrencies({
      start: 1,
      limit: rowsPerPage,
      convert: currency
    });
    this.setState({ page: 0, rowsPerPage });
  };

  openDetailsModal = activeRow => {
    this.setState({ activeRow, isDetailsModalOpen: true });
  };

  closeDetailsModal = () => {
    this.setState({ isDetailsModalOpen: false, activeRow: null });
  };

  changeCurrency = event => {
    const { page, rowsPerPage } = this.state;
    const currency = event.target.value;
    this.props.getCurrencies({
      start: page * rowsPerPage + 1,
      limit: rowsPerPage,
      convert: currency
    });
    this.setState({ currency });
  };

  render() {
    const { classes } = this.props;
    const {
      currency,
      page,
      rowsPerPage,
      activeRow,
      isDetailsModalOpen
    } = this.state;

    return (
      <div className={classes.root}>
        <NotificationSystem
          ref={c => {
            this.notificationSystem = c;
          }}
        />
        <TextField
          id="selectCurrency"
          label="Currency"
          select
          className={classes.textField}
          value={currency}
          onChange={this.changeCurrency}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Select your preffered currency"
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <CurrencyTable
          currency={currency}
          page={page}
          rowsPerPage={rowsPerPage}
          changePage={this.changePage}
          changeRowsPerPage={this.changeRowsPerPage}
          openDetailsModal={this.openDetailsModal}
        />
        {activeRow && (
          <DetailsModal
            isOpen={isDetailsModalOpen}
            currency={currency}
            data={activeRow}
            closeModal={this.closeDetailsModal}
          />
        )}
      </div>
    );
  }
}

TableComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ error }) => ({ error });

const mapDispatchToProps = dispatch => {
  return {
    getCurrencies: query => {
      dispatch(getCurrencies(query));
    }
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TableComponent);
